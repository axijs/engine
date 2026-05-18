import {EasingName} from '@axi-engine/utils';

export interface SoundConfig {
  /** in ms, default 250 */
  fadeInDuration: number;
  fadeOutDuration: number;

  fadeInEasing: EasingName;
  fadeOutEasing: EasingName;
}

const defaultConfig: SoundConfig = {
  fadeInDuration: 250,
  fadeOutDuration: 250,

  fadeInEasing: 'linear',
  fadeOutEasing: 'linear'
};

export const soundSettings: SoundConfig = { ...defaultConfig };

/**
 * set up global configuration for sound module.
 * @param newConfig - configuration object
 */
export function configureSound(newConfig: Partial<SoundConfig>): void {
  Object.assign(soundSettings, newConfig);
}
