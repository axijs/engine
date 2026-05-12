import {EasingName} from '@axi-engine/utils';

export interface SoundSequenceOptions {
  // from 0 to 1, default 1
  volume?: number;

  // loop sequence, default false
  loop?: boolean;

  easing?: {
    // on sequence start
    enter?:EasingName;
    // on sequence end
    leave?:EasingName;

    // on each track start
    trackEnter?: EasingName;

    // on each track end
    trackLeave?: EasingName;
  };
}
