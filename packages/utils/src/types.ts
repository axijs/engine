/**
 * Represents a path that can be provided as a single string
 * or an array of segments.
 * @example
 * 'player/stats/health'
 * ['player', 'stats', 'health']
 */
export type PathType = string | string[];

/**
 * Represents a generic constructor for any class.
 *
 * This utility type is essential for implementing higher-order patterns
 * like mixins, where a function takes a class as an argument and returns
 * a new, extended class.
 *
 * The `...args: any[]` signature allows it to represent constructors
 * with any number and type of arguments, making it universally applicable.
 *
 * @template T - The type of the instance created by the constructor. Defaults to `{}`.
 *
 * @example
 * // Used as a constraint for a base class in a mixin
 * function Timestamped<TBase extends Constructor>(Base: TBase) {
 *   return class extends Base {
 *     timestamp = new Date();
 *   };
 * }
 *
 * class User {}
 * const TimestampedUser = Timestamped(User);
 * const userInstance = new TimestampedUser();
 * console.log(userInstance.timestamp); // Logs the current date
 */
export type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * Defines the public, read-only contract for an event emitter.
 * It allows subscribing to an event but not emitting it.
 * @template T A tuple representing the types of the event arguments.
 */
export type Subscribable<T extends any[]> = {
  readonly listenerCount: number;

  /**
   * Subscribes a listener to this event.
   * @returns A function to unsubscribe the listener.
   */
  subscribe(listener: (...args: T) => void): () => void;

  unsubscribe(listener: (...args: T) => void): boolean;

  clear(): void;
}
