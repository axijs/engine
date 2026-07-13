import {StoreEventChannel} from './store-event-channel.ts';
import type {CreateNodeEvent, DeleteNodeEvent, ChangeFieldEvent} from './types.ts';
import type {PathType} from '@axi-engine/utils';
import type {StoreEventEmitter} from './store-event-emitter.ts';
import type {StoreEventSubscriber} from './store-event-subscriber.ts';

export class StoreEventBus implements StoreEventEmitter, StoreEventSubscriber {
  readonly createNode = new StoreEventChannel();
  readonly changeField = new StoreEventChannel();
  readonly deleteNode = new StoreEventChannel();


  constructor() {
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

  emitOnAnyCreate(paths: string[]) {
    this.createNode.onAny.emit(paths);
  }

  emitOnAnyChange(paths: string[]) {
    this.changeField.onAny.emit(paths);
  }

  emitOnAnyDelete(paths: string[]) {
    this.deleteNode.onAny.emit(paths);
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

  clear() {
    this.createNode.clear();
    this.changeField.clear();
    this.deleteNode.clear();
  }
}
