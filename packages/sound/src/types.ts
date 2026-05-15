import {TrackConfig} from './track-config';
import {EasingName} from '@axi-engine/utils';

export type SoundSequenceItem = string | TrackConfig;

export type SoundSequenceItems = SoundSequenceItem | SoundSequenceItem[];

export type EasingParam = EasingName | { easing: EasingName, duration: number }
