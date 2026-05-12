import {SoundChannelConfig} from './sound-channel-config';
import {SoundChannel} from './sound-channel';
import {Registry} from '@axi-engine/utils';

export interface SoundSystem {
  volume: number;

  readonly _channels: Registry<string, SoundChannel>;

  register(channelConfig: SoundChannelConfig): void;

  /**
   * get previously registered sound channel by name
   */
  channel(name: string): SoundChannel;

  pause(names: string | string[]): void;

  resume(names: string | string[]): void;

  /**
   * if name not provided -stop all sound instances in all channels otherwise stop in named channel
   * */
  stop(names: string | string[]): void;

  pauseAll(): void;

  resumeAll(): void;

  stopAll(): void;
}
