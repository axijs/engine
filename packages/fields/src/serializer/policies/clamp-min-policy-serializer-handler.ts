import {PolicySerializerHandler} from '../policy-serializer';
import {ClampMinPolicy} from '../../policies';


export class ClampMinPolicySerializerHandler implements PolicySerializerHandler<ClampMinPolicy, { min: number }> {
  snapshot(policy: ClampMinPolicy) {
    return { min: policy.min };
  }

  hydrate(data: { min: number }) {
    return new ClampMinPolicy(data.min);
  }
}
