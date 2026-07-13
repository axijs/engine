import {throwIfEmpty} from '@axijs/ensure';

export class StoreChangeBuffer {
  _created = new Map<string, unknown>();
  _changed = new Map<string, {value: unknown, oldValue: unknown}>();
  _deleted  = new Map<string, unknown>();

  created(path: string, val: unknown) {
    this._created.set(path, val);
  }

  changed(path: string, value: unknown, oldValue: unknown) {
    this._changed.set(path, {value, oldValue});
  }

  deleted(path: string, val: unknown) {
    this._deleted.set(path, val);
  }

  hasCreated(path: string) {
    return this._created.has(path);
  }
  hasChanged(path: string) {
    return this._changed.has(path);
  }

  hasDeleted(path: string) {
    return this._deleted.has(path);
  }

  getCreatedPaths() {
    return [...this._created.keys()];
  }

  getChangedPaths() {
    return [...this._changed.keys()];
  }

  getDeletedPaths() {
    return [...this._deleted.keys()];
  }

  /* created can return undefined because it can be node */
  getCreatedValue(path: string): unknown {
    return this._created.get(path);
  }

  getChangedValue(path: string) {
    const res = this._changed.get(path);
    throwIfEmpty(res, `Can't find values by path: '${path}'`);
    return res;
  }

  /* deleted can return undefined because it can be node */
  getDeletedValue(path: string): unknown {
    return this._deleted.get(path);
  }

  clear() {
    this._created.clear();
    this._changed.clear();
    this._deleted.clear();
  }

}
