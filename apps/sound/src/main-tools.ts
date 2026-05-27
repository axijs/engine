import {CoreSoundSequence} from '@axi-engine/sound';
import {throwIf, throwIfEmpty} from '@axijs/ensure';

function getSpan(id: string): HTMLSpanElement {
  const ctl = document.getElementById(id);
  throwIfEmpty(ctl, `Can't find HTMLSpanElement with id: ${id}`);
  throwIf(!(ctl instanceof HTMLSpanElement), `Wrong instance type of element with id: ${id}, should be HTMLSpanElement`);
  return ctl as HTMLSpanElement;
}

export function getSpans(...names: string[]) {
  return names.map(name => getSpan(name));
}

function getBtn(id: string): HTMLButtonElement {
  const ctl = document.getElementById(id);
  throwIfEmpty(ctl, `Can't find HTMLButtonElement with id: ${id}`);
  throwIf(!(ctl instanceof HTMLButtonElement), `Wrong instance type of element with id: ${id}, should be HTMLButtonElement`);
  return ctl as HTMLButtonElement;
}

export function getButtons(...names: string[]) {
  return names.map(name => getBtn(name));
}

export function bindSequenceEvents(
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
