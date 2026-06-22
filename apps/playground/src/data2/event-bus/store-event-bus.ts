import {Emitter} from '@axijs/emitter';
import {StoreEventChannel} from './store-event-channel.ts';
import type {CreateNodeEvent, DeleteNodeEvent, ChangeFieldEvent, EventChannelMode} from './types.ts';

export class StoreEventBus {
  private _mode: EventChannelMode = 'lazy';

  public readonly createNode = new StoreEventChannel();
  public readonly changeField = new StoreEventChannel();
  public readonly deleteNode = new StoreEventChannel();

  public readonly onAnyCreate = new Emitter<[string]>();
  public readonly onAnyChange = new Emitter<[string]>();
  public readonly onAnyDelete = new Emitter<[string]>();

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
    if (this.mode === 'eager') { this.onAnyCreate.emit(path); }
    this.createNode.emit<CreateNodeEvent<T>>(path, {path, value});
  }

  emitOnChange<T = unknown>(path: string, value: T, oldValue: T) {
    if (this.mode === 'eager') { this.onAnyChange.emit(path); }
    this.changeField.emit<ChangeFieldEvent<T>>(path, {path, value, oldValue});
  }

  emitOnDelete<T = unknown>(path: string, oldValue?: T) {
    if (this.mode === 'eager') { this.onAnyDelete.emit(path); }
    this.deleteNode.emit<DeleteNodeEvent<T>>(path, {path, oldValue});
  }

  flush() {
    this.flushPendingAny(this.createNode.pendingChannels, this.onAnyCreate);
    this.createNode.flush();

    this.flushPendingAny(this.changeField.pendingChannels, this.onAnyChange);
    this.changeField.flush();

    this.flushPendingAny(this.deleteNode.pendingChannels, this.onAnyDelete);
    this.deleteNode.flush();
  }

  clear() {
    this.createNode.clear();
    this.changeField.clear();
    this.deleteNode.clear();

    this.onAnyCreate.clear();
    this.onAnyChange.clear();
    this.onAnyDelete.clear();
  }

  private flushPendingAny(pendingEvents: Map<string, any>, emitter: Emitter<[string]>) {
    if (this._mode === 'lazy' && pendingEvents.size) {
      for (let key of pendingEvents.keys()) { emitter.emit(key); }
    }
  }
}
