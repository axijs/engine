import type {FieldTypeDefinition} from './field-type-definition';
import {type Field, type FieldName, isGeneric, NodeFactory} from '../fields';
import {isBoolean, isNumber, isString} from '@axijs/ensure';
import {isBoolean as isNodeBoolean, isNumeric as isNodeNumeric, isString as isNodeString} from '../fields';
import {isScalar} from '@axi-engine/utils';
import {dequal} from 'dequal';

export type FieldTypeDefinitionConfig = Partial<Record<FieldName, FieldTypeDefinition>>;

export const fieldTypeGenericDefinition: FieldTypeDefinition = {
  checkType: () => true,
  checkNode: (field) => isGeneric(field),
  createNode: (val) => NodeFactory.generic(val),
  isValueEquivalent: (oldVal, newVal) => dequal(oldVal, newVal),
  cloneValue: (val: unknown) => isScalar(val) ? val : structuredClone(val)
};

export const fieldTypeDefaultDefinitions: FieldTypeDefinitionConfig = {
  boolean: {
    checkType: (val: unknown) => isBoolean(val),
    checkNode: (node: Field<any>) => isNodeBoolean(node),
    createNode: (val: unknown) => NodeFactory.bool(val as boolean),
    isValueEquivalent: (oldVal, newVal) => oldVal === newVal,
    cloneValue: (val: unknown) => val,
  },
  numeric: {
    checkType: (val: unknown) => isNumber(val),
    checkNode: (node: Field<any>) => isNodeNumeric(node),
    createNode: (val: unknown) => NodeFactory.num(val as number),
    isValueEquivalent: (oldVal, newVal) => Object.is(oldVal, newVal),
    cloneValue: (val: unknown) => val,
  },
  string: {
    checkType: (val: unknown) => isString(val),
    checkNode: (node: Field<any>) => isNodeString(node),
    createNode: (val: unknown) => NodeFactory.str(val as string),
    isValueEquivalent: (oldVal, newVal) => oldVal === newVal,
    cloneValue: (val: unknown) => val,
  }
};
