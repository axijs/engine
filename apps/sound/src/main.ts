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


function switchButtons(play: HTMLButtonElement, stop: HTMLButtonElement, isPlayEbabled: boolean) {
  play.disabled = !isPlayEbabled;
  stop.disabled = isPlayEbabled;
}

const soundSystem = createSoundSystem();
soundSystem.register({name: 'core'});

let simple: CoreSoundSequence | undefined;
let simpleLoop: CoreSoundSequence | undefined;
let queue: CoreSoundSequence | undefined;
let queueLoop: CoreSoundSequence | undefined;
let easing: CoreSoundSequence | undefined;


/**
 *
 *
 */
function initPlay() {
  const [play, stop] = getButtons('play', 'stop');

  play.addEventListener('click', () => {
    switchButtons(play, stop, false);

    simple?.stop();
    simple = new CoreSoundSequence('crop');
    simple.onFinish.once(() => {
      simple = undefined;
      switchButtons(play, stop, true);
    });
    simple.play();
  });

  stop.addEventListener('click', () => {
    simple?.stop();
    switchButtons(play, stop, true);
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

    simpleLoop?.stop();
    simpleLoop = new CoreSoundSequence('crop', {loop: true});
    simpleLoop.onFinish.once(() => {
      simpleLoop = undefined;
      switchButtons(play, stop, true);
    });
    simpleLoop.play();
  });

  stop.addEventListener('click', () => {
    simpleLoop?.stop();
    switchButtons(play, stop, true);
  });
}

/**
 *
 *
 *
 */
function initPlayQueue() {
  const [play, stop] = getButtons('play-queue', 'stop-queue');

  play.addEventListener('click', () => {
    switchButtons(play, stop, false);

    queue?.stop();
    queue = new CoreSoundSequence(['bip', 'bip', 'crop', 'drop', 'drop', 'drop']);
    queue.onFinish.once(() => {
      queue = undefined;
      switchButtons(play, stop, true);
    });
    queue.play();
  });

  stop.addEventListener('click', () => {
    queue?.stop();
    switchButtons(play, stop, true);
  });
}

/**
 *
 *
 */
function initPlayQueueLoop() {
  const [play, stop] = getButtons('play-queue-loop', 'stop-queue-loop');

  play.addEventListener('click', () => {
    switchButtons(play, stop, false);

    queueLoop?.stop();
    queueLoop = new CoreSoundSequence(['bip', 'bip', 'drop', 'drop'], {loop: true});
    queueLoop.onFinish.once(() => {
      queueLoop = undefined;
      switchButtons(play, stop, true);
    });
    queueLoop.play();
  });

  stop.addEventListener('click', () => {
    queueLoop?.stop();
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

    easing?.stop();
    easing = new CoreSoundSequence('crop', {loop: true});
    easing.onFinish.once(() => {
      easing = undefined;
      switchButtons(play, stop, true);
      pause.disabled = true;
      resume.disabled = true;
    });
    easing.play({
      easing: 'easeInSine',
      duration: 1000
    });
  });

  pause.addEventListener('click', () => {
    easing?.pause(500);
    pause.disabled = true;
    resume.disabled = false;
  });

  resume.addEventListener('click', () => {
    easing?.resume(500);
    pause.disabled = false;
    resume.disabled = true;
  });

  stop.addEventListener('click', () => {
    easing?.stop(1000);
    stop.disabled = true;
    pause.disabled = true;
    resume.disabled = true;
  });
}



(function main() {
  initPlay();
  initPlayLoop();
  initPlayQueue();
  initPlayQueueLoop();
  initPlayEasing();

  const ticker = new Ticker((context: TimeContext) => {
    easing?.update(context);
  });
  ticker.start();
})();
