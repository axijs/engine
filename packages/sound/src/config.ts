import {EasingName} from '@axi-engine/utils';

export interface SoundConfig {
  /** in ms, default 250 */
  fadeDuration: number;
  fadeEasing: EasingName;
}

const defaultConfig: SoundConfig = {
  fadeDuration: 250,
  fadeEasing: 'linear',
};

export const soundSettings: SoundConfig = { ...defaultConfig };

/**
 * set up global configuration for sound module.
 * @param newConfig - configuration object
 */
export function configureSound(newConfig: Partial<SoundConfig>): void {
  Object.assign(soundSettings, newConfig);
}
