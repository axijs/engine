import type {StoreWithEvents} from '../types';
import {ensurePathArray, ensurePathString, PathType} from '@axi-engine/utils';
import {NodeReference} from '../node-reference';
import type {DeleteNodeListener} from '../../event-bus';

export class NodeRef<T> implements NodeReference<T> {
  readonly _store: StoreWithEvents;
  readonly _path: string;
  readonly _pathArr: string[];

  get path() {
    return this._path;
  }

  get pathArr() {
    return this._pathArr;
  }

  constructor(store: StoreWithEvents, path: PathType) {
    this._store = store;
    this._path = ensurePathString(path);
    this._pathArr = ensurePathArray(path);
  }

  onDelete(listener: DeleteNodeListener<T>) {
    return this._store.onDelete<T>(this._path, listener);
  }

  unsubscribeOnDelete(listener: DeleteNodeListener<T>) {
    this._store.unsubscribeOnDelete(this._path, listener);
  }
}
