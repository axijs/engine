import {FieldPolicy} from './field-policies';
import {Emitter} from '@axi-engine/utils';

/**
 * A state container that wraps a value.
 * It allows applying a pipeline of transformation or validation "policies" before any new value is set.
 *
 * @template T The type of the value this field holds.
 *
 */
export class Field<T> {
  /** A unique identifier for the field. */
  private readonly _name: string;
  private _val!: T;

  private readonly policies = new Map<string, FieldPolicy<T>>();
  readonly onChange: Emitter<[T]> = new Emitter<[T]>();

  get name() {
    return this._name;
  }

  /**
   * Creates an instance of a Field.
   * @param name A unique identifier for the field.
   * @param initialVal The initial value of the field.
   * @param options Optional configuration for the field.
   * @param options.policies An array of policies to apply to the field's value on every `set` operation.
   */
  constructor(name: string, initialVal: T, options?: { policies?: FieldPolicy<T>[] }) {
    this._name = name;
    options?.policies?.forEach(policy => this.policies.set(policy.id, policy));
    this.set(initialVal);
  }

  /**
   * Gets the current raw value of the field.
   * For reactive updates, it's recommended to use the `.signal` property instead.
   */
  get val(): T {
    return this._val;
  }

  /**
   * Sets a new value for the field.
   * The provided value will be processed by all registered policies before the underlying signal is updated.
   * @param val The new value to set.
   */
  set(val: T) {
    let finalVal = val;
    this.policies.forEach(policy => finalVal = policy.apply(finalVal));
    this._val = finalVal;
    this.onChange.emit(this._val);
  }

  /**
   * Retrieves a specific policy instance by its ID.
   * Useful for accessing a policy's internal state or methods.
   * @template P The expected type of the policy.
   * @param id The unique ID of the policy to retrieve.
   * @returns The policy instance, or `undefined` if not found.
   */
  getPolicy<P extends FieldPolicy<T>>(id: string): P | undefined {
    return this.policies.get(id) as P;
  }

  /**
   * Adds a new policy to the field or replaces an existing one with the same ID.
   * The new policy will be applied on the next `set()` operation.
   * If a policy with the same ID already exists, its `destroy` method will be called before it is replaced.
   * @param policy The policy instance to add.
   */
  addPolicy(policy: FieldPolicy<T>): void {
    const existed = this.policies.get(policy.id);
    existed?.destroy?.();

    this.policies.set(policy.id, policy);
  }

  /**
   * Removes a policy from the field by its ID and call `destroy` method.
   * @param policyId The unique ID of the policy to remove.
   * @returns `true` if the policy was found and removed, otherwise `false`.
   */
  removePolicy(policyId: string): boolean {
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
  clearPolicies(): void {
    this.policies.forEach(policy => policy.destroy?.());
    this.policies.clear();
  }

  /**
   * Forces the current value to be re-processed by all policies.
   * Useful if a policy's logic has changed and you need to re-evaluate the current state.
   */
  reapplyPolicies() {
    this.set(this.val);
  }

  /**
   * Cleans up resources used by the field and its policies.
   * This should be called when the field is no longer needed to prevent memory leaks from reactive policies.
   */
  destroy() {
    this.clearPolicies();
  }
}
