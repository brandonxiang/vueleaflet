# Optimization Todo

## P0: 回归保护

- [ ] 为 `LLayerGroup` 和 `LFeatureGroup` 补组件 mount 测试，覆盖子图层挂载到最近父容器。
- [ ] 为 Overlay 组件补 mount、prop 更新、unmount 测试。
- [ ] 为 `LControl` 补 slot 渲染和卸载测试。
- [ ] 为现有 Marker、Vector、TileLayer 补卸载测试。

## P0: 组件能力补齐

- [ ] 新增 `LPane`，支持 `name`、`zIndex`、`className`、`style`。
- [ ] 为历史 `LTilelayer` 增加 `LTileLayer` alias，保持兼容并贴近 Leaflet 命名。
- [ ] 将 `useLeafletEvents` 接入 `LMarker`、Vector、Overlay、`LMap`，支持 Vue 事件写法。
- [ ] 补齐现有组件 props 更新：Vector `setStyle`、Marker icon/draggable、TileLayer opacity/zIndex。

## P1: 文档和示例

- [ ] README 增加完整组件清单。
- [ ] README 增加 LayerGroup、Overlay、Control、Pane 示例。
- [ ] `examples/Layout.vue` 增加嵌套图层、图片覆盖物、WMS、自定义 Control 和 Pane 示例。
- [ ] 为每个组件补 props/events 文档。

## P1: 工程质量

- [ ] 增加 lint/format 配置，统一代码风格。
- [ ] 增加 GitHub Actions，至少运行 `pnpm test` 和 `pnpm build`。
- [ ] 增加 changeset 或 release notes 流程。
- [ ] 发布前补 bundle size 和类型声明检查。

## P2: 扩展能力

- [ ] 提供 `createLeafletLayerComponent` 扩展模板，方便封装 Leaflet 插件。
- [ ] 增强 `LGeojson`，支持局部 feature 更新。
- [ ] 评估是否需要 `LGridLayer`，用于高级自定义瓦片。

