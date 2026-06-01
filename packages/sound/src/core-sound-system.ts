import {Registry, TimeContext} from '@axi-engine/utils';
import {SoundChannelConfig} from './sound-channel-config';
import {CoreSoundChannel} from './core-sound-channel';
import {sound} from '@pixi/sound';
import {SoundSystem} from './sound-system';
import {SoundChannel} from './sound-channel';
import {SoundSequenceItems} from './types';
import {SoundSequenceOptions} from './sound-sequence-options';
import {channel} from 'node:diagnostics_channel';

export class CoreSoundSystem implements SoundSystem {
  _channels = new Registry<string, SoundChannel>();

  get channels() {
    return this._channels;
  }

  /** from 0 to 1 */
  set volume(val: number) {
    sound.volumeAll = val;
  }

  get volume(): number {
    return sound.volumeAll;
  }

  constructor() {
  }

  register(channelOrChannels: SoundChannelConfig | SoundChannelConfig[]) {
    (!Array.isArray(channelOrChannels) ? [channelOrChannels] : channelOrChannels)
      .forEach(channel => this._channels.register(channel.name, new CoreSoundChannel(channel)));
  }

  channel(name: string): SoundChannel {
    return this._channels.getOrThrow(name);
  }

  /**
   *
   */
  // play sound named in channel
  play(channelName: string, sounds: SoundSequenceItems, options?: SoundSequenceOptions) {
    this.channel(channelName).play(sounds, options);
  }

  pause(names: string | string[]) {
    this.iterateChannelNames(names, c => c.pause());
  }

  resume(names: string | string[]) {
    this.iterateChannelNames(names, c => c.resume());
  }

  /**
   * stop named channel
   */
  stop(names: string | string[]) {
    this.iterateChannelNames(names, c => c.stop());
  }

  pauseAll() {
    this._channels.forEach(c => c.pause());
  }

  resumeAll() {
    this._channels.forEach(c => c.resume());
  }

  stopAll() {
    this._channels.forEach(c => c.stop());
  }

  update(time: TimeContext) {
    this.channels.forEach(c => c.update(time));
  }

  /**
   * add track to named channel to play after previous track finished
   */
  queue(channelName: string, tracks: string | string[]) {
  }

  private iterateChannelNames(names: string | string[], callback: (channel: SoundChannel) => void) {
    if (!Array.isArray(names)) {
      callback(this.channel(names));
    } else {
      names.forEach(name => callback(this.channel(name)));
    }
  }
}
