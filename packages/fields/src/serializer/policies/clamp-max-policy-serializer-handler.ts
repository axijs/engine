import {PolicySerializerHandler} from '../policy-serializer';
import {ClampMaxPolicy} from '@axi-engine/fields';

export class ClampMaxPolicySerializerHandler implements PolicySerializerHandler<ClampMaxPolicy, { max: number }> {
  snapshot(policy: ClampMaxPolicy) {
    return { max: policy.max };
  }

  hydrate(data: { max: number }) {
    return new ClampMaxPolicy(data.max);
  }
}
