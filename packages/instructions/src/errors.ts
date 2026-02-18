import {Instruction} from './instructions';

/**
 * Custom error thrown when a instruction fails to execute or validate.
 * Holds a reference to the specific instruction object that caused the error.
 */
export class InstructionError extends Error {
  /** The instruction object that caused the error. */
  public readonly instruction: Instruction;

  /**
   * @param message Description of the error.
   * @param instruction The instruction object associated with the failure.
   * @param options Standard error options (e.g., for chaining causes).
   */
  constructor(message: string, instruction: Instruction, options?: ErrorOptions) {
    super(message, options);
    this.name = 'InstructionError';
    this.instruction = instruction;
  }
}
