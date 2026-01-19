import {PathType, ScalarType} from '@axi-engine/utils';


/**
 * Represents an operand that is a direct, static value.
 */
export type ValueOperand = {
  value: ScalarType;
}

/**
 * Represents an operand that is a reference to a value,
 * which will be resolved from the context (scope) using a path.
 */
export type ReferenceOperand = {
  path: PathType;
}

/**
 * Represents an operand that is a mathematical calculation.
 * The result of this calculation is used as the operand's value.
 *
 * @example
 * // Represents the expression: player.hp + 10
 * {
 *   "arithmetic": {
 *     "op": "+",
 *     "left": { "path": "player.hp" },
 *     "right": { "value": 10 }
 *   }
 * }
 */
export type ArithmeticOperand = {
  arithmetic: {
    op: MathOperationType,
    left: Operand,
    right: Operand
  }
}

/**
 * Represents an operand within a logical expression.
 * It can be either a direct value (ValueOperand) or a reference to one (ReferenceOperand).
 */
export type Operand = ValueOperand | ReferenceOperand | ArithmeticOperand;

/**
 * Defines the set of allowed operators for a `ComparisonExpression`.
 */
export type ComparisonOperationType = '<' | '>' | '<=' | '>=' | '==' | '!=';

/**
 * Defines the set of allowed operators for an `ArithmeticOperand`.
 */
export type MathOperationType = '+' | '-' | '*' | '/';
