import type {ReferenceRegistryConfig} from './types.ts';
import {ReadonlyFieldRef} from './readonly-field-ref.ts';
import {FieldRef} from './field-ref.ts';
import {StringFieldRef} from './string-field-ref.ts';
import {BooleanFieldRef} from './boolean-field-ref.ts';
import {NumericFieldRef} from './numeric-field-ref.ts';

export const referenceRegistryDefaultConfig: ReferenceRegistryConfig = {
  readonly: (store, path) => new ReadonlyFieldRef(store, path),
  generic: (store, path) => new FieldRef(store, path),
  string: (store, path) => new StringFieldRef(store, path),
  boolean: (store, path) => new BooleanFieldRef(store, path),
  numeric: (store, path) => new NumericFieldRef(store, path)
}
