import {throwIf, throwIfEmpty} from './assertion';

/**
 * A generic, type-safe wrapper around a Map for managing collections of items by key.
 * This class provides a consistent API for registering, retrieving, and checking for
 * the existence of items.
 *
 * @template K - The type of the key (must be a string).
 * @template V - The type of the value being stored.
 */
export class Registry<K extends PropertyKey, V> {
  protected readonly items = new Map<K, V>();

  /**
   * Registers an item with a specific key.
   * Warns if an item with the same key is already registered.
   * @param key The key to associate with the item.
   * @param value The item to register.
   */
  register(key: K, value: V): void {
    throwIf(this.items.has(key), `An item with the key '${String(key)}' is already registered and will be overwritten.`);
    this.items.set(key, value);
  }

  /**
   * Checks if an item with the given key is registered.
   * @param key The key to check.
   */
  has(key: K): boolean {
    return this.items.has(key);
  }

  /**
   * Retrieves an item by its key.
   * @param key The key of the item to retrieve.
   * @returns The item, or `undefined` if not found.
   */
  get(key: K): V | undefined {
    return this.items.get(key);
  }

  /**
   * Retrieves an item by its key, throwing an error if it's not found.
   * @param key The key of the item to retrieve.
   * @returns The item.
   * @throws {Error} if no item is found for the given key.
   */
  getOrThrow(key: K): V {
    const item = this.get(key);
    throwIfEmpty(item, `No item registered for the key '${String(key)}'.`);
    return item!;
  }

  delete(key: K): boolean {
    return this.items.delete(key);
  }

  /**
   * Clears all registered items from the registry.
   */
  clear(): void {
    this.items.clear();
  }
}
