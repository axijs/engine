import {Registry} from '@axi-engine/utils';
import {isUndefined} from '@axijs/ensure';
import {type Field, type FieldName, isGeneric, NodeFactory} from '../fields';
import type {FieldTypeDefinition} from './field-type-definition.ts';


export class FieldTypeRegistry {
  private registry = new Registry<FieldName, FieldTypeDefinition>();

  private fallbackName: FieldName = 'generic';
  private fallbackItem: FieldTypeDefinition = {
    checkType: () => true,
    checkNode: (field) => isGeneric(field),
    createNode: (val) => NodeFactory.generic(val)
  };

  register(fieldName: FieldName, config: FieldTypeDefinition) {
    this.registry.register(fieldName, config);
  }

  setFallback(fieldName: FieldName, config: FieldTypeDefinition) {
    this.fallbackName = fieldName;
    this.fallbackItem = config;
  }

  createNode(val: unknown) {
    const match = this.registry
      .find((conf) => conf.checkType(val));

    return !isUndefined(match) ? match[1].createNode(val) : this.fallbackItem.createNode(val);
  }

  compare(node: Field<any>, val: unknown): boolean {
    return node.type === this.getNodeNameByVariable(val);
  }

  getNodeNameByVariable(val: unknown): FieldName {
    const match = this.registry
      .find((conf) => conf.checkType(val));

    return !isUndefined(match) ? match[0] : this.fallbackName;
  }
}
