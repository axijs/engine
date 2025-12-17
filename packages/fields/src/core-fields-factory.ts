import {CoreFields} from './core-fields';
import {FieldRegistry} from './field-registry';
import {FieldsFactory} from './fields-factory';


export class CoreFieldsFactory implements FieldsFactory<CoreFields> {
  protected readonly _fieldRegistry: FieldRegistry;

  get fieldRegistry() {
    return this._fieldRegistry;
  }

  constructor(fieldRegistry: FieldRegistry) {
    this._fieldRegistry = fieldRegistry;
  }

  fields() {
    return new CoreFields(this._fieldRegistry)
  }
}

