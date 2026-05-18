import {TrackConfig} from './track-config';
import {EasingName} from '@axi-engine/utils';

export type SoundSequenceItem = string | TrackConfig;

export type SoundSequenceItems = SoundSequenceItem | SoundSequenceItem[];

/**
 * if number - will use default easing function and number time in ms
 * if EasingName - will use easing function with this name and default time
 * if object - will use selected function and selected time
 */
export type EasingParam = number | EasingName | { easing: EasingName, duration: number }
