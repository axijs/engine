import {sound} from '@pixi/sound';
import {createSoundSystem} from '@axi-engine/sound';
import {throwIf, throwIfEmpty} from '@axijs/ensure';

sound.add('crop', 'sound/metronome_crop.ogg');
sound.add('full', 'sound/metronome_full.ogg');

function getBtn(id: string): HTMLButtonElement {
  const ctl = document.getElementById(id);

  throwIfEmpty(ctl, `Can't find HTMLButtonElement with id: ${id}`);
  throwIf(!(ctl instanceof HTMLButtonElement), `Wrong instance type of element with id: ${id}, should be HTMLButtonElement`);
  return ctl as HTMLButtonElement;
}

// let seq: CoreSoundSequence | undefined;

(function main() {
  const playBtn = getBtn('play');
  const stopBtn =  getBtn('stop');

  playBtn.addEventListener('click', () => {
    // console.log('play')
    playBtn.disabled = true;


  });
  stopBtn.addEventListener('click', () => {
    console.log('stop');
  });


  console.log('main');

  const soundSystem = createSoundSystem();
  soundSystem.register({name: 'core'});

  // const sq = new CoreSoundSequence('crop');

  // const actions: Record<string, () => void> = {
  //   'play': () => { sq.play(); },
  //   'stop': () => console.log('stop'),
  //   'play-easing': () => console.log('play easing'),
  //   'stop-easing': () => console.log('stop easing'),
  //   'play-loop': () => console.log('play loop'),
  //   'stop-loop': () => console.log('stop loop'),
  // };
  //
  // document.querySelectorAll<HTMLButtonElement>('[data-action]').forEach(btn => {
  //   btn.addEventListener('click', () => {
  //     const action = btn.dataset.action;
  //     if (action && actions[action]) actions[action]();
  //   });
  // });
})();
