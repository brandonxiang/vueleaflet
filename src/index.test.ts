import { describe, expect, it } from 'vitest';
import * as exports from './index';

describe('public exports', () => {
  it('exports all documented Vue components', () => {
    expect(exports.LMap).toBeDefined();
    expect(exports.LMarker).toBeDefined();
    expect(exports.LTooltip).toBeDefined();
    expect(exports.LTilelayer).toBeDefined();
    expect(exports.LPopup).toBeDefined();
    expect(exports.LCircle).toBeDefined();
    expect(exports.LCircleMarker).toBeDefined();
    expect(exports.LPolygon).toBeDefined();
    expect(exports.LPolyline).toBeDefined();
    expect(exports.LRectangle).toBeDefined();
    expect(exports.LControlAttribution).toBeDefined();
    expect(exports.LControlLayers).toBeDefined();
    expect(exports.LControlScale).toBeDefined();
    expect(exports.LControlZoom).toBeDefined();
    expect(exports.LGeojson).toBeDefined();
  });

  it('re-exports inject key helpers', () => {
    expect(exports.MAP_PROVIDE).toBe('mapProvide');
    expect(exports.MARK_PROVIDE).toBe('markProvide');
    expect(exports.getMapInjectKey('main')).toBe('map-main');
    expect(exports.getMarkerInjectKey('pin')).toBe('marker-pin');
  });
});
