import {CoreSoundSystem} from './core-sound-system';
import {configureSound, SoundConfig} from './config';
import {isNullOrUndefined} from '@axijs/ensure';
import {SoundChannelConfig} from './sound-channel-config';


export interface CreateSoundSystemConfig {
  soundConfig?: SoundConfig,
  channels?: SoundChannelConfig[]
}

export function createSoundSystem(config?: CreateSoundSystemConfig) {
  if (!isNullOrUndefined(config?.soundConfig)) {
    configureSound(config.soundConfig);
  }
  const system = new CoreSoundSystem();
  if (!isNullOrUndefined(config?.channels)) {
    system.register(config?.channels);
  }
  return system;
}
