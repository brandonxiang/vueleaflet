import type { Layer } from 'leaflet';
import { inject, nextTick, onBeforeUnmount, shallowRef, type ShallowRef } from 'vue';
import { LEAFLET_LAYER_PROVIDER, type LeafletLayerProvider } from '../core/Layer';

export const useLeafletLayer = <TLayer extends Layer>(
  createLayer: () => TLayer
): ShallowRef<TLayer | null> => {
  const provider = inject<LeafletLayerProvider | null>(LEAFLET_LAYER_PROVIDER, null);
  const layerRef = shallowRef<TLayer | null>(null) as ShallowRef<TLayer | null>;

  nextTick(() => {
    const layer = createLayer();
    layerRef.value = layer;
    provider?.addLayer(layer);
  });

  onBeforeUnmount(() => {
    if (layerRef.value) {
      provider?.removeLayer(layerRef.value);
    }
  });

  return layerRef;
};
