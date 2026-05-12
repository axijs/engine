(function main() {
  console.log('main');

  const actions: Record<string, () => void> = {
    'play-default': () => console.log('play'),
    'stop-default': () => console.log('stop'),
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
