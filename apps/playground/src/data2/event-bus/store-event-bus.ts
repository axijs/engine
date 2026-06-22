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

  emitOnChange<T = unknown>(path: string, value: T, oldValue: T) {
    this.changeField.emit<ChangeFieldEvent<T>>(path, {path, value, oldValue});
    this.onAnyChange.emit(path);
  }

  emitOnCreate<T = unknown>(path: string, value?: T) {
    this.createNode.emit<CreateNodeEvent<T>>(path, {path, value});
    this.onAnyCreate.emit(path);
  }

  emitOnDelete<T = unknown>(path: string, oldValue?: T) {
    this.deleteNode.emit<DeleteNodeEvent<T>>(path, {path, oldValue});
    this.onAnyDelete.emit(path);
  }

  subscribeOnChange<T = unknown>(path: string, listener: (value: ChangeFieldEvent<T>) => void) {
    return this.changeField.subscribe(path, listener);
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
