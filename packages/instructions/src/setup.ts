import {InstructionHandler} from './instruction-handler';
import {
  CreateVariableInstructionHandler,
  DeleteVariableInstructionHandler,
  IfInstructionHandler, LogInstructionHandler,
  SetVariableInstructionHandler, SwitchInstructionHandler,
  UpSetVariableInstructionHandler
} from './handlers';
import {CoreInstructionResolver} from './core-instruction-resolver';


/**
 * Creates instances of handlers responsible for data manipulation.
 * Includes operations to create, delete, set, and upsert variables in the storage.
 * @returns {InstructionHandler[]} Array of data-related handlers.
 */
export function createDataInstructionHandlers(): InstructionHandler[] {
  return [
    new CreateVariableInstructionHandler(),
    new DeleteVariableInstructionHandler(),
    new SetVariableInstructionHandler(),
    new UpSetVariableInstructionHandler(),
  ];
}

/**
 * Creates instances of handlers responsible for control flow and logic.
 * Includes conditional branching (If, Switch).
 * @returns {InstructionHandler[]} Array of logic-related handlers.
 */
export function createLogicalInstructionHandlers(): InstructionHandler[] {
  return [
    new IfInstructionHandler(),
    new SwitchInstructionHandler(),
  ];
}

/**
 * Creates instances of utility handlers.
 * Includes debugging tools like logging.
 * @returns {InstructionHandler[]} Array of utility handlers.
 */
export function createUtilInstructionHandlers(): InstructionHandler[] {
  return [
    new LogInstructionHandler()
  ];
}

/**
 * A builder class for configuring and creating an `InstructionResolver` instance.
 * Allows selecting specific groups of instructions or adding custom ones using a fluent API.
 */
export class InstructionResolverBuilder {
  private handlers: InstructionHandler[] = [];

  /**
   * Adds the complete standard set of handlers (Data, Logical, and Util).
   * Recommended for most use cases.
   */
  withDefaults(): this {
    this.handlers.push(
      ...createDataInstructionHandlers(),
      ...createLogicalInstructionHandlers(),
      ...createUtilInstructionHandlers());
    return this;
  }

  /**
   * Adds only the data manipulation handlers.
   */
  withData(): this {
    this.handlers.push(...createDataInstructionHandlers());
    return this;
  }

  /**
   * Adds only the logical control flow handlers.
   */
  withLogic(): this {
    this.handlers.push(...createLogicalInstructionHandlers());
    return this;
  }

  /**
   * Adds only the utility handlers.
   */
  withUtil(): this {
    this.handlers.push(...createUtilInstructionHandlers());
    return this;
  }

  /**
   * Registers one or more custom instruction handlers.
   * Useful for plugins or game-specific instructions.
   * @param handler A single handler instance or an array of handlers.
   */
  add(handler: InstructionHandler | InstructionHandler[]): this {
    if (!Array.isArray(handler)) {
      this.handlers.push(handler);
    } else {
      this.handlers.push(...handler);
    }
    return this;
  }

  /**
   * Constructs the `CoreInstructionResolver` and registers all configured handlers.
   * @returns {CoreInstructionResolver} A fully initialized resolver ready to execute instructions.
   */
  build(): CoreInstructionResolver {
    const resolver = new CoreInstructionResolver();
    this.handlers.forEach(handler => resolver.register(handler));
    return resolver;
  }
}

/**
 * Entry point to start configuring an instruction resolver.
 * @returns {InstructionResolverBuilder} A new builder instance.
 */
export function configureInstructions(): InstructionResolverBuilder {
  return new InstructionResolverBuilder();
}
