import {CoreFieldsFactory} from './core-fields-factory';
import {FieldTreeFactory} from './field-tree-factory';
import {CoreFields} from './core-fields';
import {FieldRegistry} from './field-registry';
import {CoreFieldTree} from './core-field-tree';

/**
 * The default factory implementation that creates standard DefaultFields and FieldTree instances.
 */
export class CoreTreeNodeFactory extends CoreFieldsFactory implements FieldTreeFactory<CoreFields> {
  constructor(fieldRegistry: FieldRegistry) {
    super(fieldRegistry);
  }

  tree() {
    return new CoreFieldTree(this);
  }
}
