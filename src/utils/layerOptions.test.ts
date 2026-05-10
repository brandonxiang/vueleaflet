import { describe, expect, it, vi } from 'vitest';
import type { Circle, Marker, TileLayer } from 'leaflet';
import {
  updateCircleOptions,
  updateMarkerOptions,
  updateTileLayerOptions,
} from './layerOptions';

describe('layer option updaters', () => {
  it('updates circle style and radius', () => {
    const circle = {
      setStyle: vi.fn(),
      setRadius: vi.fn(),
    } as unknown as Circle;

    updateCircleOptions(circle, {
      color: '#2563eb',
      radius: 500,
    });

    expect(circle.setStyle).toHaveBeenCalledWith({
      color: '#2563eb',
      radius: 500,
    });
    expect(circle.setRadius).toHaveBeenCalledWith(500);
  });

  it('updates marker icon, opacity, z-index, and dragging state', () => {
    const marker = {
      setIcon: vi.fn(),
      setOpacity: vi.fn(),
      setZIndexOffset: vi.fn(),
      dragging: {
        enable: vi.fn(),
        disable: vi.fn(),
      },
    } as unknown as Marker;
    const icon = {} as Marker['options']['icon'];

    updateMarkerOptions(marker, {
      icon,
      opacity: 0.7,
      zIndexOffset: 10,
      draggable: true,
    });

    expect(marker.setIcon).toHaveBeenCalledWith(icon);
    expect(marker.setOpacity).toHaveBeenCalledWith(0.7);
    expect(marker.setZIndexOffset).toHaveBeenCalledWith(10);
    expect(marker.dragging?.enable).toHaveBeenCalled();
  });

  it('updates tile layer opacity and z-index', () => {
    const tileLayer = {
      setOpacity: vi.fn(),
      setZIndex: vi.fn(),
    } as unknown as TileLayer;

    updateTileLayerOptions(tileLayer, {
      opacity: 0.5,
      zIndex: 200,
    });

    expect(tileLayer.setOpacity).toHaveBeenCalledWith(0.5);
    expect(tileLayer.setZIndex).toHaveBeenCalledWith(200);
  });
});
