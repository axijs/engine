import {sound} from '@pixi/sound';
import {
  CoreSoundChannel,
  CoreSoundSequence,
  createSoundSystem, SoundSequenceHydrator,
  type SoundSequenceSnapshot,
  SoundSequenceSnapshotter
} from '@axi-engine/sound';
import {Ticker} from './ticker.ts';
import type {TimeContext} from '@axi-engine/utils';
import {bindSequenceEvents, getButtons, getSpans} from './main-tools.ts';


sound.add('crop', 'sound/metronome_crop.ogg');
sound.add('full', 'sound/metronome_full.ogg');
sound.add('bip', 'sound/bip.ogg');
sound.add('drop', 'sound/water_drop.ogg');

const soundSystem = createSoundSystem();
soundSystem.register({name: 'core'});

const simple: CoreSoundSequence = new CoreSoundSequence('crop');
const simpleLoop: CoreSoundSequence = new CoreSoundSequence('crop', {loop: true});

const queue: CoreSoundSequence = new CoreSoundSequence(['bip', 'bip', 'crop', 'drop', 'drop', 'drop']);
const queueLoop: CoreSoundSequence = new CoreSoundSequence(['bip', 'bip', 'drop', 'drop'], {loop: true});

const restart: CoreSoundSequence = new CoreSoundSequence(['bip', 'drop', 'bip', 'drop']);
const easing: CoreSoundSequence = new CoreSoundSequence('crop', {loop: true});

const soundChannel = new CoreSoundChannel({name: 'test', maxInstances: 5});

let saveAndRestore: CoreSoundSequence = new CoreSoundSequence('full');
let saveAndRestoreSnapshot: SoundSequenceSnapshot | undefined;

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
  const [play, pause, resume, stop] = getButtons('play-easing', 'pause-easing', 'resume-easing', 'stop-easing');

  easing.onFinish.subscribe(() => {
    play.disabled = false;
    stop.disabled = true;
    pause.disabled = true;
    resume.disabled = true;
  });

  play.addEventListener('click', () => {
    play.disabled = true;
    stop.disabled = false;
    pause.disabled = false;

    easing.play({
      easing: 'easeInSine',
      duration: 1000
    });
  });

  pause.addEventListener('click', () => {
    easing.pause(500);
    pause.disabled = true;
    resume.disabled = false;
  });

  resume.addEventListener('click', () => {
    easing.resume(500);
    pause.disabled = false;
    resume.disabled = true;
  });

  stop.addEventListener('click', () => {
    easing.stop({
      easing: 'easeOutSine',
      duration: 1000
    });

    stop.disabled = true;
    pause.disabled = true;
    resume.disabled = true;
  });
}

/**
 *
 */
function initPlayChannel() {
  const [queueLabel, volumeLabel] = getSpans('cnl-queue', 'cnl-volume');

  const [play, playLong, pause, resume, stop, volume05, volume1] = getButtons(
    'cnl-play', 'cnl-play-long', 'cnl-pause', 'cnl-resume', 'cnl-stop', 'cnl-volume-05', 'cnl-volume-1'
  );

  soundChannel.onSizeChanged.subscribe(num => queueLabel.textContent = num.toString());
  soundChannel.onVolumeChanged.subscribe(volume => volumeLabel.textContent = volume.toString());

  play.addEventListener('click', () => soundChannel.play('drop'));
  playLong.addEventListener('click', () => soundChannel.play('crop'));
  pause.addEventListener('click', () => soundChannel.pause());
  resume.addEventListener('click', () => soundChannel.resume());
  stop.addEventListener('click', () => soundChannel.stop());

  volume05.addEventListener('click', () => soundChannel.volume = 0.5);
  volume1.addEventListener('click', () => soundChannel.volume = 1.0);
}

function initSaveAndRestore() {
  const [play, save, restore] = getButtons('save-test-play', 'save', 'restore');

  play.addEventListener('click', () => {
    saveAndRestore.play();
    save.disabled = false;
  });

  save.addEventListener('click', () => {
    if (saveAndRestore) {
      saveAndRestoreSnapshot = (new SoundSequenceSnapshotter()).snapshot(saveAndRestore);
      console.log('Snapshot: -->', saveAndRestoreSnapshot);
    }
    restore.disabled = false;
  });

  restore.addEventListener('click', () => {
    if (saveAndRestoreSnapshot) {
      saveAndRestore?.stop();
      saveAndRestore = (new SoundSequenceHydrator()).hydrate(saveAndRestoreSnapshot);
    }
  });
}

(async function main() {
  initPlay();
  initPlayLoop();
  initPlayQueue();
  initPlayQueueLoop();
  initPlayWithRestart();
  initPlayEasing();
  initPlayChannel();
  initSaveAndRestore();

  const ticker = new Ticker((context: TimeContext) => {
    easing?.update(context);
    soundChannel?.update(context);

  });
  ticker.start();
})();
