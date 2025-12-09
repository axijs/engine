import {PolicySerializerHandler} from '../policy-serializer';
import {ClampMinPolicy} from '@axi-engine/fields';

export class ClampMinPolicySerializerHandler implements PolicySerializerHandler<ClampMinPolicy, { min: number }> {
  snapshot(policy: ClampMinPolicy) {
    return { min: policy.min };
  }

  hydrate(data: { min: number }) {
    return new ClampMinPolicy(data.min);
  }
}
