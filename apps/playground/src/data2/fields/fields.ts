export interface BaseNode {
  type: string;
}

export interface Field<T> extends BaseNode {
  value: T;
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

export interface Fields {
  generic: Field<any>,
  numeric: NumericField,
  boolean: BooleanField,
  string: StringField
}

export type FieldName = keyof Fields;
