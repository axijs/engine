export class StoreChangeBuffer {
  _created = new Map<string, unknown>();
  _changed = new Map<string, unknown>();
  _deleted  = new Map<string, unknown>();

  created(path: string, val: unknown) {
    this._created.set(path, val);
  }

  changed(path: string, val: unknown) {
    this._changed.set(path, val);
  }

  deleted(path: string, val: unknown) {
    this._deleted.set(path, val);
  }

  clear() {
    this._changed.clear();
    this._changed.clear();
    this._deleted.clear();
  }

}
