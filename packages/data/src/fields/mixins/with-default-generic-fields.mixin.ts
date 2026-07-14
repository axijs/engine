import {Constructor} from '@axi-engine/utils';
import {Fields} from '../fields';
import {CoreField} from '../field-definitions';


export function WithDefaultGenericFields<TBase extends Constructor<Fields>>(Base: TBase) {

  return class FieldsWithDefaultGeneric extends Base {
    createGeneric<T>(name: string, initialValue: T): CoreField<T> {
      return this.create(CoreField.typeName, name, initialValue);
    }

    upsertGeneric<T>(name: string, value: T): CoreField<T> {
      return this.upsert(CoreField.typeName, name, value);
    }

    getGeneric<T>(name: string): CoreField<T> {
      return this.get(name);
    }
  }
}

