import {Statement} from './statements';

export class StatementError extends Error {
  public readonly instruction: Statement;

  constructor(message: string, instruction: Statement, options?: ErrorOptions) {
    super(message, options);
    this.name = 'StatementError';
    this.instruction = instruction;
  }
}
