import { describe, it, expect } from 'vitest';
import { parseTaskState, serializeTaskState, checkAndResetIfNewDay, validatePin, today } from './utils';

describe('today', () => {
  it('returns date in YYYY-MM-DD format', () => {
    expect(today()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('parseTaskState', () => {
  it('parses valid JSON state', () => {
    const raw = JSON.stringify({ date: '2026-05-17', done: ['teeth'] });
    expect(parseTaskState(raw)).toEqual({ date: '2026-05-17', done: ['teeth'] });
  });

  it('returns empty state for invalid JSON', () => {
    expect(parseTaskState('not-json')).toEqual({ date: '', done: [] });
  });

  it('returns empty state for empty string', () => {
    expect(parseTaskState('')).toEqual({ date: '', done: [] });
  });

  it('returns empty state if done is not an array', () => {
    const raw = JSON.stringify({ date: '2026-05-17', done: 'teeth' });
    expect(parseTaskState(raw)).toEqual({ date: '', done: [] });
  });

  it('returns empty state if date is missing', () => {
    const raw = JSON.stringify({ done: ['teeth'] });
    expect(parseTaskState(raw)).toEqual({ date: '', done: [] });
  });
});

describe('serializeTaskState', () => {
  it('round-trips through parseTaskState', () => {
    const state = { date: '2026-05-17', done: ['teeth', 'room'] };
    expect(parseTaskState(serializeTaskState(state))).toEqual(state);
  });
});

describe('checkAndResetIfNewDay', () => {
  it('returns same state if date matches today', () => {
    const state = { date: today(), done: ['teeth'] };
    expect(checkAndResetIfNewDay(state)).toEqual(state);
  });

  it('resets done array if date is in the past', () => {
    const state = { date: '2020-01-01', done: ['teeth'] };
    const result = checkAndResetIfNewDay(state);
    expect(result.done).toEqual([]);
    expect(result.date).toBe(today());
  });

  it('resets if date is empty string', () => {
    expect(checkAndResetIfNewDay({ date: '', done: ['teeth'] }).done).toEqual([]);
  });
});

describe('validatePin', () => {
  it('returns true for matching pins', () => {
    expect(validatePin('1234', '1234')).toBe(true);
  });

  it('returns false for wrong pin', () => {
    expect(validatePin('0000', '1234')).toBe(false);
  });

  it('returns false for partial match', () => {
    expect(validatePin('123', '1234')).toBe(false);
  });
});
