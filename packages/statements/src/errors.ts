import {Statement} from './statements';

/**
 * Custom error thrown when a statement fails to execute or validate.
 * Holds a reference to the specific statement object that caused the error.
 */
export class StatementError extends Error {
  /** The statement object that caused the error. */
  public readonly statement: Statement;

  /**
   * @param message Description of the error.
   * @param statement The statement object associated with the failure.
   * @param options Standard error options (e.g., for chaining causes).
   */
  constructor(message: string, statement: Statement, options?: ErrorOptions) {
    super(message, options);
    this.name = 'StatementError';
    this.statement = statement;
  }
}
