import {PathType, ScalarType} from '@axi-engine/utils';
import {ComparisonOperationType, Operand} from './types';

/**
 * Represents an expression that resolves to a hardcoded boolean value.
 * This is primarily useful for debugging, testing, or creating temporary stubs
 * in a larger expression tree.
 * @example
 * { "literal": true }
 */
export interface LiteralExpression {
  literal: boolean;
}

/**
 * Represents a comparison between two operands.
 * It evaluates the left and right operands and compares them using the specified operator.
 * @example
 * {
 *   "comparison": {
 *     "op": ">=",
 *     "left": { "path": "player.level" },
 *     "right": { "value": 10 }
 *   }
 * }
 */
export interface ComparisonExpression {
  comparison: {
    op: ComparisonOperationType,
    left: Operand,
    right: Operand
  }
}

/**
 * Represents an expression that checks for the existence of a variable at a given path.
 */
export interface ExistsExpression {
  exists: PathType
}

/**
 * Represents a logical AND operation.
 * It evaluates an array of child expressions and resolves to `true` only if
 * *all* of them resolve to `true`.
 * @example
 * {
 *   "and": [
 *     { "exists": "player.key" },
 *     { "comparison": { "op": "==", "left": { "path": "gate.locked" }, "right": { "value": true } } }
 *   ]
 * }
 */
export interface AndExpression {
  and: Expression[]
}

/**
 * Represents a logical OR operation.
 * It evaluates an array of child expressions and resolves to `true` if
 * *at least one* of them resolves to `true`.
 * @example
 * {
 *   "or": [
 *     { "exists": "player.key" },
 *     { "exists": "player.gun" }
 *   ]
 * }
 */
export interface OrExpression {
  or: Expression[]
}

/**
 * Represents a logical NOT operation.
 * It evaluates a single child expression and inverts its boolean result.
 * @example
 * {
 *   "not": { "exists": "player.effects.poison" }
 * }
 */
export interface NotExpression {
  not: Expression
}

/**
 * Represents a probabilistic expression that resolves to `true` or `false`
 * based on a given chance.
 * The operand should resolve to a number between 0 and 100. step 0.01
 * @example
 * // 15% chance to be true
 * { "chance": { "value": 15 } }
 * @example
 * // Chance is determined by the player's luck stat
 * { "chance": { "path": "player.stats.luck" } }
 */
export interface ChanceExpression {
  chance: Operand
}


/**
 * Represents an expression that checks if a value is present within an array.
 * This is useful for checking against a list of possible values, such as statuses,
 * factions, or item types.
 * @example
 * // Check if player's faction is one of the "evil" ones
 * {
 *   "in": {
 *     "value": { "path": "player.faction" },
 *     "array": [ "orcs", "goblins", "undead" ]
 *   }
 * }
 * @example
 * // Check against a dynamic array from the data source
 * {
 *   "in": {
 *     "value": { "path": "player.class" },
 *     "array": { "path": "quest.valid_classes" }
 *   }
 * }
 */
export interface InExpression {
  in: {
    /**
     * The operand whose resolved value will be searched for in the array.
     * should be scalar type (string, number, boolean)
     */
    value: Operand,

    /**
     * The collection to check against. This can be either:
     * - An operand that resolves to an array.
     * - A literal array defined directly in the expression.
     */
    array: Operand | (Operand | ScalarType)[]
  }
}


/**
 * A map defining all available expression types by their unique key.
 * This interface is designed to be augmented by third-party plugins
 * using TypeScript's declaration merging.
 */
export interface ExpressionDefinitions {
  literal: LiteralExpression,
  comparison: ComparisonExpression,
  exists: ExistsExpression,
  and: AndExpression,
  or: OrExpression,
  not: NotExpression,
  chance: ChanceExpression,
  in: InExpression
}

/** The union of all possible expression objects. */
export type Expression = ExpressionDefinitions[keyof ExpressionDefinitions];

/** The union of all possible expression names (keys). uses in ExpressionHandler */
export type ExpressionName = keyof ExpressionDefinitions;
