export interface SoundConfig {
  /** in ms, default 500 */
  easingDuration: number;
}

const defaultConfig: SoundConfig = {
  easingDuration: 500
};

export const soundSettings: SoundConfig = { ...defaultConfig };

/**
 * set up global configuration for sound module.
 * @param newConfig - configuration object
 */
export function configureSound(newConfig: Partial<SoundConfig>): void {
  Object.assign(soundSettings, newConfig);
}
