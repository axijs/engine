import {PolicySerializerHandler} from '../policy-serializer';
import {ClampPolicy} from '../../policies';


export class ClampPolicySerializerHandler implements PolicySerializerHandler<ClampPolicy, { min: number, max: number }> {
  snapshot(policy: ClampPolicy) {
    return { min: policy.min, max: policy.max };
  }

  hydrate(data: { min: number, max: number }) {
    return new ClampPolicy(data.min, data.max);
  }
}
