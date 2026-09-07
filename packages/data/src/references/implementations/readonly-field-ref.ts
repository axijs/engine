import {type PathType} from '@axi-engine/utils';
import type {ReadonlyFieldReference} from '../readonly-field-reference';
import type {ChangeFieldListener} from '../../event-bus';
import type {StoreWithEvents} from '../types';
import {NodeRef} from './node-ref';


export class ReadonlyFieldRef<T> extends NodeRef<T> implements ReadonlyFieldReference<T> {

  get value() {
    return this._store.get<T>(this._pathArr);
  }

  constructor(store: StoreWithEvents, path: PathType) {
    super(store, path);
  }

  onChange(listener: ChangeFieldListener<T>) {
    return this._store.onChange<T>(this._path, listener);
  }

  unsubscribeOnChange(listener: ChangeFieldListener<T>) {
    this._store.unsubscribeOnChange(this._path, listener);
  }
}
