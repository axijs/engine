// file: packages/utils/src/emitter.ts

import {Subscribable} from './types';

/**
 * A minimal, type-safe event emitter for a single event.
 * It does not manage state, it only manages subscribers and event dispatching.
 * @template T A tuple representing the types of the event arguments.
 */
export class Emitter<T extends any[]> implements Subscribable<T>{
  private listeners: Set<(...args: T) => void> = new Set();

  /**
   * Returns the number of listeners.
   */
  get listenerCount(): number {
    return this.listeners.size;
  }

  /**
   * Subscribes a listener to this event.
   * @returns A function to unsubscribe the listener.
   */
  subscribe(listener: (...args: T) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Manually unsubscribe by listener
   * @returns returns true if an listener has been removed, or false if the listener does not exist.
   */
  unsubscribe(listener: (...args: T) => void) {
    return this.listeners.delete(listener);
  }

  /**
   * Dispatches the event to all subscribed listeners.
   */
  emit(...args: T): void {
    this.listeners.forEach(listener => listener(...args));
  }

  /**
   * Clears all listeners.
   */
  clear(): void {
    this.listeners.clear();
  }
}
