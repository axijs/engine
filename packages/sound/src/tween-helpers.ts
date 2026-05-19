import {EasingConfig, EasingParam} from './types';
import {soundSettings} from './config';
import {isNumber, isString} from '@axijs/ensure';

export function parseEasing(param: EasingParam): EasingConfig {
  if (param === true) {
    return {
      easing: soundSettings.fadeEasing,
      duration: soundSettings.fadeDuration
    }
  } else if (isNumber(param)) {
    return {
      easing: soundSettings.fadeEasing,
      duration: param
    }
  } else if (isString(param)) {
    return {
      easing: param,
      duration: soundSettings.fadeDuration
    }
  }
  return param;
}
