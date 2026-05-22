import {sound} from '@pixi/sound';
import {CoreSoundSequence, createSoundSystem} from '@axi-engine/sound';
import {throwIf, throwIfEmpty} from '@axijs/ensure';
import {Ticker} from './ticker.ts';
import type {TimeContext} from '@axi-engine/utils';

sound.add('crop', 'sound/metronome_crop.ogg');
sound.add('full', 'sound/metronome_full.ogg');
sound.add('bip', 'sound/bip.ogg');
sound.add('drop', 'sound/water_drop.ogg');

function getBtn(id: string): HTMLButtonElement {
  const ctl = document.getElementById(id);

  throwIfEmpty(ctl, `Can't find HTMLButtonElement with id: ${id}`);
  throwIf(!(ctl instanceof HTMLButtonElement), `Wrong instance type of element with id: ${id}, should be HTMLButtonElement`);
  return ctl as HTMLButtonElement;
}

function getButtons(...names: string[]) {
  return names.map(name => getBtn(name));
}

function bindSequenceEvents(
  seq: CoreSoundSequence,
  playId: string,
  stopId: string,
  isPlayInteractive = true,
  isStopInteractive = true
) {
  const [play, stop] = getButtons(playId, stopId);

  seq.onPlay.subscribe(() => {
    if (isPlayInteractive) { play.disabled = true; }
    if (isStopInteractive) { stop.disabled = false; }
  });

  seq.onFinish.subscribe(() => {
      if (isPlayInteractive) { play.disabled = false; }
      if (isStopInteractive) { stop.disabled = true; }
  });

  play.addEventListener('click', () => seq.play());
  stop.addEventListener('click', () => seq.stop());
}

const soundSystem = createSoundSystem();
soundSystem.register({name: 'core'});

const simple: CoreSoundSequence = new CoreSoundSequence('crop');
const simpleLoop: CoreSoundSequence = new CoreSoundSequence('crop', {loop: true});

const queue: CoreSoundSequence = new CoreSoundSequence(['bip', 'bip', 'crop', 'drop', 'drop', 'drop']);
const queueLoop: CoreSoundSequence = new CoreSoundSequence(['bip', 'bip', 'drop', 'drop'], {loop: true});

const restart: CoreSoundSequence = new CoreSoundSequence(['bip', 'drop', 'bip', 'drop']);
let easing: CoreSoundSequence | undefined;

function initPlay() {
  bindSequenceEvents(simple, 'play', 'stop');
}

function initPlayLoop() {
  bindSequenceEvents(simpleLoop, 'play-loop', 'stop-loop');
}

function initPlayQueue() {
  bindSequenceEvents(queue, 'play-queue', 'stop-queue');
}

function initPlayQueueLoop() {
  bindSequenceEvents(queueLoop, 'play-queue-loop', 'stop-queue-loop');
}

function initPlayWithRestart() {
  bindSequenceEvents(restart, 'play-restart', 'stop-restart', false);
}

/**
 *
 *
 */
function initPlayEasing() {
  // const [play, pause, resume, stop] = getButtons('play-easing', 'pause-easing', 'resume-easing', 'stop-easing');
  //
  // play.addEventListener('click', () => {
  //   switchButtons(play, stop, false);
  //   pause.disabled = false;
  //
  //   easing?.stop();
  //   easing = new CoreSoundSequence('crop', {loop: true});
  //   easing.onFinish.once(() => {
  //     easing = undefined;
  //     switchButtons(play, stop, true);
  //     pause.disabled = true;
  //     resume.disabled = true;
  //   });
  //   easing.play({
  //     easing: 'easeInSine',
  //     duration: 1000
  //   });
  // });
  //
  // pause.addEventListener('click', () => {
  //   easing?.pause(500);
  //   pause.disabled = true;
  //   resume.disabled = false;
  // });
  //
  // resume.addEventListener('click', () => {
  //   easing?.resume(500);
  //   pause.disabled = false;
  //   resume.disabled = true;
  // });
  //
  // stop.addEventListener('click', () => {
  //   easing?.stop(1000);
  //   stop.disabled = true;
  //   pause.disabled = true;
  //   resume.disabled = true;
  // });
}

(function main() {
  initPlay();
  initPlayLoop();
  initPlayQueue();
  initPlayQueueLoop();
  initPlayWithRestart();
  initPlayEasing();

  const ticker = new Ticker((context: TimeContext) => {
    easing?.update(context);
  });
  ticker.start();
})();
