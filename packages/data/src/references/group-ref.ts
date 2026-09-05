import {GroupReference} from './group-reference';
import {FieldReference} from './field-reference';
import {ReferenceSource} from './reference-source';

export class GroupRef<T extends FieldReference<any>> implements GroupReference<T> {

  constructor(refs: ReferenceSource) {
  }

  clear() {
  }
}
