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

function getButtons(...names: string[]) {
  return names.map(name => getBtn(name));
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

/**
 *
 *
 */
function initPlay() {
  const [play, stop] = getButtons('play', 'stop');

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

/**
 *
 *
 */
function initPlayEasing() {
  const [play, pause, resume, stop] = getButtons('play-easing', 'pause-easing', 'resume-easing', 'stop-easing');

  play.addEventListener('click', () => {
    switchButtons(play, stop, false);
    pause.disabled = false;

    seqEasing?.stop();
    seqEasing = new CoreSoundSequence('crop', {loop: true});
    seqEasing.onFinish.once(() => {
      seqEasing = undefined;
      switchButtons(play, stop, true);
      pause.disabled = true;
      resume.disabled = true;
    });
    seqEasing.play({
      easing: 'easeInSine',
      duration: 1000
    });
  });

  pause.addEventListener('click', () => {
    seqEasing?.pause(500);
    pause.disabled = true;
    resume.disabled = false;
  });

  resume.addEventListener('click', () => {
    seqEasing?.resume(500);
    pause.disabled = false;
    resume.disabled = true;
  });

  stop.addEventListener('click', () => {
    seqEasing?.stop(1000);
    stop.disabled = true;
    pause.disabled = true;
    resume.disabled = true;
  });
}

/**
 *
 *
 *
 */
function initPlayLoop() {
  const [play, stop] = getButtons('play-loop', 'stop-loop');

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
