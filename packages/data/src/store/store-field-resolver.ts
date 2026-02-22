import {CoreBooleanField, CoreNumericField, CoreStringField} from '../fields';
import {isBoolean, isNumber, isString} from '@axi-engine/utils';

export interface StoreFieldResolver {
  /**
   * The typeName this resolver corresponds to in the FieldRegistry.
   * e.g., 'numeric', 'boolean', 'vector'
   */
  typeName: string;

  /**
   * Checks if this resolver can handle the given value.
   * @param value The value to check.
   * @returns {boolean} True if the value is supported, otherwise false.
   */
  supports(value: unknown): boolean
}

export class NumericFieldResolver implements StoreFieldResolver {
  readonly typeName = CoreNumericField.typeName;
  supports(value: unknown): boolean {
    return isNumber(value);
  }
}

export class BooleanFieldResolver implements StoreFieldResolver {
  readonly typeName = CoreBooleanField.typeName;
  supports(value: unknown): boolean {
    return isBoolean(value);
  }
}
export class StringFieldResolver implements StoreFieldResolver {
  readonly typeName = CoreStringField.typeName;
  supports(value: unknown): boolean {
    return isString(value);
  }
}
