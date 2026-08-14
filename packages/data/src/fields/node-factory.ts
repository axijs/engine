import type {BooleanField, Field, FieldName, GenericField, NumericField, StringField} from './fields';
import type {FieldGroup, FieldNode} from './field-group';

export const NodeFactory = {
  raw: <T>(type: string, value: T): Field<any> => ({type: type as FieldName, value}),
  generic: (value: unknown): GenericField => ({type: 'generic', value}),
  num: (value: number): NumericField => ({type: 'numeric', value}),
  bool: (value: boolean): BooleanField => ({type: 'boolean', value}),
  str: (value: string): StringField => ({type: 'string', value}),
  group: (data: Record<string, FieldNode> = {}): FieldGroup => ({type: 'group', items: data})
}


