import {Fields} from './fields';
import {FieldTree} from './field-tree';
import {FieldsFactory} from './fields-factory';


/**
 * Defines the contract for a factory that creates nodes for a FieldTree.
 * This allows for custom implementations of Fields and FieldTree to be used.
 */
export interface FieldTreeFactory<TFields extends Fields> extends FieldsFactory<TFields> {
  fields(): TFields,
  tree(): FieldTree<TFields>
}
