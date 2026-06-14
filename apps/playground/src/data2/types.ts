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

export type FieldNode = Field<any> | FieldGroup;

export interface FieldGroup extends BaseNode {
  type: 'group';
  items: Record<string, FieldNode>;
}
