import type {
  BooleanFieldReference,
  FieldReference,
  NumericFieldReference, ReadonlyFieldReference,
  StringFieldReference
} from './field-reference';

export interface FieldReferences {
  readonly: ReadonlyFieldReference<any>,
  generic: FieldReference<any>,
  numeric: NumericFieldReference,
  boolean: BooleanFieldReference,
  string: StringFieldReference
}

export type FieldReferenceName = keyof FieldReferences;
