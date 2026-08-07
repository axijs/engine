import {Registry} from '@axi-engine/utils';
import type {FieldReferenceName} from './field-references.ts';
import type {ReferenceCreator} from './types.ts';

export class ReferenceRegistry {
  registry = new Registry<FieldReferenceName, ReferenceCreator<any>>();

  register(name: FieldReferenceName, creator: ReferenceCreator<any>) {
    this.registry.register(name, creator);
  }
}
