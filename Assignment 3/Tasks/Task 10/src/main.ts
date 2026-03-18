import './style.css';
type RecordedAction = {
  code: string;
  time: number;
};

(() => {
  let isRecording = false;
  let isPlaying = false;
  let startTime = 0;
  let offset = 0;
  let recordedSequence: RecordedAction[] = JSON.parse(
    localStorage.getItem('drumRecord') || '[]', //for storing the keystrokes
  );
  let playbackTimeouts: number[] = [];

  //caches the music files and the keystrokes to prevent delay
  const fileCache = new Map<string, HTMLAudioElement>();
  const keyCache = new Map<string, HTMLDivElement>();
  const recordBtn = document.getElementById('record-btn') as HTMLDivElement;
  const playBtn = document.getElementById('play-btn') as HTMLDivElement;

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

  const recording = (): void => {
    if (isPlaying) return;

    isRecording = !isRecording;

    if (isRecording) {
      startTime = Date.now() - offset;
      recordBtn.classList.add('recording-active');
    } else {
      offset = Date.now() - startTime;
      recordBtn.classList.remove('recording-active');
    }
  };

  const playback = (): void => {
    if (isRecording || recordedSequence.length === 0) return;

    isPlaying = !isPlaying;

    if (isPlaying) {
      playBtn.classList.add('playback-active');
      recordedSequence.forEach((action) => {
        const timeout = window.setTimeout(() => {
          playDrum(action.code);
        }, action.time);
        playbackTimeouts.push(timeout);
      });

      const lastNoteTime = recordedSequence[recordedSequence.length - 1].time;
      const stopTimeout = window.setTimeout(stopPlayback, lastNoteTime + 500);
      playbackTimeouts.push(stopTimeout);
    } else {
      stopPlayback();
    }
  };

  const stopPlayback = (): void => {
    isPlaying = false;
    playBtn.classList.remove('playback-active');
    playbackTimeouts.forEach(clearTimeout);
    playbackTimeouts = [];
  };

  const clearRecording = (): void => {
    recordedSequence = [];
    offset = 0;
    localStorage.removeItem('drumRecord');
    const clearBtnElement = document.getElementById(
      'clear-btn',
    ) as HTMLDivElement;
    clearBtnElement.classList.add('playing');
  };

  const triggerAction = (code: string): void => {
    if (code === 'KeyR') {
      recording();
      return;
    }
    if (code === 'Space') {
      playback();
      return;
    }
    if (code === 'Backspace') {
      clearRecording();
      return;
    }

    playDrum(code);

    if (isRecording) {
      recordedSequence.push({
        code: code,
        time: Date.now() - startTime,
      });
      localStorage.setItem('drumRecord', JSON.stringify(recordedSequence));
    }
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
    if (e.repeat) return;
    triggerAction(e.code);
  });
})();
