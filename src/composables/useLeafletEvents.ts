import type { Evented, LeafletEvent } from 'leaflet';
import type { useAttrs } from 'vue';

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

type Attrs = ReturnType<typeof useAttrs>;

const toVueListenerName = (eventName: string) => {
  return `on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`;
};

export const bindLeafletEventsFromAttrs = (
  target: Evented,
  attrs: Attrs,
  eventNames: string[]
) => {
  const events = eventNames.reduce<Record<string, LeafletEventHandler | undefined>>((result, eventName) => {
    const listener = attrs[toVueListenerName(eventName)];

    if (typeof listener === 'function') {
      result[eventName] = (event) => {
        listener(event);
      };
    }

    return result;
  }, {});

  return bindLeafletEvents(target, events);
};
