# Leaflet Component Roadmap

## 背景

`vueleaflet` 当前已经封装了地图容器、基础瓦片图层、Marker、Popup、Tooltip、常见矢量图形、GeoJSON 和几类内置控件。下一步如果继续补齐 Leaflet 组件，重点不只是增加组件数量，还需要先稳定一套通用的生命周期、父子图层注入、事件绑定和类型约束模式，否则后续组件会重复实现同一类逻辑。

这份文档用于拆解后续封装路线，方便按阶段实现、测试和验收。

## 目标

- 补齐 Leaflet 常用图层、覆盖物、控件和容器类组件。
- 为所有组件统一创建、更新、卸载流程，避免图层残留在地图实例中。
- 支持组件嵌套，例如 `LFeatureGroup` 内放置 Marker、Polyline、Polygon 等子图层。
- 保留 Leaflet 原生能力，组件 API 尽量贴近 Leaflet 的 options、events 和 instance。
- 每个新增组件都带可运行的单元测试和示例。

## 当前状态

已封装组件：

| 类别       | 组件                                                                     |
| ---------- | ------------------------------------------------------------------------ |
| 地图       | `LMap`                                                                   |
| 栅格图层   | `LTilelayer`                                                             |
| 点位与弹层 | `LMarker`, `LPopup`, `LTooltip`                                          |
| 矢量图形   | `LCircle`, `LCircleMarker`, `LPolygon`, `LPolyline`, `LRectangle`        |
| 控件       | `LControlAttribution`, `LControlLayers`, `LControlScale`, `LControlZoom` |
| 数据图层   | `LGeojson`                                                               |

当前主要缺口：

- 大部分组件只在首次挂载时创建 Leaflet 实例，缺少 prop 更新和卸载清理。
- 图层只能直接挂到地图，缺少 `LayerGroup` / `FeatureGroup` 这类父级容器。
- 缺少统一事件绑定，用户还不能自然地写 `@click`、`@moveend` 等 Vue 事件。
- `GeoJSON` 的数据类型和数据更新能力还比较弱。
- 自定义控件、Pane、图片/视频/SVG 覆盖物、WMS 图层还没有组件入口。

## 封装原则

1. **生命周期统一**
   - `mounted` 后创建 Leaflet 实例。
   - props 变化时调用 Leaflet 对应的 `set*` / `setStyle` / `setUrl` API。
   - `beforeUnmount` 时从父容器移除实例，并解绑事件。

2. **父子容器统一**
   - 地图和图层容器都实现统一的 `addLayer` / `removeLayer` 能力。
   - 普通图层优先挂到最近的父级容器；没有父级容器时挂到 `LMap`。
   - `Popup` / `Tooltip` 继续挂到最近的 Marker 或可绑定图层。

3. **事件统一**
   - 支持常见 Leaflet 事件通过 Vue emit 暴露。
   - 内部建立统一事件绑定工具，组件卸载时自动解绑。
   - 保留原始 Leaflet event object，避免丢失能力。

4. **类型贴近 Leaflet**
   - props 类型优先复用 `leaflet` 和 `@types/geojson`。
   - 不新增不必要的中间类型。
   - 组件公开实例时保留准确 Leaflet 类型。

5. **组件名保持直观**
   - 对应 Leaflet 类名，例如 `L.imageOverlay` 封装为 `LImageOverlay`。
   - 对历史拼写兼容要谨慎处理；如果改名，应先保留 alias。

## 组件优先级

