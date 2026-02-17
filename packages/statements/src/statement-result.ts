export interface MathStatementResult {
  math: number
}

export interface RegisteredStatementResults {
  math: MathStatementResult
}

export type StatementResult = RegisteredStatementResults[keyof RegisteredStatementResults];

export type StatementResultName = keyof RegisteredStatementResults;
