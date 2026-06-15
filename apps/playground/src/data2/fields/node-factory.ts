import type {BooleanField, Field, NumericField, StringField} from './fields.ts';
import type {FieldGroup, FieldNode} from './field-group.ts';

export const NodeFactory = {
  generic: <T>(type: string, value: T): Field<T> => ({type, value}),
  num: (value: number): NumericField => ({type: 'numeric', value}),
  bool: (value: boolean): BooleanField => ({type: 'boolean', value}),
  str: (value: string): StringField => ({type: 'string', value}),
  group: (data: Record<string, FieldNode> = {}): FieldGroup => ({type: 'group', items: data})
}


