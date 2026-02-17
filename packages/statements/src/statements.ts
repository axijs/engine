import {Expression, Operand, ReferenceOperand} from '@axi-engine/expressions';
import {PathType} from '@axi-engine/utils';

/**
 * Represents a logging operation.
 * Outputs a static message or a mix of strings and variable values to the system log.
 */
export interface LogStatement {
  log: string | (string | ReferenceOperand)[]
}

/**
 * Creates a new variable at the specified path.
 * Throws an error if the variable already exists.
 */
export interface CreateVariableStatement {
  create: {
    field: PathType,
    var: Operand
  }
}

/**
 * Updates the value of an existing variable.
 * Throws an error if the variable does not exist.
 */
export interface SetVariableStatement {
  set: {
    field: PathType,
    var: Operand
  }
}

/**
 * Updates an existing variable or creates a new one if it doesn't exist.
 * Acts as an "Upsert" operation.
 */
export interface UpSetVariableStatement {
  upset: {
    field: PathType,
    var: Operand
  }
}

/**
 * Removes a variable or a group of variables at the specified path.
 */
export interface DeleteVariableStatement {
  delete: PathType
}

/**
 * Executes a sequence of statements based on a boolean condition.
 */
export interface IfStatement {
  if: {
    /** The condition expression to evaluate. */
    condition: Expression,
    /** Statements to execute if the condition is true. */
    then: Statement[],
    /** Optional statements to execute if the condition is false. */
    else?: Statement[],
  }
}

/**
 * Single case in a switch statement.
 */
export interface SwitchCase {
  /** The value to match against the switch check. */
  case: Operand;
  /** The statements to execute if matched. */
  do: Statement[];
}

/**
 * Evaluates an operand and executes the corresponding case statements.
 * Similar to a switch-case structure in programming languages.
 */
export interface SwitchStatement {
  switch: {
    /** The value to test (can be a variable reference or a math result). */
    check: Operand;
    /** Ordered list of cases. First match wins. */
    cases: SwitchCase[];
    /** Optional fallback if no cases match. */
    default?: Statement[];
  }
}


/**
 * A registry mapping statement keys to their corresponding interfaces.
 * Used for type mapping and validation.
 */
export interface RegisteredStatements {
  log: LogStatement;
  create: CreateVariableStatement;
  set: SetVariableStatement;
  upset: UpSetVariableStatement;
  delete: DeleteVariableStatement;
  if: IfStatement;
  switch: SwitchStatement;
}

/**
 * Union type representing any valid statement within the system.
 */
export type Statement = RegisteredStatements[keyof RegisteredStatements];

/**
 * Union type representing the valid keys (names) for registered statements.
 */
export type StatementName = keyof RegisteredStatements;
