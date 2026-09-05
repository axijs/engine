import type {ReadonlyFieldReference} from './readonly-field-reference';
import {ensurePathArray, ensurePathString, type PathType} from '@axi-engine/utils';
import type {ChangeFieldListener, DeleteNodeListener} from '../event-bus';
import type {StoreWithEvents} from './types';


export class ReadonlyFieldRef<T> implements ReadonlyFieldReference<T> {

  readonly _store: StoreWithEvents;
  readonly _path: string;
  readonly _pathArr: string[];

  get path() {
    return this._path;
  }

  get pathArr() {
    return this._pathArr;
  }

  get value() {
    return this._store.get<T>(this._pathArr);
  }

  constructor(store: StoreWithEvents, path: PathType) {
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
