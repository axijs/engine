import {Fields} from './fields';
import {FieldTree} from './field-tree';
import {DefaultFields} from './default-fields';
import {FieldRegistry} from './field-registry';

/**
 * Defines the contract for a factory that creates nodes for a FieldTree.
 * This allows for custom implementations of Fields and FieldTree to be used.
 */
export interface TreeNodeFactory<TFields extends Fields> {
  fields(): TFields,
  tree(): FieldTree<TFields>
}

/**
 * The default factory implementation that creates standard DefaultFields and FieldTree instances.
 */
export class DefaultTreeNodeFactory implements TreeNodeFactory<DefaultFields> {

  constructor(private readonly fieldRegistry: FieldRegistry) {
  }

  fields = () => new DefaultFields(this.fieldRegistry);
  tree = () => new FieldTree<DefaultFields>(this);
}
