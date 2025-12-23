import {PathType} from '@axi-engine/utils';

/**
 * Represents a specific configuration variant that can extend another variant.
 * @template T The base type of the configuration object.
 */
export type ConfigVariant<T extends object> = {
  /** Path to a base config (or multiple configs) that this variant extends. */
  extends?: PathType;
  /** The specific fields that override or extend the base config. */
  fields?: Partial<T>;
};

/**
 * Represents the hierarchical structure of the configuration.
 * It's a recursive type that can contain other trees or final variants.
 * @template T The base type of the configuration object.
 */
export type ConfigTree<T extends object> = {
  [key: string]: ConfigVariant<T> | ConfigTree<T>;
};

/**
 * Type guard to check if an object is a ConfigVariant.
 */
export function isConfigVariant<T extends object>(obj: any): obj is ConfigVariant<T> {
  // The logic remains the same, but the signature is now generic.
  return obj && (obj.fields !== undefined || obj.extends !== undefined);
}
