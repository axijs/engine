import {CoreFields} from './core-fields';
import {FieldRegistry} from './field-registry';
import {FieldsFactory} from './fields-factory';


export class CoreFieldsFactory implements FieldsFactory<CoreFields> {
  constructor(private readonly fieldRegistry: FieldRegistry) {
  }

  fields() {
    return new CoreFields(this.fieldRegistry)
  }
}

