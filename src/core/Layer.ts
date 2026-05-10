import type { Control, Layer, LayerGroup, Map } from 'leaflet';

export interface LeafletLayerProvider {
  addLayer(layer: Layer): void;
  removeLayer(layer: Layer): void;
  addControl?(control: Control): void;
  removeControl?(control: Control): void;
}

type LayerTarget = Map | LayerGroup;

export const LEAFLET_LAYER_PROVIDER = 'leafletLayerProvider';

export const createLeafletLayerProvider = (
  parent?: LeafletLayerProvider | null
) => {
  let target: LayerTarget | null = null;
  const pendingLayers = new Set<Layer>();
  const pendingControls = new Set<Control>();

  const flushPending = () => {
    if (!target) return;
    pendingLayers.forEach((layer) => {
      target?.addLayer(layer);
      pendingLayers.delete(layer);
    });
    if ('addControl' in target) {
      pendingControls.forEach((control) => {
        (target as Map).addControl(control);
        pendingControls.delete(control);
      });
    }
  };

  const provider: LeafletLayerProvider & {
    setTarget: (nextTarget: LayerTarget) => void;
    clearTarget: () => void;
  } = {
    setTarget(nextTarget) {
      target = nextTarget;
      flushPending();
    },
    clearTarget() {
      target = null;
      pendingLayers.clear();
      pendingControls.clear();
    },
    addLayer(layer) {
      if (target) {
        target.addLayer(layer);
        return;
      }

      pendingLayers.add(layer);
    },
    removeLayer(layer) {
      pendingLayers.delete(layer);
      target?.removeLayer(layer);
      parent?.removeLayer(layer);
    },
    addControl(control) {
      if ('addControl' in (target ?? {}) && target) {
        (target as Map).addControl(control);
        return;
      }

      pendingControls.add(control);
    },
    removeControl(control) {
      pendingControls.delete(control);
      if ('removeControl' in (target ?? {}) && target) {
        (target as Map).removeControl(control);
      }

      parent?.removeControl?.(control);
    },
  };

  return provider;
};
