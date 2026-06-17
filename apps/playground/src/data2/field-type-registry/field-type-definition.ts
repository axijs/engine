import type {BaseNode, RegisteredField} from '../fields';

export interface FieldTypeDefinition {
  // type guard for variable, isString isBoolean isNumeric etc
  checkType(val: unknown): boolean;
  // type guard for node
  checkNode(field: BaseNode): boolean;
  // creating node
  createNode(val: unknown): RegisteredField;
}

