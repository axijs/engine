import {NodeReference} from './node-reference';
import {FieldReference} from './field-reference';

export interface CollectionReference<T extends FieldReference<any>> extends NodeReference<void> {
  clear(): void;
}
