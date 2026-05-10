import { describe, expect, it, vi } from 'vitest';
import type { Control, Layer, LayerGroup, Map } from 'leaflet';
import { createLeafletLayerProvider, LEAFLET_LAYER_PROVIDER } from './Layer';

const createLayer = () => ({ id: Math.random() }) as unknown as Layer;
const createControl = () => ({ id: Math.random() }) as unknown as Control;

describe('Leaflet layer provider', () => {
  it('exports a stable injection key', () => {
    expect(LEAFLET_LAYER_PROVIDER).toBe('leafletLayerProvider');
  });

  it('queues layers until a target is available', () => {
    const layer = createLayer();
    const target = {
      addLayer: vi.fn(),
      removeLayer: vi.fn(),
    } as unknown as LayerGroup;
    const provider = createLeafletLayerProvider();

    provider.addLayer(layer);
    expect(target.addLayer).not.toHaveBeenCalled();

    provider.setTarget(target);

    expect(target.addLayer).toHaveBeenCalledWith(layer);
  });

  it('adds and removes layers on the active target', () => {
    const layer = createLayer();
    const target = {
      addLayer: vi.fn(),
      removeLayer: vi.fn(),
    } as unknown as LayerGroup;
    const provider = createLeafletLayerProvider();

    provider.setTarget(target);
    provider.addLayer(layer);
    provider.removeLayer(layer);

    expect(target.addLayer).toHaveBeenCalledWith(layer);
    expect(target.removeLayer).toHaveBeenCalledWith(layer);
  });

  it('queues child layers instead of delegating while a nested provider has no target', () => {
    const layer = createLayer();
    const parent = {
      addLayer: vi.fn(),
      removeLayer: vi.fn(),
    };
    const target = {
      addLayer: vi.fn(),
      removeLayer: vi.fn(),
    } as unknown as LayerGroup;
    const provider = createLeafletLayerProvider(parent);

    provider.addLayer(layer);

    expect(parent.addLayer).not.toHaveBeenCalled();

    provider.setTarget(target);

    expect(target.addLayer).toHaveBeenCalledWith(layer);
    expect(parent.addLayer).not.toHaveBeenCalled();
  });

  it('removes layers from both the current target and parent provider', () => {
    const layer = createLayer();
    const parent = {
      addLayer: vi.fn(),
      removeLayer: vi.fn(),
    };
    const target = {
      addLayer: vi.fn(),
      removeLayer: vi.fn(),
    } as unknown as LayerGroup;
    const provider = createLeafletLayerProvider(parent);

    provider.setTarget(target);
    provider.removeLayer(layer);

    expect(target.removeLayer).toHaveBeenCalledWith(layer);
    expect(parent.removeLayer).toHaveBeenCalledWith(layer);
  });

  it('adds and removes controls when the target is a map', () => {
    const control = createControl();
    const target = {
      addLayer: vi.fn(),
      removeLayer: vi.fn(),
      addControl: vi.fn(),
      removeControl: vi.fn(),
    } as unknown as Map;
    const provider = createLeafletLayerProvider();

    provider.setTarget(target);
    provider.addControl(control);
    provider.removeControl(control);

    expect(target.addControl).toHaveBeenCalledWith(control);
    expect(target.removeControl).toHaveBeenCalledWith(control);
  });
});
