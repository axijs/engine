

export interface SoundChannelConfig {
  // unique name of the channel
  name: string;

  // default channel volume, from 0 to 1, if undefined - uses global setting
  volume?: number;

  // is need to loop play sound // default false
  loop?: boolean;

  //
  maxInstances?: number;
}
