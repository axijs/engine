import {CoreSoundSystem} from './core-sound-system';
import {configureSound, SoundConfig} from './config';
import {isNullOrUndefined} from '@axijs/ensure';


export function createSoundSystem(soundConfig?: SoundConfig) {
  if (!isNullOrUndefined(soundConfig)) {
    configureSound(soundConfig);
  }
  return new CoreSoundSystem();
}
