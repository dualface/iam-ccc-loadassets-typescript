import { Asset, resources } from "cc";

/**
 * 载入单个资源
 *
 * @param name
 */
export async function loadAsset<AssetT extends Asset>(
    name: string
): Promise<AssetT> {
    return new Promise<AssetT>((resolve, reject) => {
        resources.load(name, (err: Error | null, asset: AssetT) => {
            if (err) {
                reject(err);
            } else {
                resolve(asset);
            }
        });
    });
}

/**
 * 载入多个资源，返回包含名字与资源实例的字典
 *
 * 用法1:
 *
 * ```typescript
 * // res = [资源名]
 * res = await loadAssets<Prefab>(["map/tileset", "map/widgets"]);
 * // res = {
 * //   "map/tileset": Prefab,
 * //   "map/widgets": Prefab
 * // }
 * ```
 *
 * 用法2:
 *
 * ```typescript
 * // res = {别名: 资源名}
 * res = await loadAssets<Prefab>(["tileset": "map/tileset", "widgets": "map/widgets"])
 * // res = {
 * //   "tileset": Prefab,
 * //   "widgets": Prefab
 * // }
 * ```
 *
 * @param sources 包含资源名的数组，或者包含名与对应别名的字典
 */
export async function loadAssets<AssetT extends Asset>(
    sources: string[] | Map<string, string>
): Promise<Map<string, AssetT>> {
    const aliases: string[] = [];
    const names: string[] = [];
    if (Array.isArray(sources)) {
        sources.forEach((name) => {
            aliases.push(name);
            names.push(name);
        });
    } else {
        sources.forEach((name, alias) => {
            aliases.push(alias);
            names.push(name);
        });
    }

    return new Promise<Map<string, AssetT>>((resolve, reject) => {
        resources.load(names, (err: Error | null, assets: AssetT[]) => {
            if (err) {
                reject(err);
            } else {
                const result = new Map<string, AssetT>();
                for (let i = 0, l = assets.length; i < l; i++) {
                    result.set(aliases[i], assets[i]);
                }
                resolve(result);
            }
        });
    });
}
