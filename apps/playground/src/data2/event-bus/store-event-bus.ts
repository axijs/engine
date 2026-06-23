import {StoreEventChannel} from './store-event-channel.ts';
import type {CreateNodeEvent, DeleteNodeEvent, ChangeFieldEvent, EventChannelMode} from './types.ts';

export class StoreEventBus {
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

  emitOnCreate<T = unknown>(path: string, value?: T) {
    this.createNode.emit<CreateNodeEvent<T>>(path, {path, value});
  }

  emitOnChange<T = unknown>(path: string, value: T, oldValue: T) {
    this.changeField.emit<ChangeFieldEvent<T>>(path, {path, value, oldValue});
  }

  emitOnDelete<T = unknown>(path: string, oldValue?: T) {
    this.deleteNode.emit<DeleteNodeEvent<T>>(path, {path, oldValue});
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
