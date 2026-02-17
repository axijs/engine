import {StatementName} from './statements';

const VALID_STATEMENT_NAMES = new Set<string>();

/**
 * Registers a new statement name, making it recognizable by the `isStatement` guard.
 * This function must be called by the core library for its own statements,
 * and by any plugin that adds a new statement type.
 *
 * @param name The name of the statement to register (e.g., 'log', 'set').
 */
export function registerStatementName(name: StatementName): void {
  VALID_STATEMENT_NAMES.add(name);
}

/**
 * Unregisters a statement name.
 * @param name The name to remove.
 * @returns {boolean} `true` if the name was present and removed.
 */
export function unregisterStatementName(name: StatementName): boolean {
  return VALID_STATEMENT_NAMES.delete(name);
}

/**
 * @internal - Used only by the isStatement guard.
 * Checks if a given name has been registered.
 */
export function isRegisteredStatementName(name: string): boolean {
  return VALID_STATEMENT_NAMES.has(name);
}
