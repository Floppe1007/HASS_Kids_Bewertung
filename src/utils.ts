import type { TaskState } from './types';

export function today(): string {
  return new Date().toISOString().split('T')[0];
}

export function parseTaskState(raw: string): TaskState {
  const empty: TaskState = { date: '', done: [] };
  try {
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed.date === 'string' &&
      Array.isArray(parsed.done)
    ) {
      return parsed as TaskState;
    }
  } catch {
    // fall through to empty
  }
  return empty;
}

export function serializeTaskState(state: TaskState): string {
  return JSON.stringify(state);
}

export function checkAndResetIfNewDay(state: TaskState): TaskState {
  if (state.date !== today()) {
    return { date: today(), done: [] };
  }
  return state;
}

export function validatePin(input: string, expected: string): boolean {
  return input === expected;
}
