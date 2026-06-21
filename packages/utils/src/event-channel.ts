import {Emitter, type Unsubscribable} from '@axijs/emitter';
import {isUndefined} from '@axijs/ensure';
import {Registry} from './registry';
import {PathType} from './types';
import {ensurePathString} from './path';


/**
 * path-based event channel.
 *
 * Manages a collection of Emitters mapped to specific paths.
 * Emitters are lazily created when the first listener subscribes
 * and automatically destroyed when the last listener unsubscribes
 *
 * @template T The type of the payload emitted by this channel.
 */
export class EventChannel {
  /**
   * Registry containing active emitters mapped by their stringified paths.
   * @private
   */
  emitters = new Registry<string, Emitter<any>>();

  /**
   * Subscribes a listener to events emitted at a specific path.
   * If an emitter for the path does not exist, it will be created automatically.
   *
   * @param {PathType} path - The path to subscribe to (e.g., 'player.stats.hp').
   * @param {(val: T) => void} listener - The callback function to invoke when an event occurs.
   * @returns {Unsubscribable} An object containing an `unsubscribe` method to remove the listener.
   */
  subscribe<T>(path: PathType, listener: (val: T) => void): Unsubscribable {
    const strPath = ensurePathString(path);
    if(!this.emitters.has(strPath)) {
      this.emitters.register(strPath, new Emitter<[T]>());
    }
    const emitter = this.emitters.getOrThrow(strPath);
    const sub = emitter.subscribe(listener);

    return {
      unsubscribe: ()=> {
        sub.unsubscribe();
        this.pruneEmitter(strPath);
      }
    }
  }

  /**
   * Manually unsubscribes a listener from a specific path.
   *
   * @param {PathType} path - The path to unsubscribe from.
   * @param {(val: T) => void} listener - The callback function to remove.
   */
  unsubscribe(path: PathType, listener: (val: any) => void) {
    const strPath = ensurePathString(path);
    if (!this.emitters.has(strPath)) {
      return;
    }
    const emitter = this.emitters.getOrThrow(strPath);
    emitter.unsubscribe(listener);
    this.pruneEmitter(strPath);
  }

  /**
   * Emits an event with the specified payload to all listeners subscribed to the given path.
   * If there are no listeners for the path, the event is safely ignored.
   *
   * @param {PathType} path - The target path for the event.
   * @param {T} val - The payload to emit.
   */
  emit<T>(path: PathType, val: T) {
    const strPath = ensurePathString(path);
    if (this.emitters.has(strPath)) {
      this.emitters.getOrThrow(strPath).emit(val);
    }
  }

  /**
   * Iterates through all active emitters and removes any that have no listeners.
   * Useful for manual garbage collection or global state resets.
   */
  prune() {
    const keys = [...this.emitters.keys()];
    for (let key of keys) {
      this.pruneEmitter(key);
    }
  }

  /**
   *
   * @return boolean
   */
  has(path: PathType): boolean {
    return this.emitters.has(ensurePathString(path));
  }

  /**
   * Safely checks if an emitter at the given path has no listeners
   * and removes it from the registry to free up memory.
   *
   * @param {string} path - The stringified path to check and prune.
   * @private
   */
  private pruneEmitter(path: string) {
    const emitter = this.emitters.get(path);
    if (!isUndefined(emitter) && !emitter.listenerCount) {
      this.emitters.delete(path);
    }
  }
}
