/**
 * Context for time-dependent animations and transformations.
 * Used across engine modules, at least in sound and scenes.
 */
export interface TimeContext {
  /** Time elapsed since last frame (ms) */
  deltaMs: number;

  /** Scalar time value from last frame to this frame. Used for frame-based animations and updates. */
  deltaTime: number;

  /** Total time since game start (ms) */
  totalTime: number;

  /** Frame scale (1.0 = normal speed, 0.5 = slow motion) */
  timeScale: number;
}
