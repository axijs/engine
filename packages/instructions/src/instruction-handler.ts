import {Instruction, InstructionName} from './instructions';
import {InstructionResolverContext} from './instruction-resolver-context';


/**
 * Defines the execution logic for a specific instruction type.
 * @template T The specific instruction interface (e.g., LogInstruction).
 * @template C The context type, defaults to standard instructionResolverContext.
 */
export interface InstructionHandler<
  T extends Instruction = Instruction,
  C extends InstructionResolverContext = InstructionResolverContext
> {
  name: InstructionName;

  /**
   * Executes the logic for the given instruction.
   * @param instruction The instruction data object.
   * @param context Services available during execution.
   * @returns A promise that resolves when execution is complete.
   */
  process(
    instruction: T,
    context: C
  ): Promise<void>;
}
