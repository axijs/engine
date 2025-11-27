import {Field} from './field';

export interface FieldCreatedEvent<T> {
  fieldName: string;
  field: Field<T>;
}

export interface FieldRemovedEvent {
  fieldNames: string[];
}

export type FieldEvent<T = any> = FieldCreatedEvent<T> | FieldRemovedEvent;
