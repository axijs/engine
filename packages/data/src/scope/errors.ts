export class ScopeError extends Error {
  /**
   * @param message Description of the error.
   * @param options Standard error options (e.g., for chaining causes).
   */
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'ScopeError';
  }
}
