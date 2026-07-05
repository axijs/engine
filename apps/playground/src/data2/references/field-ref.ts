import type {FieldReference} from './field-reference.ts';
import {type DataStorage, ensurePathArray, ensurePathString, type PathType} from '@axi-engine/utils';
import type {ChangeFieldListener, DeleteNodeListener} from '../event-bus';
import type {StoreEventSubscriber} from '../event-bus/store-event-subscriber.ts';

export class FieldRef<T> implements FieldReference<T> {

  readonly _store: DataStorage & StoreEventSubscriber;
  readonly _path: string;
  readonly _pathArr: string[];

  get path() {
    return this._path;
  }

  get pathArr() {
    return this._pathArr;
  }

  set value(val: T) {
    this._store.set(this._pathArr, val);
  }

  get value() {
    return this._store.get(this._pathArr);
  }

  constructor(store: DataStorage & StoreEventSubscriber, path: PathType) {
    this._store = store;
    this._path = ensurePathString(path);
    this._pathArr = ensurePathArray(path);
  }

  onChange(listener: ChangeFieldListener<T>) {
    return this._store.onChange<T>(this._path, listener);
  }

  onDelete(listener: DeleteNodeListener<T>) {
    return this._store.onDelete<T>(this._path, listener);
  }

  unsubscribeOnChange(listener: ChangeFieldListener<T>) {
    this._store.unsubscribeOnChange(this._path, listener);
  }

  unsubscribeOnDelete(listener: DeleteNodeListener<T>) {
    this._store.unsubscribeOnDelete(this._path, listener);
  }
}
