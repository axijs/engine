import type {ReferenceRegistryConfig} from './types.ts';
import {ReadonlyFieldRef, FieldRef, StringFieldRef, BooleanFieldRef, NumericFieldRef} from '../references';

export const referenceRegistryDefaultConfig: ReferenceRegistryConfig = {
  readonly: (store, path) => new ReadonlyFieldRef(store, path),
  generic: (store, path) => new FieldRef(store, path),
  string: (store, path) => new StringFieldRef(store, path),
  boolean: (store, path) => new BooleanFieldRef(store, path),
  numeric: (store, path) => new NumericFieldRef(store, path)
}
