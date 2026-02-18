import {RegisteredInstructions, Instruction, InstructionName} from './instructions';
import {firstKeyOf, isNullOrUndefined} from '@axi-engine/utils';
import {isRegisteredInstructionName} from './config';

/**
 * A type guard that checks if an unknown value has the basic structure of a Instruction.
 *
 * @param value The value to check.
 * @returns {boolean} `true` if the value is a valid Instruction object, otherwise `false`.
 */
export function isInstruction(value: unknown): value is Instruction {
  if (isNullOrUndefined(value) || typeof value !== 'object' || Object.keys(value).length !== 1) {
    return false;
  }
  return isRegisteredInstructionName(firstKeyOf(value));
}

/**
 * A generic type guard that checks if a instruction is of a specific type.
 *
 * This function provides type-safe way to narrow down the `Instruction`
 * union type to a specific instruction interface (e.g., `LogInstruction`, `IfInstruction`).
 *
 * @template T - The specific instruction name (type) to check against.
 * @param {Instruction} instruction - The instruction object to check.
 * @param {T} type - The instruction name to match (e.g., 'log', 'if', 'set').
 * @returns {boolean} `true` if the instruction's key matches the specified type,
 *
 * @example
 * if (isInstruction(myInstruction, 'log')) {
 *   // Inside this block, TypeScript knows `myInstruction` is a `LogInstruction`.
 *   console.log(myInstruction.log);
 * }
 */
export function isInstructionOfKind<T extends InstructionName>(instruction: Instruction, type: T)
  : instruction is RegisteredInstructions[T]
{
  return type in instruction;
}
