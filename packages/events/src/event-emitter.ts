import EventEmitter3 from 'eventemitter3';

/**
 * This class is a wrapper around EventEmitter3, providing a stable,
 *
 * A high performance event emitter
 * @see {@link https://github.com/primus/eventemitter3}
 */
export class AxiEventEmitter<T extends string | symbol> extends EventEmitter3<T> {
  // Currently, we don't need to add any custom logic.
  // The main purpose of this class is to create an abstraction layer.
}
