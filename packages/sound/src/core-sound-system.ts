import {PathType, Registry, TimeContext} from '@axi-engine/utils';
import {SoundChannelConfig} from './sound-channel-config';
import {isNullOrUndefined, throwIfEmpty} from '@axijs/ensure';
import {CoreSoundChannel} from './core-sound-channel';
import {sound} from '@pixi/sound';
import {SoundSystem} from './sound-system';
import {SoundChannel} from './sound-channel';

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

  register(channel: SoundChannelConfig) {
    this._channels.register(channel.name, new CoreSoundChannel(channel));
  }

  channel(name: string): SoundChannel {
    return this._channels.getOrThrow(name);
  }


  /**
   *
   */
  // play sound named in channel
  play(
    channelName: string,
    soundPath: PathType,
    options?: {
      volume?: number,
      loop?: boolean,
      singleInstance?: boolean
    }
  ) {
    this.channel(channelName).play(soundPath, options);
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
    // this.channels.forEach(c => c.update(time));
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
