import type {
  BooleanFieldReference,
  FieldReference,
  NumericFieldReference,
  StringFieldReference
} from './field-reference.ts';

export interface FieldReferences {
  generic: FieldReference<any>,
  numeric: NumericFieldReference,
  boolean: BooleanFieldReference,
  string: StringFieldReference
}

export type FieldReferenceName = keyof FieldReferences;
