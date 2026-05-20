import {TrackConfig} from './track-config';
import {EasingName} from '@axi-engine/utils';

export type SoundSequenceItem = string | TrackConfig;

export type SoundSequenceItems = SoundSequenceItem | SoundSequenceItem[];


export type EasingConfig = { easing: EasingName, duration: number };

/**
 * if true - use default settings
 * if number - will use default easing function and number time in ms
 * if EasingName - will use easing function with this name and default time
 * if object - will use selected function and selected time
 */
export type EasingParam = true | number | EasingName | EasingConfig

/**
 * ready - only when a sequence created and not played / stopped yet
 */
export const enum SoundSequenceState {
  ready = 'ready',
  playing = 'playing',
  paused = 'paused',
  stopped = 'stopped'
}
