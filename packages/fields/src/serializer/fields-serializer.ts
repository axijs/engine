import {
  DefaultFields,
  FieldRegistry,
  Fields,
  FieldSerializer,
  FieldSnapshot,
  PolicySerializer
} from '@axi-engine/fields';


export interface FieldsSnapshot {
  __type: string;
  fields: FieldSnapshot[]
}

export class FieldsSerializer {

  constructor(
    private readonly fieldRegistry: FieldRegistry,
    private readonly policySerializer: PolicySerializer
  ) {
  }

  snapshot(fields: Fields): FieldsSnapshot {
    const fieldSerializer = new FieldSerializer(this.fieldRegistry, this.policySerializer);
    const fieldsDump: FieldSnapshot[] = [];
    fields.fields.forEach(field => fieldsDump.push(fieldSerializer.snapshot(field)));

    return {
      __type: 'fields',
      fields: fieldsDump
    };
  }

  hydrate(snapshot: FieldsSnapshot): DefaultFields {
    const fieldSerializer = new FieldSerializer(this.fieldRegistry, this.policySerializer);
    const fields = new DefaultFields(this.fieldRegistry);
    snapshot.fields.forEach(fieldSnapshot => fields.add(fieldSerializer.hydrate(fieldSnapshot)));
    return  fields;
  }
}
