import {Constructor} from './types';
import {throwIf, throwIfEmpty} from './assertion';

/**
 * A generic registry for mapping string identifiers to class constructors.
 *
 * This utility is fundamental for building extensible systems like dependency injection containers,
 * factories, and serialization engines where types need to be dynamically resolved.
 *
 * @template T - A base type that all registered constructors must produce an instance of.
 */
export class ConstructorRegistry<T> {
  private readonly items = new Map<string, Constructor<T>>();

  /**
   * Registers a constructor with a unique string identifier.
   *
   * @param typeId - The unique identifier for the constructor (e.g., a static `typeName` property from a class).
   * @param ctor - The class constructor to register.
   * @returns The registry instance for chainable calls.
   * @throws If a constructor with the same `typeId` is already registered.
   */
  register(typeId: string, ctor: Constructor<T>): this {
    throwIf(this.items.has(typeId), `A constructor with typeId '${typeId}' is already registered.`);
    this.items.set(typeId, ctor);
    return this;
  }

  /**
   * Retrieves a constructor by its identifier.
   *
   * @param typeId - The identifier of the constructor to retrieve.
   * @returns The found class constructor.
   * @throws If no constructor is found for the given `typeId`.
   */
  get(typeId: string): Constructor<T> {
    const Ctor = this.items.get(typeId);
    throwIfEmpty(Ctor, `No constructor found for typeId '${typeId}'`);
    return Ctor!;
  }

  /**
   * Checks if a constructor for a given identifier is registered.
   * @param typeId - The identifier to check.
   * @returns `true` if a constructor is registered, otherwise `false`.
   */
  has(typeId: string): boolean {
    return this.items.has(typeId);
  }

  /**
   * Clears all registered constructors from the registry.
   */
  clear(): void {
    this.items.clear();
  }
}
