import {sound} from '@pixi/sound';
import {CoreSoundSequence, createSoundSystem} from '@axi-engine/sound';
import {throwIf, throwIfEmpty} from '@axijs/ensure';
import {Ticker} from './ticker.ts';
import type {TimeContext} from '@axi-engine/utils';

sound.add('crop', 'sound/metronome_crop.ogg');
sound.add('full', 'sound/metronome_full.ogg');

function getBtn(id: string): HTMLButtonElement {
  const ctl = document.getElementById(id);

  throwIfEmpty(ctl, `Can't find HTMLButtonElement with id: ${id}`);
  throwIf(!(ctl instanceof HTMLButtonElement), `Wrong instance type of element with id: ${id}, should be HTMLButtonElement`);
  return ctl as HTMLButtonElement;
}

function getBtns(playName: string, stopName: string) {
  return {
    play: getBtn(playName),
    stop: getBtn(stopName)
  }
}


function switchButtons(play: HTMLButtonElement, stop: HTMLButtonElement, isPlayEbabled: boolean) {
  play.disabled = !isPlayEbabled;
  stop.disabled = isPlayEbabled;
}

const soundSystem = createSoundSystem();
soundSystem.register({name: 'core'});

let seq: CoreSoundSequence | undefined;
let seqEasing: CoreSoundSequence | undefined;
let seqLoop: CoreSoundSequence | undefined;


function initPlay() {
  const {play, stop} = getBtns('play', 'stop');

  play.addEventListener('click', () => {
    switchButtons(play, stop, false);

    seq?.stop();
    seq = new CoreSoundSequence('crop');
    seq.onFinish.once(() => {
      seq = undefined;
      switchButtons(play, stop, true);
    });
    seq.play();
  });

  stop.addEventListener('click', () => {
    seq?.stop();
    switchButtons(play, stop, true);
  });
}

function initPlayEasing() {
  const {play, stop} = getBtns('play-easing', 'stop-easing');
  play.addEventListener('click', () => {
    switchButtons(play, stop, false);
    // seqEasing?.stop('easeOutSine');
    // seqEasing = new CoreSoundSequence('crop');
    // seqEasing.onFinish.once(() => {
    //   seqEasing = undefined;
    //   switchButtons(play, stop, true);
    // });
    // seqEasing.play('easeInSine');
  });

  stop.addEventListener('click', () => {
    // seqEasing?.stop();
    switchButtons(play, stop, true);
  });
}

function initPlayLoop() {
  const {play, stop} = getBtns('play-loop', 'stop-loop');

  play.addEventListener('click', () => {
    switchButtons(play, stop, false);

    seqLoop?.stop();
    seqLoop = new CoreSoundSequence('crop', {loop: true});
    seqLoop.onFinish.once(() => {
      seqLoop = undefined;
      switchButtons(play, stop, true);
    });
    seqLoop.play();
  });

  stop.addEventListener('click', () => {
    seqLoop?.stop();
    switchButtons(play, stop, true);
  });
}

(function main() {
  initPlay();
  initPlayEasing();
  initPlayLoop();

  const ticker = new Ticker((context: TimeContext) => {
    seqEasing?.update(context);
  });
  ticker.start();
})();
