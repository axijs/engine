import {StoreEventChannel} from './store-event-channel.ts';
import type {CreateNodeEvent, DeleteNodeEvent, ChangeFieldEvent, EventChannelMode} from './types.ts';
import type {PathType} from '@axi-engine/utils';
import type {StoreEventEmitter} from './store-event-emitter.ts';
import type {StoreEventSubscriber} from './store-event-subscriber.ts';

export class StoreEventBus implements StoreEventEmitter, StoreEventSubscriber {
  private _mode: EventChannelMode = 'lazy';

  readonly createNode = new StoreEventChannel();
  readonly changeField = new StoreEventChannel();
  readonly deleteNode = new StoreEventChannel();

  set mode(mode: EventChannelMode) {
    this._mode = mode;
    this.changeField.mode = this._mode;
    this.createNode.mode = this._mode;
    this.deleteNode.mode = this._mode;
  }

  get mode(): EventChannelMode {
    return this._mode;
  }

  onCreate<T = unknown>(path: PathType, listener: (event: CreateNodeEvent<T>) => void) {
    return this.createNode.subscribe<CreateNodeEvent<T>>(path, listener);
  }

  onChange<T = unknown>(path: PathType, listener: (event: ChangeFieldEvent<T>) => void) {
    return this.changeField.subscribe<ChangeFieldEvent<T>>(path, listener);
  }

  onDelete<T = unknown>(path: PathType, listener: (event: DeleteNodeEvent<T>) => void) {
    return this.deleteNode.subscribe<DeleteNodeEvent<T>>(path, listener);
  }

  emitOnCreate<T = unknown>(path: string, value?: T) {
    this.createNode.emit<CreateNodeEvent<T>>(path, {path, value});
  }

  emitOnChange<T = unknown>(path: string, value: T, oldValue: T) {
    this.changeField.emit<ChangeFieldEvent<T>>(path, {path, value, oldValue});
  }

  emitOnDelete<T = unknown>(path: string, oldValue?: T) {
    this.deleteNode.emit<DeleteNodeEvent<T>>(path, {path, oldValue});
  }

  unsubscribeOnCreate<T = unknown>(path: PathType, listener: (event: CreateNodeEvent<T>) => void) {
    return this.createNode.unsubscribe(path, listener);
  }

  unsubscribeOnChange<T = unknown>(path: PathType, listener: (event: ChangeFieldEvent<T>) => void) {
    return this.changeField.unsubscribe(path, listener);
  }

  unsubscribeOnDelete<T = unknown>(path: PathType, listener: (event: DeleteNodeEvent<T>) => void) {
    return this.deleteNode.unsubscribe(path, listener);
  }

  flush() {
    this.createNode.flush();
    this.changeField.flush();
    this.deleteNode.flush();
  }

  clear() {
    this.createNode.clear();
    this.changeField.clear();
    this.deleteNode.clear();
  }
}
