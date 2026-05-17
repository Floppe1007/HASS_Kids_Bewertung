import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HomeAssistant } from 'custom-card-helpers';
import type { CardConfig, TaskConfig } from './types';

@customElement('family-task-card-editor')
export class FamilyTaskCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) private _config!: CardConfig;

  setConfig(config: CardConfig): void {
    this._config = config;
  }

  private _fire(config: CardConfig): void {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }

  private _set<K extends keyof CardConfig>(field: K, value: CardConfig[K]): void {
    this._fire({ ...this._config, [field]: value });
  }

  private _setTask(index: number, field: keyof TaskConfig, value: string | number): void {
    const tasks = this._config.tasks.map((t, i) =>
      i === index ? { ...t, [field]: value } : t
    );
    this._fire({ ...this._config, tasks });
  }

  private _addTask(): void {
    const tasks = [
      ...(this._config.tasks ?? []),
      { id: `task_${Date.now()}`, name: '', icon: '⭐', minutes: 10 },
    ];
    this._fire({ ...this._config, tasks });
  }

  private _removeTask(index: number): void {
    const tasks = this._config.tasks.filter((_, i) => i !== index);
    this._fire({ ...this._config, tasks });
  }

  render(): TemplateResult {
    if (!this._config) return html``;
    return html`
      <div class="editor">
        <ha-textfield
          label="Name des Kindes"
          .value=${this._config.name ?? ''}
          @change=${(e: Event) => this._set('name', (e.target as HTMLInputElement).value)}
        ></ha-textfield>

        <ha-entity-picker
          label="Medienzeit-Entität (input_number)"
          .hass=${this.hass}
          .value=${this._config.entity_media_time ?? ''}
          .includeDomains=${['input_number']}
          @value-changed=${(e: CustomEvent) => this._set('entity_media_time', e.detail.value)}
        ></ha-entity-picker>

        <ha-entity-picker
          label="Aufgaben-Status-Entität (input_text)"
          .hass=${this.hass}
          .value=${this._config.entity_task_state ?? ''}
          .includeDomains=${['input_text']}
          @value-changed=${(e: CustomEvent) => this._set('entity_task_state', e.detail.value)}
        ></ha-entity-picker>

        <ha-textfield
          label="PIN (4-stellig)"
          .value=${this._config.pin ?? ''}
          @change=${(e: Event) => this._set('pin', (e.target as HTMLInputElement).value)}
        ></ha-textfield>

        <ha-textfield
          label="Einlöse-Beträge (Minuten, kommagetrennt, z.B. 30,60)"
          .value=${(this._config.redeem_amounts ?? []).join(', ')}
          @change=${(e: Event) => {
            const amounts = (e.target as HTMLInputElement).value
              .split(',')
              .map(n => parseInt(n.trim(), 10))
              .filter(n => !isNaN(n));
            this._set('redeem_amounts', amounts);
          }}
        ></ha-textfield>

        <h3 class="tasks-heading">Aufgaben</h3>
        ${(this._config.tasks ?? []).map((task, i) => html`
          <div class="task-row">
            <ha-icon-picker
              label="Icon"
              .hass=${this.hass}
              .value=${task.icon}
              class="icon-field"
              @value-changed=${(e: CustomEvent) => this._setTask(i, 'icon', e.detail.value)}
            ></ha-icon-picker>
            <ha-textfield
              label="Name"
              .value=${task.name}
              class="name-field"
              @change=${(e: Event) => this._setTask(i, 'name', (e.target as HTMLInputElement).value)}
            ></ha-textfield>
            <ha-textfield
              label="Min"
              type="number"
              .value=${String(task.minutes)}
              class="min-field"
              @change=${(e: Event) =>
                this._setTask(i, 'minutes', parseInt((e.target as HTMLInputElement).value, 10))}
            ></ha-textfield>
            <ha-icon-button
              .path=${'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z'}
              @click=${() => this._removeTask(i)}
            ></ha-icon-button>
          </div>
        `)}
        <mwc-button @click=${this._addTask.bind(this)}>+ Aufgabe hinzufügen</mwc-button>
      </div>
    `;
  }

  static get styles() {
    return css`
      .editor { display: flex; flex-direction: column; gap: 8px; padding: 16px; }
      ha-textfield, ha-entity-picker { display: block; width: 100%; }
      .tasks-heading { margin: 8px 0 4px; font-size: 14px; }
      .task-row { display: flex; align-items: center; gap: 8px; }
      .icon-field { width: 140px; flex-shrink: 0; }
      .name-field { flex: 1; }
      .min-field { width: 72px; flex-shrink: 0; }
    `;
  }
}
