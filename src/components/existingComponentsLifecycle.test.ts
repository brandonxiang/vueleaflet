import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import {
  LEAFLET_LAYER_PROVIDER,
  type LeafletLayerProvider,
} from '../core/Layer';
import LMarker from './LMarker.vue';
import LPolyline from './LPolyline.vue';
import LTilelayer from './LTilelayer.vue';

const leafletMocks = vi.hoisted(() => ({
  marker: vi.fn(),
  polyline: vi.fn(),
  tileLayer: vi.fn(),
  mergeOptions: vi.fn(),
}));

vi.mock('leaflet', () => ({
  default: {
    marker: leafletMocks.marker,
    polyline: leafletMocks.polyline,
    tileLayer: leafletMocks.tileLayer,
    Icon: {
      Default: {
        prototype: {},
        mergeOptions: leafletMocks.mergeOptions,
      },
    },
  },
}));

const createProvider = (): LeafletLayerProvider => ({
  addLayer: vi.fn(),
  removeLayer: vi.fn(),
});

describe('existing component lifecycle', () => {
  beforeEach(() => {
    leafletMocks.marker.mockReturnValue({
      setLatLng: vi.fn(),
    });
    leafletMocks.polyline.mockReturnValue({
      setLatLngs: vi.fn(),
    });
    leafletMocks.tileLayer.mockReturnValue({
      setUrl: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('removes LMarker from its provider on unmount', async () => {
    const provider = createProvider();
    const wrapper = mount(LMarker, {
      props: {
        id: 'pin',
        latlng: [0, 0],
      },
      global: {
        provide: {
          [LEAFLET_LAYER_PROVIDER]: provider,
        },
      },
    });

    await nextTick();

    const marker = leafletMocks.marker.mock.results[0].value;
    expect(provider.addLayer).toHaveBeenCalledWith(marker);

    wrapper.unmount();

    expect(provider.removeLayer).toHaveBeenCalledWith(marker);
  });

  it('removes vector layers from their provider on unmount', async () => {
    const provider = createProvider();
    const wrapper = mount(LPolyline, {
      props: {
        latlngs: [
          [0, 0],
          [1, 1],
        ],
      },
      global: {
        provide: {
          [LEAFLET_LAYER_PROVIDER]: provider,
        },
      },
    });

    await nextTick();

    const polyline = leafletMocks.polyline.mock.results[0].value;
    expect(provider.addLayer).toHaveBeenCalledWith(polyline);

    wrapper.unmount();

    expect(provider.removeLayer).toHaveBeenCalledWith(polyline);
  });

  it('removes LTilelayer from its provider on unmount', async () => {
    const provider = createProvider();
    const wrapper = mount(LTilelayer, {
      props: {
        urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      },
      global: {
        provide: {
          [LEAFLET_LAYER_PROVIDER]: provider,
        },
      },
    });

    await nextTick();

    const tileLayer = leafletMocks.tileLayer.mock.results[0].value;
    expect(provider.addLayer).toHaveBeenCalledWith(tileLayer);

    wrapper.unmount();

    expect(provider.removeLayer).toHaveBeenCalledWith(tileLayer);
  });
});
