import { describe, expect, it } from 'vitest';
import { getMapInjectKey, getMarkerInjectKey, MAP_PROVIDE, MARK_PROVIDE } from './injectKey';

describe('inject keys', () => {
  it('exports stable provide keys', () => {
    expect(MAP_PROVIDE).toBe('mapProvide');
    expect(MARK_PROVIDE).toBe('markProvide');
  });

  it('builds explicit map and marker inject keys', () => {
    expect(getMapInjectKey('main')).toBe('map-main');
    expect(getMarkerInjectKey('pin')).toBe('marker-pin');
  });

  it('returns an empty key outside a component parent context', () => {
    expect(getMapInjectKey()).toBe('');
    expect(getMarkerInjectKey()).toBe('');
  });
});
