import { describe, expect, it, vi } from 'vitest';
import type { Evented, LeafletEvent } from 'leaflet';
import { bindLeafletEvents, bindLeafletEventsFromAttrs } from './useLeafletEvents';

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

  it('binds Vue listener attrs to Leaflet events', () => {
    const target = {
      on: vi.fn(),
      off: vi.fn(),
    } as unknown as Evented;
    const clickHandler = vi.fn();
    const unbind = bindLeafletEventsFromAttrs(
      target,
      {
        onClick: clickHandler,
      },
      ['click', 'moveend']
    );

    expect(target.on).toHaveBeenCalledTimes(1);
    const [, leafletHandler] = vi.mocked(target.on).mock.calls[0];

    leafletHandler({ type: 'click' } as LeafletEvent);

    expect(clickHandler).toHaveBeenCalledWith({ type: 'click' });

    unbind();

    expect(target.off).toHaveBeenCalledTimes(1);
  });
});
