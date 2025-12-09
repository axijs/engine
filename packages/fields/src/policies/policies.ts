import {Policy} from './policy';


export class Policies<T> {
  private readonly policies = new Map<string, Policy<T>>();

  get items() {
    return this.policies;
  }

  /**
   * Retrieves a specific policy instance by its ID.
   * Useful for accessing a policy's internal state or methods.
   * @template P The expected type of the policy.
   * @param id The unique ID of the policy to retrieve.
   * @returns The policy instance, or `undefined` if not found.
   */
  get<P extends Policy<T>>(id: string): P | undefined {
    return this.policies.get(id) as P;
  }

  /**
   * Adds a new policy to the field or replaces an existing one with the same ID.
   * The new policy will be applied on the next `set()` operation.
   * If a policy with the same ID already exists, its `destroy` method will be called before it is replaced.
   * @param policy The policy instance to add.
   */
  add(policy: Policy<T>) {
    const existed = this.policies.get(policy.id);
    existed?.destroy?.();
    this.policies.set(policy.id, policy);

    return this;
  }

  /**
   * Removes a policy from the field by its ID and call `destroy` method.
   * @param policyId The unique ID of the policy to remove.
   * @returns `true` if the policy was found and removed, otherwise `false`.
   */
  remove(policyId: string): boolean {
    const policyToRemove = this.policies.get(policyId);
    if (!policyToRemove) {
      return false;
    }
    policyToRemove.destroy?.();
    return this.policies.delete(policyId);
  }

  /**
   * Removes all policies from the field.
   * After this, `set()` will no longer apply any transformations to the value until new policies are added.
   */
  clear(): void {
    this.policies.forEach(policy => policy.destroy?.());
    this.policies.clear();
  }

  /**
   * Forces the current value to be re-processed by all policies.
   * Useful if a policy's logic has changed and you need to re-evaluate the current state.
   */
  apply(val: T) {
    let finalVal = val;
    this.policies.forEach(policy => finalVal = policy.apply(finalVal));
    return finalVal;
  }
}
