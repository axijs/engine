import {Fields} from './fields';
import {FieldTree} from './field-tree';
import {DefaultFields} from './default-fields';
import {FieldRegistry} from './field-registry';


export interface FieldsFactory<TFields extends Fields> {
  fields(): TFields,
}

export class DefaultFieldsFactory implements FieldsFactory<DefaultFields> {
  constructor(private readonly fieldRegistry: FieldRegistry) {
  }

  fields() {
    return new DefaultFields(this.fieldRegistry)
  }
}

/**
 * Defines the contract for a factory that creates nodes for a FieldTree.
 * This allows for custom implementations of Fields and FieldTree to be used.
 */
export interface TreeNodeFactory<TFields extends Fields> extends FieldsFactory<TFields> {
  fields(): TFields,

  tree(): FieldTree<TFields>
}

/**
 * The default factory implementation that creates standard DefaultFields and FieldTree instances.
 */
export class DefaultTreeNodeFactory extends DefaultFieldsFactory implements TreeNodeFactory<DefaultFields> {
  constructor(fieldRegistry: FieldRegistry) {
    super(fieldRegistry);
  }

  tree() {
    return new FieldTree<DefaultFields>(this);
  }
}
