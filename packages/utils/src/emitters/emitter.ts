import {Subscribable} from '../types';
import {Subscription} from '../subscription';

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
   * @returns A Subscription object to manage the unsubscription.
   */
  subscribe(listener: (...args: T) => void): Subscription {
    this.listeners.add(listener);
    return new Subscription(() => this.unsubscribe(listener));
  }

  /**
   * Subscribes a listener that triggers only once and then automatically unsubscribes.
   * @param listener The callback function to execute once.
   * @returns A Subscription object (can be used to cancel before the event fires).
   */
  once(listener: (...args: T) => void): Subscription {
    const wrapper = (...args: T) => {
      this.unsubscribe(wrapper);
      listener(...args);
    };
    return this.subscribe(wrapper);
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

