import {InstructionHandler} from './instruction-handler';
import {firstKeyOf, Registry} from '@axi-engine/utils';
import {InstructionResolverContext} from './instruction-resolver-context';
import {Instruction, InstructionName} from './instructions';
import {registerInstructionName, unregisterInstructionName} from './config';
import {InstructionError} from './errors';


/**
 * The core engine for executing declarative statements.
 * Manages the registry of handlers and dispatches execution to the appropriate handler.
 *
 * @class
 */
export class CoreInstructionResolver {
  /** Registry of handlers mapped by statement name. */
  readonly handlers = new Registry<InstructionName, InstructionHandler<any, any>>();

  /**
   * Registers a new statement handler and updates the global configuration
   * to recognize the statement name in type guards.
   * @param handler The handler instance to register.
   */
  register(handler: InstructionHandler) {
    registerInstructionName(handler.name);
    this.handlers.register(handler.name, handler);
  }

  /**
   * Unregisters a handler and removes its name from the global configuration.
   * @param name The name of the statement to remove.
   */
  unregister(name: InstructionName) {
    this.handlers.delete(name);
    unregisterInstructionName(name);
  }

  /**
   * Executes a single statement or a sequence of instructions.
   * Execution stops if any statement throws an error.
   *
   * @param instructions A single statement object or an array of them.
   * @param context The context providing necessary services (storage, expressions, etc.).
   * @throws {InstructionError} If execution fails, wrapping the original error and the causing statement.
   */
  async execute<C extends InstructionResolverContext>(instructions: Instruction | Instruction[], context: C): Promise<void> {
    const toExec = Array.isArray(instructions) ? instructions : [instructions];
    for (const statement of toExec) {
      try {
        await this.dispatch<C>(statement, context);
      } catch (error: any) {
        if (error instanceof InstructionError) {
          throw error;
        }
        throw new InstructionError(error.message || 'Unknown error during execution', statement, { cause: error });
      }
    }
  }

  /**
   * Identifies the statement type and delegates execution to the registered handler.
   */
  private dispatch<C extends InstructionResolverContext>(instruction: Instruction, context: C): Promise<void> {
    const key = firstKeyOf(instruction) as InstructionName;
    return this.handlers.getOrThrow(key).process(instruction, context);
  }
}
