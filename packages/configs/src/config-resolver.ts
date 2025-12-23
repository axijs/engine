import {deepmerge} from "deepmerge-ts";
import {ConfigTree, ConfigVariant, isConfigVariant} from './config-resolver.types';
import {axiSettings, ensurePathArray, PathType, throwIf, throwIfEmpty} from '@axi-engine/utils';

/**
 * Resolves hierarchical configurations with inheritance and caching.
 * @template TBase The base type for all configurations this resolver handles.
 */
export class ConfigResolver<TBase extends object> {
  private cache = new Map<string, TBase>();

  constructor(public readonly configs: ConfigTree<TBase>) {}

  /**
   * Retrieves a fully resolved and merged configuration for a given path.
   * @template T A specific subtype of TBase that the caller expects.
   * @param path Path to the config, e.g., 'enemies.boss.goblin'.
   * @returns The resolved configuration object.
   */
  get<T extends TBase>(path: PathType): T {
    const pathArr = ensurePathArray(path);
    const fullPathKey = pathArr.join(axiSettings.pathSeparator);

    if (this.cache.has(fullPathKey)) {
      return this.cache.get(fullPathKey) as T;
    }

    const config = this.calculateConfig<T>(pathArr);
    this.cache.set(fullPathKey, config);
    return config;
  }

  /**
   * Clears the cache of resolved configurations.
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Recursively calculates the configuration by merging a variant with its parents.
   */
  private calculateConfig<T extends TBase>(path: string[], visited: string[] = []): T {
    const node = this.getNode(path, this.configs) as ConfigVariant<T>;
    const pathStr = path.join(axiSettings.pathSeparator);

    throwIf(visited.includes(pathStr), `Cyclic dependency detected in ${pathStr}`);
    visited.push(pathStr);

    const parentNode = node.extends ? this.calculateConfig<T>(ensurePathArray(node.extends), [...visited]) : {};
    return deepmerge(parentNode, node) as T;
  }

  /**
   * Traverses the config tree to find the node at the specified path.
   */
  private getNode(path: string[], tree: ConfigTree<TBase>): ConfigVariant<TBase> {
    const pathStr = path.join(axiSettings.pathSeparator);
    const [current, ...rest] = path;
    const node = tree[current];
    throwIfEmpty(node, `Can't find node with path: ${pathStr}`);

    if (rest.length > 0) {
      throwIf(isConfigVariant(node), `Path leads through a variant, not a tree branch: ${pathStr}`);
      return this.getNode(rest, node as ConfigTree<TBase>);
    }

    throwIf(!isConfigVariant(node), `Path does not lead to a variant: ${pathStr}`);
    return node as ConfigVariant<TBase>;
  }
}
