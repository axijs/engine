import type {FieldReference} from './field-reference';
import {ReadonlyFieldReference} from './readonly-field-reference';
import {NumericFieldReference} from './numeric-field-reference';
import {BooleanFieldReference} from './boolean-field-reference';
import {StringFieldReference} from './string-field-reference';

export interface FieldReferences {
  readonly: ReadonlyFieldReference<any>,
  generic: FieldReference<any>,
  numeric: NumericFieldReference,
  boolean: BooleanFieldReference,
  string: StringFieldReference
}

export type FieldReferenceName = keyof FieldReferences;
