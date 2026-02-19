import {Fields} from './fields';

export interface FieldsFactory<TFields extends Fields> {
  fields(): TFields,
}
