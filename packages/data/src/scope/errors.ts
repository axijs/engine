// import {PathType} from '@axi-engine/utils';

export class ScopeError extends Error {
  // path: PathType;

  /**
   * @param message Description of the error.
   * @param options Standard error options (e.g., for chaining causes).
   */
  constructor(message: string /*, path: PathType*/, options?: ErrorOptions) {
    super(message, options);
    this.name = 'ScopeError';
    // this.path = path;
  }
}
