import type {BaseNode, Field} from './fields.ts';

export type FieldNode = Field<any> | FieldGroup;

export interface FieldGroup extends BaseNode {
  type: 'group';
  items: Record<string, FieldNode>;
}
