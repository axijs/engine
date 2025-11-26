import {PathType} from "./types";
import {axiSettings} from './config';

/**
 * Ensures that the given path is returned as an array of segments.
 */
export function ensurePathArray(path: PathType, separator = axiSettings.pathSeparator): string[] {
  return Array.isArray(path) ? [...path] : path.split(separator);
}

/**
 * Ensures that the given path is returned as a single string.
 */
export function ensurePathString(path: PathType, separator = axiSettings.pathSeparator): string {
  return !Array.isArray(path) ? path : path.join(separator);
}
