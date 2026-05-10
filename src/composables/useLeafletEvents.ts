import type { Evented, LeafletEvent } from 'leaflet';

export type LeafletEventHandler = (event: LeafletEvent) => void;

export const bindLeafletEvents = (
  target: Evented,
  events: Record<string, LeafletEventHandler | undefined>
) => {
  Object.entries(events).forEach(([eventName, handler]) => {
    if (handler) {
      target.on(eventName, handler);
    }
  });

  return () => {
    Object.entries(events).forEach(([eventName, handler]) => {
      if (handler) {
        target.off(eventName, handler);
      }
    });
  };
};

