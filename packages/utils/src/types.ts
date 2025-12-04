/**
 * Represents a path that can be provided as a single string
 * or an array of segments.
 * @example
 * 'player/stats/health'
 * ['player', 'stats', 'health']
 */
export type PathType = string | string[];


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