| 优先级 | 组件            | Leaflet API                       | 价值                                     |
| ------ | --------------- | --------------------------------- | ---------------------------------------- |
| P0     | `LLayerGroup`   | `L.layerGroup`                    | 支撑图层分组和后续嵌套能力               |
| P0     | `LFeatureGroup` | `L.featureGroup`                  | 支撑子图层事件聚合和 bounds 计算         |
| P0     | `LPane`         | `map.createPane`                  | 支撑图层 z-index 和复杂叠加顺序          |
| P1     | `LImageOverlay` | `L.imageOverlay`                  | 常见图片覆盖物                           |
| P1     | `LVideoOverlay` | `L.videoOverlay`                  | 视频覆盖物                               |
| P1     | `LSVGOverlay`   | `L.svgOverlay`                    | SVG 覆盖物                               |
| P1     | `LTileLayerWMS` | `L.tileLayer.wms`                 | GIS 常用 WMS 服务                        |
| P2     | `LControl`      | `L.Control.extend` 或 `L.control` | 支持自定义控件和 Vue slot                |
| P2     | `LGridLayer`    | `L.GridLayer.extend`              | 高级自定义瓦片能力，适合后置             |
| P2     | `LGeojson` 增强 | `L.geoJSON`                       | 支持 typed GeoJSON、数据更新、style 更新 |

## 实施计划

### Phase 0: 组件基础能力

**说明：** 先抽出通用组合函数，避免每个组件重复处理实例创建、事件、添加和移除。

**任务：**

- [ ] 新增 `useLeafletLayer`：统一把图层添加到最近父容器，并在卸载时移除。
- [ ] 新增 `useLeafletEvents`：统一绑定和解绑 Leaflet 事件。
- [ ] 新增 layer container provide：让 `LMap`、`LLayerGroup`、`LFeatureGroup` 都可以作为父容器。
- [ ] 为现有组件补基础卸载测试，先锁住行为。

**验收标准：**

- [ ] 新增工具有单元测试。
- [ ] 现有组件测试仍通过。
- [ ] `pnpm build` 能生成声明文件。

### Phase 1: Layer 容器组件

**说明：** 先实现容器组件，后续 Overlay、Vector、Marker 都可以挂到容器内。

**任务：**

- [ ] 新增 `LLayerGroup`，支持默认 slot 放置子图层。
- [ ] 新增 `LFeatureGroup`，支持默认 slot 放置子图层。
- [ ] 支持容器层级嵌套，例如 `LFeatureGroup` 内嵌 `LLayerGroup`。
- [ ] 给 `LControlLayers` 预留接入容器图层的能力。

**验收标准：**

- [ ] 子图层添加到最近的 `LayerGroup` / `FeatureGroup`，不是直接添加到 map。
- [ ] 父组件卸载时子图层被正确移除。
- [ ] 示例页面能展示分组 Marker 和矢量图形。

### Phase 2: Overlay 组件

**说明：** 覆盖物组件是 Leaflet 高频功能，适合在容器能力稳定后补齐。

**任务：**

- [ ] 新增 `LImageOverlay`，支持 `url`, `bounds`, `options`。
- [ ] 新增 `LVideoOverlay`，支持 `url`, `bounds`, `options`。
- [ ] 新增 `LSVGOverlay`，支持 SVG element 或 string 输入策略。
- [ ] 新增 `LTileLayerWMS`，支持 `baseUrl`, `options`，并支持 url/options 更新。

**验收标准：**

- [ ] 每个组件都有挂载、更新、卸载测试。
- [ ] 示例页面包含图片覆盖物和 WMS 图层示例。
- [ ] 类型不使用宽泛 `any`，除非 Leaflet 类型本身无法表达。

### Phase 3: Control 能力增强

**说明：** 控件类组件要支持 Leaflet 原生控件，也要支持 Vue slot 渲染自定义内容。

**任务：**

- [ ] 新增 `LControl`，支持 `position` 和默认 slot。
- [ ] 让自定义 control 节点挂载到 Leaflet control container。
- [ ] 增强 `LControlLayers`，支持动态图层更新。
- [ ] 为现有 control 组件补卸载清理。

**验收标准：**

- [ ] 自定义 control 可以展示 Vue slot 内容。
- [ ] control 卸载后 DOM 节点和 Leaflet control 都被移除。
- [ ] `LControlLayers` 在 overlays/baseLayers 更新后能同步。

### Phase 4: 现有组件质量补齐

**说明：** 新组件模式稳定后，把现有组件迁移到同一套基础能力。

**任务：**

