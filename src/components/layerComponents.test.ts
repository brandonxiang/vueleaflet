import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { LEAFLET_LAYER_PROVIDER, type LeafletLayerProvider } from '../core/Layer';
import { MAP_PROVIDE } from '../utils/injectKey';
import LLayerGroup from './LLayerGroup.vue';
import LFeatureGroup from './LFeatureGroup.vue';
import LImageOverlay from './LImageOverlay.vue';
import LControl from './LControl.vue';
import LPane from './LPane.vue';

const leafletMocks = vi.hoisted(() => ({
  layerGroup: vi.fn(),
  featureGroup: vi.fn(),
  imageOverlay: vi.fn(),
  controlExtend: vi.fn(),
  domCreate: vi.fn(),
  disableClickPropagation: vi.fn(),
  disableScrollPropagation: vi.fn(),
}));

vi.mock('leaflet', () => ({
  default: {
    layerGroup: leafletMocks.layerGroup,
    featureGroup: leafletMocks.featureGroup,
    imageOverlay: leafletMocks.imageOverlay,
    Control: {
      extend: leafletMocks.controlExtend,
    },
    DomUtil: {
      create: leafletMocks.domCreate,
    },
    DomEvent: {
      disableClickPropagation: leafletMocks.disableClickPropagation,
      disableScrollPropagation: leafletMocks.disableScrollPropagation,
    },
  },
}));

const createProvider = (): LeafletLayerProvider => ({
  addLayer: vi.fn(),
  removeLayer: vi.fn(),
  addControl: vi.fn(),
  removeControl: vi.fn(),
});

describe('new layer components', () => {
  beforeEach(() => {
    leafletMocks.layerGroup.mockReturnValue({
      addLayer: vi.fn(),
      removeLayer: vi.fn(),
    });
    leafletMocks.featureGroup.mockReturnValue({
      addLayer: vi.fn(),
      removeLayer: vi.fn(),
    });
    leafletMocks.imageOverlay.mockReturnValue({
      setUrl: vi.fn(),
      setBounds: vi.fn(),
    });
    leafletMocks.domCreate.mockReturnValue(document.createElement('div'));
    leafletMocks.controlExtend.mockImplementation((definition) => {
      return class MockControl {
        options: unknown;

        constructor(options: unknown) {
          this.options = options;
        }

        onAdd() {
          return definition.onAdd();
        }

        onRemove() {
          return definition.onRemove();
        }
      };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('adds LLayerGroup to the parent provider and removes it on unmount', async () => {
    const provider = createProvider();
    const wrapper = mount(LLayerGroup, {
      global: {
        provide: {
          [LEAFLET_LAYER_PROVIDER]: provider,
        },
      },
    });

    await nextTick();

    const group = leafletMocks.layerGroup.mock.results[0].value;
    expect(provider.addLayer).toHaveBeenCalledWith(group);

    wrapper.unmount();

    expect(provider.removeLayer).toHaveBeenCalledWith(group);
  });

  it('adds LFeatureGroup to the parent provider and removes it on unmount', async () => {
    const provider = createProvider();
    const wrapper = mount(LFeatureGroup, {
      global: {
        provide: {
          [LEAFLET_LAYER_PROVIDER]: provider,
        },
      },
    });

    await nextTick();

    const group = leafletMocks.featureGroup.mock.results[0].value;
    expect(provider.addLayer).toHaveBeenCalledWith(group);

    wrapper.unmount();

    expect(provider.removeLayer).toHaveBeenCalledWith(group);
  });

  it('updates and removes LImageOverlay', async () => {
    const provider = createProvider();
    const wrapper = mount(LImageOverlay, {
      props: {
        url: 'https://example.com/old.png',
        bounds: [
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

    const overlay = leafletMocks.imageOverlay.mock.results[0].value;
    expect(provider.addLayer).toHaveBeenCalledWith(overlay);

    await wrapper.setProps({ url: 'https://example.com/new.png' });

    expect(overlay.setUrl).toHaveBeenCalledWith('https://example.com/new.png');

    wrapper.unmount();

    expect(provider.removeLayer).toHaveBeenCalledWith(overlay);
  });

  it('adds LControl to the parent provider', async () => {
    const provider = createProvider();

    mount(LControl, {
      props: {
        position: 'bottomleft',
      },
      slots: {
        default: '<button>Reset</button>',
      },
      global: {
        provide: {
          [LEAFLET_LAYER_PROVIDER]: provider,
        },
      },
    });

    await nextTick();

    expect(provider.addControl).toHaveBeenCalledTimes(1);
    expect(leafletMocks.controlExtend).toHaveBeenCalledTimes(1);
  });

  it('creates and removes LPane', async () => {
    const pane = document.createElement('div');
    const map = {
      createPane: vi.fn(() => pane),
    };

    const wrapper = mount(LPane, {
      props: {
        name: 'labels',
        zIndex: 650,
        className: 'labels-pane',
      },
      global: {
        provide: {
          [MAP_PROVIDE]: {
            getMap: () => map,
          },
        },
      },
    });

    await nextTick();

    expect(map.createPane).toHaveBeenCalledWith('labels');
    expect(pane.style.zIndex).toBe('650');
    expect(pane.className).toBe('labels-pane');

    const remove = vi.spyOn(pane, 'remove');
    wrapper.unmount();

    expect(remove).toHaveBeenCalled();
  });
});

