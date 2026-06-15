import type {FieldReference} from './field-reference.ts';
import {ensurePathArray, ensurePathString, type PathType} from '@axi-engine/utils';

export class FieldRef<T> implements FieldReference<T> {

  readonly _path: string;
  readonly _pathArr: string[];

  get path() {
    return this._path;
  }

  set value(val: T) {
    console.log(val);
  }

  get value() {
    return 10 as T;
  }

  constructor(path: PathType) {
    this._path = ensurePathString(path);
    this._pathArr = ensurePathArray(path);
  }
}
