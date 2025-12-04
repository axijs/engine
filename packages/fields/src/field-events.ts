import {BaseField} from './field';

export interface FieldCreatedEvent<T> {
  fieldName: string;
  field: BaseField<T>;
}

export interface FieldRemovedEvent {
  fieldNames: string[];
}

export type FieldEvent<T = any> = FieldCreatedEvent<T> | FieldRemovedEvent;
