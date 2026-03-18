import './style.css';
import { DrumRecorder } from './recorder';

(() => {
  const fileCache = new Map<string, HTMLAudioElement>();
  const keyCache = new Map<string, HTMLDivElement>();

  document
    .querySelectorAll<HTMLAudioElement>('audio[data-key]')
    .forEach((audio) => {
      const code = audio.getAttribute('data-key');
      if (code) fileCache.set(code, audio);
    });

  document.querySelectorAll<HTMLDivElement>('.key[data-key]').forEach((key) => {
    const code = key.getAttribute('data-key');
    if (code) keyCache.set(code, key);
  });

  const playDrum = (code: string): void => {
    const soundclip = fileCache.get(code);
    const keyelement = keyCache.get(code);

    if (!soundclip || !keyelement) return;

    keyelement.classList.add('playing');
    soundclip.currentTime = 0;
    soundclip.play();
  };

  const recorder = new DrumRecorder(playDrum);

  const triggerAction = (code: string): void => {
    if (code === 'KeyR') return recorder.recording();
    if (code === 'Space') return recorder.playback();
    if (code === 'Backspace') return recorder.clearRecording();

    playDrum(code);
    recorder.logKeystroke(code);
  };

  const removeTransition = (e: TransitionEvent): void => {
    if (e.propertyName !== 'transform') return;
    const target = e.target as HTMLElement;
    target.classList.remove('playing');
  };

  const keys = document.querySelectorAll<HTMLElement>('.key');
  keys.forEach((key) =>
    key.addEventListener('transitionend', removeTransition),
  );

  keys.forEach((key) => {
    key.addEventListener('mousedown', function () {
      const code = this.getAttribute('data-key');
      if (code) triggerAction(code);
    });
  });

  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.code === 'Space') e.preventDefault();
    if (e.repeat) return;
    triggerAction(e.code);
  });
})();
