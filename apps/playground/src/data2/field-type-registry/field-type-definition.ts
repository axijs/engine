import type {Field} from '../fields';

export interface FieldTypeDefinition {
  // type guard for variable, isString isBoolean isNumeric etc
  checkType(val: unknown): boolean;
  // type guard for node
  checkNode(field: Field<any>): boolean;
  // creating node
  createNode(val: unknown): Field<any>;
}

