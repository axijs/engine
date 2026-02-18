import {InstructionResolverContext} from './instruction-resolver-context';
import {Instruction} from './instructions';


/**
 * The core engine for executing declarative statements.
 * Manages the registry of handlers and dispatches execution to the appropriate handler.
 *
 * @interface
 */
export interface InstructionResolver {

  /**
   * Executes a single statement or a sequence of instructions.
   * Execution stops if any statement throws an error.
   *
   * @param instructions A single statement object or an array of them.
   * @param context The context providing necessary services (storage, expressions, etc.).
   * @throws {InstructionError} If execution fails, wrapping the original error and the causing statement.
   */
  execute<C extends InstructionResolverContext>(instructions: Instruction | Instruction[], context: C): Promise<void>
}
