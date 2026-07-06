import type {FieldTypeDefinition} from './field-type-definition.ts';
import {type Field, type FieldName, isGeneric, NodeFactory} from '../fields';
import {isBoolean, isNumber, isString} from '@axijs/ensure';
import {isBoolean as isNodeBoolean, isNumeric as isNodeNumeric, isString as isNodeString} from '../fields';
import {isScalar} from '@axi-engine/utils';

export const fieldTypeGenericDefinition: FieldTypeDefinition = {
  checkType: () => true,
  checkNode: (field) => isGeneric(field),
  createNode: (val) => NodeFactory.generic(val),
  cloneValue: (val: unknown) => isScalar(val) ? val : structuredClone(val)
};

export const fieldTypeDefaultDefinitions: Partial<Record<FieldName, FieldTypeDefinition>> = {
  boolean: {
    checkType: (val: unknown) => isBoolean(val),
    checkNode: (node: Field<any>) => isNodeBoolean(node),
    createNode: (val: unknown) => NodeFactory.bool(val as boolean),
    cloneValue: (val: unknown) => val,
  },
  numeric: {
    checkType: (val: unknown) => isNumber(val),
    checkNode: (node: Field<any>) => isNodeNumeric(node),
    createNode: (val: unknown) => NodeFactory.num(val as number),
    cloneValue: (val: unknown) => val,
  },
  string: {
    checkType: (val: unknown) => isString(val),
    checkNode: (node: Field<any>) => isNodeString(node),
    createNode: (val: unknown) => NodeFactory.str(val as string),
    cloneValue: (val: unknown) => val,
  }
};
