import {defaultFieldFactoryRegistry, Field} from '@axi-engine/fields';

export const FieldSerializer = {
  snapshot(field: Field<any>) {
    console.log(field instanceof defaultFieldFactoryRegistry.generic);
    console.log(field instanceof defaultFieldFactoryRegistry.string);
    console.log(field instanceof defaultFieldFactoryRegistry.numeric);
    console.log(field instanceof defaultFieldFactoryRegistry.boolean);
  },
  hydrate(snapshot: any) {
  }
}
