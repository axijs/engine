import {Expression, Operand, ReferenceOperand} from '@axi-engine/expressions';
import {PathType} from '@axi-engine/utils';

/**
 * Represents a logging operation.
 * Outputs a static message or a mix of strings and variable values to the system log.
 */
export interface LogInstruction {
  log: string | (string | ReferenceOperand)[]
}

/**
 * Creates a new variable at the specified path.
 * Throws an error if the variable already exists.
 */
export interface CreateVariableInstruction {
  create: {
    field: PathType,
    var: Operand
  }
}

/**
 * Updates the value of an existing variable.
 * Throws an error if the variable does not exist.
 */
export interface SetVariableInstruction {
  set: {
    field: PathType,
    var: Operand
  }
}

/**
 * Updates an existing variable or creates a new one if it doesn't exist.
 * Acts as an "Upsert" operation.
 */
export interface UpSetVariableInstruction {
  upset: {
    field: PathType,
    var: Operand
  }
}

/**
 * Removes a variable or a group of variables at the specified path.
 */
export interface DeleteVariableInstruction {
  delete: PathType
}

/**
 * Executes a sequence of Instructions based on a boolean condition.
 */
export interface IfInstruction {
  if: {
    /** The condition expression to evaluate. */
    condition: Expression,
    /** Instructions to execute if the condition is true. */
    then: Instruction[],
    /** Optional Instructions to execute if the condition is false. */
    else?: Instruction[],
  }
}

/**
 * Single case in a switch Instruction.
 */
export interface SwitchCase {
  /** The value to match against the switch check. */
  case: Operand;
  /** The Instructions to execute if matched. */
  do: Instruction[];
}

/**
 * Evaluates an operand and executes the corresponding case Instructions.
 * Similar to a switch-case structure in programming languages.
 */
export interface SwitchInstruction {
  switch: {
    /** The value to test (can be a variable reference or a math result). */
    check: Operand;
    /** Ordered list of cases. First match wins. */
    cases: SwitchCase[];
    /** Optional fallback if no cases match. */
    default?: Instruction[];
  }
}


/**
 * A registry mapping Instruction keys to their corresponding interfaces.
 * Used for type mapping and validation.
 */
export interface RegisteredInstructions {
  log: LogInstruction;
  create: CreateVariableInstruction;
  set: SetVariableInstruction;
  upset: UpSetVariableInstruction;
  delete: DeleteVariableInstruction;
  if: IfInstruction;
  switch: SwitchInstruction;
}

/**
 * Union type representing any valid Instruction within the system.
 */
export type Instruction = RegisteredInstructions[keyof RegisteredInstructions];

/**
 * Union type representing the valid keys (names) for registered Instructions.
 */
export type InstructionName = keyof RegisteredInstructions;
