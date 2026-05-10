import { describe, expect, it, vi } from 'vitest';
import type { Evented, LeafletEvent } from 'leaflet';
import { bindLeafletEvents } from './useLeafletEvents';

describe('bindLeafletEvents', () => {
  it('binds configured handlers and returns an unbind function', () => {
    const target = {
      on: vi.fn(),
      off: vi.fn(),
    } as unknown as Evented;
    const clickHandler = vi.fn((_event: LeafletEvent) => {});
    const unbind = bindLeafletEvents(target, {
      click: clickHandler,
      moveend: undefined,
    });

    expect(target.on).toHaveBeenCalledTimes(1);
    expect(target.on).toHaveBeenCalledWith('click', clickHandler);

    unbind();

    expect(target.off).toHaveBeenCalledTimes(1);
    expect(target.off).toHaveBeenCalledWith('click', clickHandler);
  });
});
