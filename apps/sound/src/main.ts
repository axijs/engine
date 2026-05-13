import {sound} from '@pixi/sound';
import {CoreSoundSequence} from '@axi-engine/sound';

sound.add('crop', 'sound/metronome_crop.ogg');
sound.add('full', 'sound/metronome_full.ogg');

(function main() {
  console.log('main');

  const sq = new CoreSoundSequence('crop');

  const actions: Record<string, () => void> = {
    'play': () => { sq.play(); },
    'stop': () => console.log('stop'),
    'play-easing': () => console.log('play easing'),
    'stop-easing': () => console.log('stop easing'),
    'play-loop': () => console.log('play loop'),
    'stop-loop': () => console.log('stop loop'),
  };

  document.querySelectorAll<HTMLButtonElement>('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if (action && actions[action]) actions[action]();
    });
  });
})();
