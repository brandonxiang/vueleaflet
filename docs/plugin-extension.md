# Plugin Extension Template

Use this template when wrapping a Leaflet plugin that returns a `Layer`.

```vue
<script setup lang="ts">
import { type PropType, useAttrs, watch } from 'vue';
import type { LayerOptions } from 'leaflet';
import { useLeafletLayer } from '../src/composables/useLeafletLayer';
import { layerEvents } from '../src/utils/events';
import L from 'leaflet';
import 'leaflet-plugin-package';

const props = defineProps({
  options: {
    type: Object as PropType<LayerOptions>,
    required: false,
  },
});

const attrs = useAttrs();

const pluginLayerRef = useLeafletLayer(() => L.pluginLayer(props.options), {
  attrs,
  events: layerEvents,
});

watch(
  () => props.options,
  (options) => {
    pluginLayerRef.value?.setStyle?.(options);
  },
  { deep: true }
);
</script>

<template></template>
```

## Rules

- Create the Leaflet instance inside `useLeafletLayer`.
- Use `useAttrs` + `layerEvents` when the plugin emits standard Leaflet layer events.
- Add explicit watchers only for options that the plugin can update after creation.
- Keep plugin package imports inside the wrapper component, not in `LMap`.
- Add tests for mount, prop update, event binding, and unmount cleanup.

## Checklist

- [ ] Component is exported from `src/index.ts`.
- [ ] Component has a mount/unmount test.
- [ ] README or example shows the plugin wrapper.
- [ ] Build passes with `pnpm build`.
