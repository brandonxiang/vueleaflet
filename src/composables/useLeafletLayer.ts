import type { Layer } from 'leaflet';
import {
  inject,
  nextTick,
  onBeforeUnmount,
  shallowRef,
  type ShallowRef,
  type useAttrs,
} from 'vue';
import {
  LEAFLET_LAYER_PROVIDER,
  type LeafletLayerProvider,
} from '../core/Layer';
import { bindLeafletEventsFromAttrs } from './useLeafletEvents';

interface UseLeafletLayerOptions {
  attrs?: ReturnType<typeof useAttrs>;
  events?: string[];
}

export const useLeafletLayer = <TLayer extends Layer>(
  createLayer: () => TLayer,
  options: UseLeafletLayerOptions = {}
): ShallowRef<TLayer | null> => {
  const provider = inject<LeafletLayerProvider | null>(
    LEAFLET_LAYER_PROVIDER,
    null
  );
  const layerRef = shallowRef<TLayer | null>(null) as ShallowRef<TLayer | null>;
  let unbindEvents: (() => void) | undefined;

  nextTick(() => {
    const layer = createLayer();
    layerRef.value = layer;
    if (options.attrs && options.events) {
      unbindEvents = bindLeafletEventsFromAttrs(
        layer,
        options.attrs,
        options.events
      );
    }
    provider?.addLayer(layer);
  });

  onBeforeUnmount(() => {
    unbindEvents?.();
    if (layerRef.value) {
      provider?.removeLayer(layerRef.value);
    }
  });

  return layerRef;
};
