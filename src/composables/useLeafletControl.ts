import type { Control } from 'leaflet';
import { inject, nextTick, onBeforeUnmount, shallowRef, type ShallowRef } from 'vue';
import { LEAFLET_LAYER_PROVIDER, type LeafletLayerProvider } from '../core/Layer';

export const useLeafletControl = <TControl extends Control>(
  createControl: () => TControl
): ShallowRef<TControl | null> => {
  const provider = inject<LeafletLayerProvider | null>(LEAFLET_LAYER_PROVIDER, null);
  const controlRef = shallowRef<TControl | null>(null) as ShallowRef<TControl | null>;

  nextTick(() => {
    const control = createControl();
    controlRef.value = control;
    provider?.addControl?.(control);
  });

  onBeforeUnmount(() => {
    if (controlRef.value) {
      provider?.removeControl?.(controlRef.value);
    }
  });

  return controlRef;
};
