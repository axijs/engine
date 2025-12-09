import {Field, FieldRegistry} from '@axi-engine/fields';
import {PolicySerializer} from './policy-serializer';
import {throwIfEmpty} from '@axi-engine/utils';

export class FieldSerializer {
  constructor(
    private readonly fieldRegistry: FieldRegistry,
    private readonly policySerializer: PolicySerializer
  ) {
  }

  snapshot(field: Field<any>) {
    const serializedPolicies: object[] = [];
    field.policies.items.forEach(policy => serializedPolicies.push(this.policySerializer.snapshot(policy)));

    return {
      __type: field.typeName,
      name: field.name,
      value: field.value,
      policies: serializedPolicies
    }
  }

  hydrate(snapshot: {__type: string, name: string, value: any, policies?: any}) {
    const fieldType = snapshot.__type;
    throwIfEmpty(fieldType, 'Invalid field snapshot: missing "__type" identifier.');
    const Ctor = this.fieldRegistry.get(fieldType);
    const field = new Ctor(snapshot.name, snapshot.value) as Field<any>;

    snapshot.policies?.forEach((p: any) => {
      field.policies.add(this.policySerializer.hydrate(p));
    });

    return field;
  }
}
