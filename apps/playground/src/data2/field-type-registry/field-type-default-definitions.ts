import type {FieldTypeDefinition} from './field-type-definition.ts';
import {type Field, type FieldName, NodeFactory} from '../fields';
import {isBoolean, isNumber, isString} from '@axijs/ensure';
import {isBoolean as isNodeBoolean, isNumeric as isNodeNumeric, isString as isNodeString} from '../fields';

export const fieldTypeDefaultDefinitions: Partial<Record<FieldName, FieldTypeDefinition>> = {
  boolean: {
    checkType: (val: unknown) => isBoolean(val),
    checkNode: (node: Field<any>) => isNodeBoolean(node),
    createNode: (val: unknown) => NodeFactory.bool(val as boolean)
  },
  numeric: {
    checkType: (val: unknown) => isNumber(val),
    checkNode: (node: Field<any>) => isNodeNumeric(node),
    createNode: (val: unknown) => NodeFactory.num(val as number)
  },
  string: {
    checkType: (val: unknown) => isString(val),
    checkNode: (node: Field<any>) => isNodeString(node),
    createNode: (val: unknown) => NodeFactory.str(val as string)
  }
};
