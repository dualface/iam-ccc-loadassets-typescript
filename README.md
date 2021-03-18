# iam-ccc-loadassets-typescript

Cocos Creator 的资源加载辅助函数

~

载入单个资源

```typescript
const res = await loadAsset<Prefab>("player");
```

载入多个资源，返回包含名字与资源实例的字典

用法1:

```typescript
// res = [资源名]
const res = await loadAssets<Prefab>(["map/tileset", "map/widgets"]);
// res = {
//   "map/tileset": Prefab,
//   "map/widgets": Prefab
// }
```

用法2:

```typescript
// res = {别名: 资源名}
const res = await loadAssets<Prefab>(["tileset": "map/tileset", "widgets": "map/widgets"])
// res = {
//   "tileset": Prefab,
//   "widgets": Prefab
// }
```
