import {isNullOrUndefined} from '@axijs/ensure';
import {configureSound, SoundConfig} from './config';
import {CoreSoundSystem} from './core-sound-system';
import {SoundChannelConfig} from './sound-channel-config';


export interface CreateSoundSystemConfig {
  soundConfig?: SoundConfig,
  channels?: SoundChannelConfig[]
}

export const DefaultSoundSystemConfig: CreateSoundSystemConfig =  {
  channels: [
    {name: 'music', volume: 1, maxInstances: 1, loop: true},
    {name: 'sfx', volume: 1, maxInstances: 10},
    {name: 'ui', volume: 1, maxInstances: 5}
  ]
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
