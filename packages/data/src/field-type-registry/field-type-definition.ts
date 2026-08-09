import type {BaseNode, RegisteredField} from '../fields';

export interface FieldTypeDefinition {
  // type guard for variable, isString isBoolean isNumeric etc
  checkType(val: unknown): boolean;

  // type guard for node
  checkNode(field: BaseNode): boolean;

  // creating node
  createNode(val: unknown): RegisteredField;

  isValueEquivalent(oldVal: unknown, newVal: unknown): boolean;

  // copy node value
  cloneValue(val: unknown): unknown;

  // optional methods for serialization / deserialization,
  // if not set - will use cloveValue of snapshot / hydrate
  serialize?(val: unknown): unknown;

  deserialize?(val: unknown): unknown;
}

