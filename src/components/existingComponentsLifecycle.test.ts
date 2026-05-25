import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, nextTick, ref } from 'vue';
import {
  LEAFLET_LAYER_PROVIDER,
  type LeafletLayerProvider,
} from '../core/Layer';
import { markerProvide } from '../core/Marker';
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
    expect(markerProvide.getMarker('marker-pin')).toBeNull();
  });

  it('supports position as a marker location alias', async () => {
    const provider = createProvider();
    const wrapper = mount(LMarker, {
      props: {
        id: 'pin',
        position: [0, 0],
      },
      global: {
        provide: {
          [LEAFLET_LAYER_PROVIDER]: provider,
        },
      },
    });

    await nextTick();

    expect(leafletMocks.marker).toHaveBeenCalledWith([0, 0], undefined);

    const marker = leafletMocks.marker.mock.results[0].value;
    await wrapper.setProps({ position: [1, 1] });

    expect(marker.setLatLng).toHaveBeenCalledWith([1, 1]);

    wrapper.unmount();
  });

  it('adds markers that are created after a dynamic list starts empty', async () => {
    const provider = createProvider();
    const Host = defineComponent({
      components: { LMarker },
      setup() {
        const points = ref<Record<string, { pos: [number, number] }>>({});
        return { points };
      },
      template: `
        <LMarker
          v-for="(params, user) in points"
          :id="user"
          :key="user"
          :position="params.pos"
        />
      `,
    });

    const wrapper = mount(Host, {
      global: {
        provide: {
          [LEAFLET_LAYER_PROVIDER]: provider,
        },
      },
    });

    await nextTick();
    expect(leafletMocks.marker).not.toHaveBeenCalled();

    wrapper.vm.points = {
      alice: { pos: [51.505, -0.09] },
      bob: { pos: [51.508, -0.11] },
    };
    await nextTick();
    await nextTick();

    expect(leafletMocks.marker).toHaveBeenCalledTimes(2);
    expect(leafletMocks.marker).toHaveBeenNthCalledWith(
      1,
      [51.505, -0.09],
      undefined
    );
    expect(leafletMocks.marker).toHaveBeenNthCalledWith(
      2,
      [51.508, -0.11],
      undefined
    );
    expect(provider.addLayer).toHaveBeenCalledTimes(2);

    wrapper.unmount();
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