- [ ] `LMap` 移除调试输出，并在卸载时销毁 map。
- [ ] `LTilelayer` 支持 `urlTemplate` 和 `options` 更新。
- [ ] Vector 组件支持 `latlngs` / `bounds` / `options` 更新。
- [ ] `LMarker` 支持位置、icon、draggable 等常用属性更新。
- [ ] `LGeojson` 支持数据替换、style 更新和 `GeoJSON.GeoJsonObject` 类型。

**验收标准：**

- [ ] 所有现有组件都有卸载测试。
- [ ] 更新 props 后 Leaflet 实例状态同步。
- [ ] 公共导出保持向后兼容。

### Phase 5: 文档和示例

**说明：** 组件库的使用成本主要来自示例不足。每批组件完成后同步补文档。

**任务：**

- [ ] README 增加组件清单和基础示例。
- [ ] `examples/Layout.vue` 拆成更清晰的示例区块。
- [ ] 增加嵌套图层、Overlay、Control、GeoJSON 更新示例。
- [ ] 增加每个组件的 props 表和事件说明。

**验收标准：**

- [ ] 新用户能从 README 直接复制一个可运行示例。
- [ ] 每个新增组件至少有一个示例。
- [ ] 文档里的组件名和导出名完全一致。

## 推荐任务拆分

| 任务                             | 范围                                 | 依赖                | 规模 |
| -------------------------------- | ------------------------------------ | ------------------- | ---- |
| 1. 建立 layer container 注入协议 | core/utils + tests                   | 无                  | M    |
| 2. 新增 `LLayerGroup`            | component + export + tests + example | 任务 1              | S    |
| 3. 新增 `LFeatureGroup`          | component + export + tests + example | 任务 1              | S    |
| 4. 新增 overlay 三件套           | image/video/svg components + tests   | 任务 1              | M    |
| 5. 新增 `LTileLayerWMS`          | component + tests + example          | 任务 1              | S    |
| 6. 新增 `LControl` 自定义控件    | component + DOM mount tests          | 任务 1              | M    |
| 7. 迁移现有组件到通用生命周期    | existing components + tests          | 任务 1-6 可并行后置 | M    |
| 8. 完善 README 和 examples       | docs/examples                        | 组件完成后          | S    |

## 测试策略

- 单元测试优先覆盖 Leaflet 工厂调用、父容器 `addLayer` / `removeLayer`、事件绑定和解绑。
- 组件测试使用 `@vue/test-utils` + `jsdom`，必要时 mock Leaflet 实例，避免测试依赖真实浏览器布局。
- 对每个新组件至少覆盖：
  - 创建时调用正确 Leaflet API。
  - 添加到正确父容器。
  - props 更新时同步实例。
  - 卸载时移除实例并解绑事件。
- 每个阶段完成后运行：
  - `pnpm test`
  - `pnpm build`

## 风险和处理

| 风险                                        | 影响             | 处理                                                  |
| ------------------------------------------- | ---------------- | ----------------------------------------------------- |
| Leaflet 部分 API 依赖真实 DOM 尺寸          | 测试不稳定       | 单测 mock Leaflet，真实渲染留给 example 手动验证      |
| 嵌套 provide 设计不清晰                     | 后续组件难扩展   | 先实现最小 layer container 协议，再迁移组件           |
| props 更新和 Leaflet options 不完全一一对应 | API 行为不一致   | 对可更新属性显式 watch，不承诺所有 options 都可热更新 |
| 改动现有组件生命周期                        | 可能破坏历史用法 | 先补测试，再逐步迁移，导出保持兼容                    |

## 待确认问题

- 是否要把现有 `LTilelayer` 增加 alias `LTileLayer`，让命名更接近 Leaflet。
- 自定义 `LControl` 的 slot 是否需要支持 teleport 回 Vue 应用上下文。
- `LGeojson` 是否只支持整体替换数据，还是要支持局部增删 feature。
- 是否需要为插件型组件提供官方扩展模板，例如 `createLeafletLayerComponent`。
