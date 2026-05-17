import { LitElement, html, css, TemplateResult, CSSResultGroup, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { CardConfig, TaskState } from './types';
import {
  parseTaskState,
  serializeTaskState,
  checkAndResetIfNewDay,
  validatePin,
  today,
} from './utils';

type DialogState = 'none' | 'pin-redeem' | 'pin-reset' | 'pin-add-task' | 'redeem' | 'add-task';

@customElement('family-task-card')
export class FamilyTaskCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: CardConfig;
  @state() private _dialog: DialogState = 'none';
  @state() private _pin = '';
  @state() private _pinError = false;
  @state() private _newTaskIcon = 'mdi:star';
  @state() private _newTaskName = '';
  @state() private _newTaskMinutes = 10;

  static getConfigElement(): HTMLElement {
    return document.createElement('family-task-card-editor');
  }

  static getStubConfig(): Partial<CardConfig> {
    return {
      name: 'Kind',
      entity_media_time: '',
      entity_task_state: '',
      pin: '1234',
      redeem_amounts: [30, 60],
      tasks: [
        { id: 'task_1', name: 'Zähne putzen', icon: 'mdi:toothbrush-paste', minutes: 10 },
        { id: 'task_2', name: 'Zimmer aufräumen', icon: 'mdi:broom', minutes: 20 },
      ],
    };
  }

  setConfig(config: CardConfig): void {
    this._config = config;
  }

  getCardSize(): number {
    return 3 + Math.ceil((this._config?.tasks?.length ?? 0) / 2);
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('hass') && this.hass) {
      this._triggerDailyResetIfNeeded();
    }
  }

  private async _triggerDailyResetIfNeeded(): Promise<void> {
    if (!this._config?.entity_task_state) return;
    const raw = this.hass.states[this._config.entity_task_state]?.state ?? '';
    const state = parseTaskState(raw);
    if (state.date !== today()) {
      await this._writeTaskState({ date: today(), done: [] });
    }
  }

  private get _taskState(): TaskState {
    const raw = this.hass?.states[this._config.entity_task_state]?.state ?? '';
    return checkAndResetIfNewDay(parseTaskState(raw));
  }

  private get _mediaMinutes(): number {
    return Math.round(Number(this.hass?.states[this._config.entity_media_time]?.state ?? 0));
  }

  private async _writeTaskState(state: TaskState): Promise<void> {
    await this.hass.callService('input_text', 'set_value', {
      entity_id: this._config.entity_task_state,
      value: serializeTaskState(state),
    });
  }

  private async _writeMediaMinutes(minutes: number): Promise<void> {
    await this.hass.callService('input_number', 'set_value', {
      entity_id: this._config.entity_media_time,
      value: Math.max(0, minutes),
    });
  }

  private async _toggleTask(taskId: string, minutes: number): Promise<void> {
    const state = this._taskState;
    const isDone = state.done.includes(taskId);
    const newDone = isDone
      ? state.done.filter(id => id !== taskId)
      : [...state.done, taskId];
    const delta = isDone ? -minutes : minutes;
    await Promise.all([
      this._writeTaskState({ ...state, done: newDone }),
      this._writeMediaMinutes(this._mediaMinutes + delta),
    ]);
  }

  private _openPin(action: 'redeem' | 'reset'): void {
    this._dialog = action === 'redeem' ? 'pin-redeem' : 'pin-reset';
    this._pin = '';
    this._pinError = false;
  }

  private _handleDigit(digit: string): void {
    if (this._pin.length >= 4) return;
    this._pin = this._pin + digit;
    if (this._pin.length === 4) this._submitPin();
  }

  private async _submitPin(): Promise<void> {
    if (!validatePin(this._pin, this._config.pin)) {
      this._pinError = true;
      this._pin = '';
      setTimeout(() => { this._pinError = false; }, 600);
      return;
    }
    this._pin = '';
    if (this._dialog === 'pin-reset') {
      await this._executeReset();
    } else if (this._dialog === 'pin-add-task') {
      this._newTaskIcon = 'mdi:star';
      this._newTaskName = '';
      this._newTaskMinutes = 10;
      this._dialog = 'add-task';
    } else {
      this._dialog = 'redeem';
    }
  }

  private async _executeRedeem(amount: number | 'all'): Promise<void> {
    const newMinutes = amount === 'all' ? 0 : this._mediaMinutes - (amount as number);
    await this._writeMediaMinutes(newMinutes);
    this._dialog = 'none';
  }

  private async _executeReset(): Promise<void> {
    await Promise.all([
      this._writeTaskState({ date: today(), done: [] }),
      this._writeMediaMinutes(0),
    ]);
    this._dialog = 'none';
  }

  private _closeDialog(): void {
    this._dialog = 'none';
    this._pin = '';
  }

  private _openAddTask(): void {
    this._dialog = 'pin-add-task';
    this._pin = '';
    this._pinError = false;
  }

  private _saveNewTask(): void {
    if (!this._newTaskName.trim()) return;
    const updatedConfig: CardConfig = {
      ...this._config,
      tasks: [
        ...(this._config.tasks ?? []),
        {
          id: `task_${Date.now()}`,
          name: this._newTaskName.trim(),
          icon: this._newTaskIcon || 'mdi:star',
          minutes: Math.max(1, this._newTaskMinutes || 10),
        },
      ],
    };
    this._config = updatedConfig;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: updatedConfig },
      bubbles: true,
      composed: true,
    }));
    this._dialog = 'none';
  }

  render(): TemplateResult {
    if (!this._config) return html``;
    if (!this._config.entity_media_time || !this._config.entity_task_state) {
      return html`
        <ha-card>
          <div class="setup-hint">
            <ha-icon icon="mdi:cog"></ha-icon>
            <span>Entitäten konfigurieren ✏️</span>
          </div>
        </ha-card>
      `;
    }
    if (!this.hass) return html``;
    const state = this._taskState;
    const minutes = this._mediaMinutes;

    return html`
      <ha-card>
        <div class="container">
          <div class="hero">
            <div class="hero-label">🧒 ${this._config.name} hat verdient</div>
            <div class="hero-minutes">${minutes} Min</div>
            <div class="hero-sublabel">Medienzeit 🎮</div>
          </div>
          <div class="tasks">
            ${(this._config.tasks ?? []).map(task => {
              const done = state.done.includes(task.id);
              return html`
                <div
                  class="task ${done ? 'done' : ''}"
                  @click=${() => this._toggleTask(task.id, task.minutes)}
                >
                  <ha-icon class="task-icon" .icon=${task.icon}></ha-icon>
                  <span class="task-name">${task.name}</span>
                  <span class="task-badge">${done ? '✓ ' : ''}${task.minutes} Min</span>
                </div>
              `;
            })}
            <div class="add-task-row" @click=${() => this._openAddTask()}>
              <span class="add-task-plus">＋</span>
              <span>Neue Aufgabe</span>
            </div>
          </div>
          <div class="actions">
            <button class="btn-reset" @click=${() => this._openPin('reset')}>↺ Reset</button>
            <button class="btn-redeem" @click=${() => this._openPin('redeem')}>✓ Einlösen</button>
          </div>
          ${this._dialog !== 'none' ? this._renderOverlay(minutes) : ''}
        </div>
      </ha-card>
    `;
  }

  private _renderOverlay(minutes: number): TemplateResult {
    if (this._dialog === 'add-task') {
      return html`
        <div class="overlay" @click=${(e: Event) => { if (e.target === e.currentTarget) this._closeDialog(); }}>
          <div class="dialog dialog-wide">
            <div class="dialog-title">Neue Aufgabe</div>
            <div class="task-form">
              <ha-icon-picker
                .hass=${this.hass}
                label="Icon"
                .value=${this._newTaskIcon}
                @value-changed=${(e: CustomEvent) => { this._newTaskIcon = e.detail.value; }}
              ></ha-icon-picker>
              <input class="form-name" type="text" placeholder="Aufgabe..."
                .value=${this._newTaskName}
                @input=${(e: Event) => { this._newTaskName = (e.target as HTMLInputElement).value; }}
              />
              <div class="form-row form-row-min">
                <input class="form-min" type="number" min="1"
                  .value=${String(this._newTaskMinutes)}
                  @input=${(e: Event) => { this._newTaskMinutes = parseInt((e.target as HTMLInputElement).value, 10) || 10; }}
                />
                <span class="form-label">Minuten Medienzeit</span>
              </div>
            </div>
            <button class="redeem-btn" @click=${this._saveNewTask.bind(this)}>Hinzufügen</button>
            <button class="redeem-btn cancel" @click=${this._closeDialog.bind(this)}>Abbrechen</button>
          </div>
        </div>
      `;
    }

    if (this._dialog === 'pin-redeem' || this._dialog === 'pin-reset' || this._dialog === 'pin-add-task') {
      return html`
        <div class="overlay" @click=${(e: Event) => { if (e.target === e.currentTarget) this._closeDialog(); }}>
          <div class="dialog ${this._pinError ? 'shake' : ''}">
            <div class="dialog-title">🔒 Eltern-PIN eingeben</div>
            <div class="pin-dots">
              ${[0, 1, 2, 3].map(i => html`
                <div class="dot ${i < this._pin.length ? 'filled' : ''}"></div>
              `)}
            </div>
            <div class="numpad">
              ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => html`
                <button class="num" @click=${() => this._handleDigit(String(n))}>${n}</button>
              `)}
              <button class="num secondary" @click=${this._closeDialog.bind(this)}>✕</button>
              <button class="num" @click=${() => this._handleDigit('0')}>0</button>
              <button class="num secondary" @click=${() => { this._pin = this._pin.slice(0, -1); }}>⌫</button>
            </div>
          </div>
        </div>
      `;
    }

    const amounts = this._config.redeem_amounts ?? [30, 60];
    return html`
      <div class="overlay" @click=${(e: Event) => { if (e.target === e.currentTarget) this._closeDialog(); }}>
        <div class="dialog">
          <div class="dialog-title">Wie viel einlösen?</div>
          ${amounts.map(amount => html`
            <button class="redeem-btn" @click=${() => this._executeRedeem(amount)}>
              ${amount} Minuten
            </button>
          `)}
          <button class="redeem-btn all" @click=${() => this._executeRedeem('all')}>
            Alles (${minutes} Min)
          </button>
          <button class="redeem-btn cancel" @click=${this._closeDialog.bind(this)}>Abbrechen</button>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .container { position: relative; overflow: hidden; }

      .setup-hint {
        display: flex; align-items: center; justify-content: center; gap: 8px;
        padding: 24px; color: var(--secondary-text-color, #999); font-size: 14px;
      }

      .hero {
        background: linear-gradient(135deg, #2a9d8f, #457b9d);
        padding: 20px; text-align: center; color: white;
      }
      .hero-label { font-size: 14px; opacity: 0.85; margin-bottom: 4px; }
      .hero-minutes { font-size: 40px; font-weight: 700; letter-spacing: -1px; }
      .hero-sublabel { font-size: 12px; opacity: 0.75; margin-top: 2px; }

      .tasks { padding: 8px 12px; }
      .task {
        display: flex; align-items: center; gap: 10px;
        padding: 8px 4px;
        border-bottom: 1px solid var(--divider-color, #eee);
        cursor: pointer; user-select: none; transition: opacity 0.15s;
      }
      .task:last-child { border-bottom: none; }
      .task.done { opacity: 0.5; }
      .task.done .task-name { text-decoration: line-through; }
      .task-icon { --mdc-icon-size: 22px; flex-shrink: 0; }
      .task-name { flex: 1; font-size: 14px; }
      .task-badge {
        font-size: 12px; padding: 2px 8px; border-radius: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        color: var(--secondary-text-color, #555);
      }
      .task.done .task-badge {
        background: var(--success-color, #2a9d8f); color: white;
      }

      .actions {
        display: flex; gap: 8px; padding: 12px;
        border-top: 1px solid var(--divider-color, #eee);
      }
      .btn-reset {
        flex: 1; padding: 8px; border-radius: 8px;
        border: 1px solid var(--error-color, #e76f51);
        background: transparent; color: var(--error-color, #e76f51);
        cursor: pointer; font-size: 13px;
      }
      .btn-redeem {
        flex: 2; padding: 8px; border-radius: 8px; border: none;
        background: var(--primary-color, #457b9d); color: white;
        cursor: pointer; font-size: 13px;
      }

      .overlay {
        position: absolute; inset: 0; z-index: 10;
        background: rgba(0, 0, 0, 0.6);
        display: flex; align-items: center; justify-content: center;
      }
      .dialog {
        background: var(--card-background-color, #fff);
        border-radius: 12px; padding: 20px; width: 220px; text-align: center;
      }
      .dialog-wide { width: 280px; }
      .dialog.shake { animation: shake 0.4s ease-in-out; }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-8px); }
        40%, 80% { transform: translateX(8px); }
      }
      .dialog-title {
        font-size: 14px; color: var(--secondary-text-color); margin-bottom: 16px;
      }

      .pin-dots { display: flex; justify-content: center; gap: 12px; margin-bottom: 20px; }
      .dot {
        width: 14px; height: 14px; border-radius: 50%;
        border: 2px solid var(--secondary-text-color, #999);
        transition: background 0.1s, border-color 0.1s;
      }
      .dot.filled {
        background: var(--primary-color, #457b9d);
        border-color: var(--primary-color, #457b9d);
      }

      .numpad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
      .num {
        padding: 12px; border-radius: 8px; border: none;
        background: var(--secondary-background-color, #f5f5f5);
        color: var(--primary-text-color, #333);
        font-size: 16px; cursor: pointer;
      }
      .num.secondary { font-size: 13px; color: var(--secondary-text-color); }

      .redeem-btn {
        display: block; width: 100%; padding: 10px; margin-bottom: 8px;
        border-radius: 8px; border: 1px solid var(--primary-color, #457b9d);
        background: transparent; color: var(--primary-color, #457b9d);
        font-size: 14px; cursor: pointer;
      }
      .redeem-btn.all {
        border-color: var(--success-color, #2a9d8f);
        color: var(--success-color, #2a9d8f);
      }
      .redeem-btn.cancel {
        border-color: var(--divider-color, #ddd);
        color: var(--secondary-text-color, #999);
      }

      .add-task-row {
        display: flex; align-items: center; gap: 10px;
        padding: 8px 4px; cursor: pointer;
        color: var(--primary-color, #457b9d);
        border-top: 1px dashed var(--divider-color, #ddd);
        margin-top: 4px; font-size: 13px; opacity: 0.65;
        transition: opacity 0.15s;
      }
      .add-task-row:hover { opacity: 1; }
      .add-task-plus { font-size: 18px; line-height: 1; }

      .task-form { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; text-align: left; }
      .task-form ha-icon-picker { display: block; }
      .form-row { display: flex; gap: 8px; align-items: center; }
      .form-row-min { justify-content: center; }
      .form-name {
        width: 100%; border: 1px solid var(--divider-color, #ddd); border-radius: 8px; padding: 8px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #333); font-size: 14px; box-sizing: border-box;
      }
      .form-min {
        width: 64px; border: 1px solid var(--divider-color, #ddd); border-radius: 8px; padding: 8px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color, #333); font-size: 14px; text-align: center;
      }
      .form-label { font-size: 12px; color: var(--secondary-text-color, #999); }
    `;
  }
}

import './editor';

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description: string }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'family-task-card',
  name: 'Family Task Card',
  description: 'Kinder sammeln Medienzeit durch das Erledigen von Aufgaben',
});
