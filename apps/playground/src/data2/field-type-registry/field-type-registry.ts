import {Registry} from '@axi-engine/utils';
import {type Field, type FieldName, type RegisteredField} from '../fields';
import type {FieldTypeDefinition} from './field-type-definition.ts';
import {fieldTypeGenericDefinition} from './field-type-default-definitions.ts';


export class FieldTypeRegistry {
  private registry = new Registry<FieldName, FieldTypeDefinition>();

  private fallbackName: FieldName = 'generic';
  private fallbackItem: FieldTypeDefinition = fieldTypeGenericDefinition;

  register(fieldName: FieldName, config: FieldTypeDefinition) {
    this.registry.register(fieldName, config);
  }

  setFallback(fieldName: FieldName, config: FieldTypeDefinition) {
    this.fallbackName = fieldName;
    this.fallbackItem = config;
  }

  createNode(val: unknown): RegisteredField {
    const match = this.matchDefinition(val);
    return match[1].createNode(val);
  }

  compare(node: Field<any>, val: unknown): boolean {
    return node.type === this.getNodeNameByVariable(val);
  }

  getNodeNameByVariable(val: unknown): FieldName {
    return  this.matchDefinition(val)[0];
  }

  cloneValue(val: unknown) {
    const match = this.matchDefinition(val);
    return match[1].cloneValue(val);
  }

  private matchDefinition(val: unknown) {
    const res = this.registry.find((conf) => conf.checkType(val));
    return res ?? [this.fallbackName, this.fallbackItem];
  }
}
