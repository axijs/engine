export interface BaseNode {
  type: string;
}

export interface Field<T> extends BaseNode {
  value: T;
}

export interface GenericField extends Field<any> {
  type: 'generic';
}

export interface NumericField extends Field<number> {
  type: 'numeric'
}

export interface BooleanField extends Field<boolean> {
  type: 'boolean'
}

export interface StringField extends Field<string> {
  type: 'string'
}

export interface RegisteredFields {
  generic: GenericField,
  numeric: NumericField,
  boolean: BooleanField,
  string: StringField
}

export type RegisteredField = RegisteredFields[keyof RegisteredFields];

export type FieldName = keyof RegisteredFields;
