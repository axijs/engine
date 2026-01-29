import {Subscribable} from './types';
import {isUndefined} from './guards';

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

/**
 * An Emitter that stores the last emitted value.
 * New subscribers immediately receive the last value upon subscription.
 */
export class StateEmitter<T extends any[]> extends Emitter<T> {
  private _lastValue: T | undefined;

  constructor(initialValue?: T) {
    super();
    this._lastValue = initialValue ?? undefined;
  }

  /**
   * Gets the current value synchronously without subscribing.
   */
  get value(): T | undefined {
    return this._lastValue;
  }

  override emit(...args: T): void {
    this._lastValue = args;
    super.emit(...args);
  }

  override subscribe(listener: (...args: T) => void): () => void {
    const unsubscribe = super.subscribe(listener);

    if (!isUndefined(this._lastValue)) {
      listener(...this._lastValue);
    }

    return unsubscribe;
  }

  override clear() {
    super.clear();
    this._lastValue = undefined;
  }
}
