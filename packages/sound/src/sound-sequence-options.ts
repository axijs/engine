export interface SoundSequenceOptions {
  // from 0 to 1, default 1
  volume?: number;

  // volume from external systems (the sound channel) from 0 to 1, default 1
  volumeFactor?: number

  // loop sequence, default false
  loop?: boolean;
}
