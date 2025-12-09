import {Policy} from '../policies';
import {throwIf, throwIfEmpty} from '@axi-engine/utils';

/**
 * Defines the contract for a handler that can serialize and deserialize a specific type of Policy.
 * @template T - The specific Policy class this handler manages.
 * @template S - The shape of the plain object this handler produces/consumes.
 */
export interface PolicySerializerHandler<T extends Policy<any>, S extends object> {
  /**
   * Converts a Policy instance into a serializable plain object.
   * @param policy The Policy instance to serialize.
   * @returns A plain object representing the policy's state.
   */
  snapshot(policy: T): S;

  /**
   * Creates a new Policy instance from a plain object.
   * @param snapshotData The plain object containing the policy's state.
   * @returns A new instance of the Policy.
   */
  hydrate(snapshotData: S): T;
}

export class PolicySerializer {
  private readonly handlers = new Map<string, PolicySerializerHandler<any, any>>();

  register(policyId: string, handler: PolicySerializerHandler<any, any>) {
    throwIf(this.handlers.has(policyId), `A handler for policy ID '${policyId}' is already registered.`);
    this.handlers.set(policyId, handler);
    return this;
  }

  clearHandlers() {
    this.handlers.clear();
  }

  /**
   * Creates a serializable snapshot of a policy instance.
   * The snapshot includes the policy's state and a `__type` identifier.
   * @param policy The policy instance to snapshot.
   * @returns A plain object ready for JSON serialization.
   * @throws If no handler is registered for the policy's ID.
   */
  snapshot(policy: Policy<any>): object {
    const handler = this.handlers.get(policy.id);
    throwIfEmpty(handler, `No serializer handler registered for policy ID: '${policy.id}'`);
    const data = handler.snapshot(policy);

    return {
      __type: policy.id,
      ...data
    };
  }

  /**
   * Restores a policy instance from its snapshot representation.
   * @param snapshot The plain object snapshot, which must contain a `__type` property.
   * @returns A new, fully functional policy instance.
   * @throws If the snapshot is invalid or no handler is registered for its `__type`.
   */
  hydrate(snapshot: any): Policy<any> {
    const typeId = snapshot?.__type;
    throwIfEmpty(typeId, 'Invalid policy snapshot: missing "__type" identifier.');
    const handler = this.handlers.get(typeId);
    throwIfEmpty(handler, `No serializer handler registered for policy ID: '${typeId}'`);
    const { __type, ...data } = snapshot;

    return handler.hydrate(data);
  }
}
