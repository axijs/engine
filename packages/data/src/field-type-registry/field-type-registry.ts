import {Registry} from '@axi-engine/utils';
import {type Field, type FieldName, type RegisteredField} from '../fields';
import type {FieldTypeDefinition} from './field-type-definition';
import {fieldTypeGenericDefinition} from './field-type-default-definitions';


export class FieldTypeRegistry {
  private registry = new Registry<FieldName, FieldTypeDefinition>();

  private fallbackName: FieldName = 'generic';
  private fallbackItem: FieldTypeDefinition = fieldTypeGenericDefinition;

  register(fieldName: FieldName, config: FieldTypeDefinition) {
    this.registry.register(fieldName, config);
  }

  getDefinition(type: FieldName) {
    return this.registry.get(type) ?? this.fallbackItem;
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
    return this.matchDefinition(val)[0];
  }

  isValueEquivalent(node: Field<any>, newVal: unknown): boolean {
    const match = this.matchDefinition(newVal);
    return match[1].isValueEquivalent(node.value, newVal);
  }

  cloneNodeValue(val: Field<unknown>) {
    return this.getDefinition(val.type as FieldName).cloneValue(val.value);
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
