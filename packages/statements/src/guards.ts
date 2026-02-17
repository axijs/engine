import {RegisteredStatements, Statement, StatementName} from './statements';
import {firstKeyOf, isNullOrUndefined} from '@axi-engine/utils';
import {isRegisteredStatementName} from './config';

/**
 * A type guard that checks if an unknown value has the basic structure of a Statement.
 *
 * @param value The value to check.
 * @returns {boolean} `true` if the value is a valid Statement object, otherwise `false`.
 */
export function isStatement(value: unknown): value is Statement {
  if (isNullOrUndefined(value) || typeof value !== 'object' || Object.keys(value).length !== 1) {
    return false;
  }
  return isRegisteredStatementName(firstKeyOf(value));
}

/**
 * A generic type guard that checks if a statement is of a specific type.
 *
 * This function provides type-safe way to narrow down the `Statement`
 * union type to a specific statement interface (e.g., `LogStatement`, `IfStatement`).
 *
 * @template T - The specific statement name (type) to check against.
 * @param {Statement} statement - The statement object to check.
 * @param {T} type - The statement name to match (e.g., 'log', 'if', 'set').
 * @returns {boolean} `true` if the statement's key matches the specified type,
 *
 * @example
 * if (isStatement(myStatement, 'log')) {
 *   // Inside this block, TypeScript knows `myStatement` is a `LogStatement`.
 *   console.log(myStatement.log);
 * }
 */
export function isStatementOfKind<T extends StatementName>(statement: Statement, type: T)
  : statement is RegisteredStatements[T]
{
  return type in statement;
}
