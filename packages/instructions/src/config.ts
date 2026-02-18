import {InstructionName} from './instructions';

const VALID_INSTRUCTION_NAMES = new Set<string>();

/**
 * Registers a new instruction name, making it recognizable by the `isInstruction` guard.
 * This function must be called by the core library for its own instructions,
 * and by any plugin that adds a new instruction type.
 *
 * @param name The name of the instruction to register (e.g., 'log', 'set').
 */
export function registerInstructionName(name: InstructionName): void {
  VALID_INSTRUCTION_NAMES.add(name);
}

/**
 * Unregisters a instruction name.
 * @param name The name to remove.
 * @returns {boolean} `true` if the name was present and removed.
 */
export function unregisterInstructionName(name: InstructionName): boolean {
  return VALID_INSTRUCTION_NAMES.delete(name);
}

/**
 * @internal - Used only by the isInstruction guard.
 * Checks if a given name has been registered.
 */
export function isRegisteredInstructionName(name: string): boolean {
  return VALID_INSTRUCTION_NAMES.has(name);
}
