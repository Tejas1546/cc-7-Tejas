import './style.css';
import {
  getState,
  dispatch,
  subscribe,
  type ApplicationState,
  type Beat,
} from './redux';

(() => {
  // --- LOCAL SIDE-EFFECT STATE (Timers & Math) ---
  let playbackTimeouts: number[] = [];

  // Recording Timers
  let recordingStartRealTime: number = 0;
  let pauseStartRealTime: number = 0;
  let totalPausedTime: number = 0;

  // Playback Timers
  let playbackStartRealTime: number = 0;
  let playbackElapsedTrackTime: number = 0;

  // --- DOM CACHING ---
  const fileCache = new Map<string, HTMLAudioElement>();
  const keyCache = new Map<string, HTMLDivElement>();

  const recordBtn = document.getElementById('record-btn') as HTMLDivElement;
  const playBtn = document.getElementById('play-btn') as HTMLDivElement;
  const stopBtn = document.getElementById('clear-btn') as HTMLDivElement; // Reusing clear-btn for stop

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

  // --- UI SUBSCRIPTION (Reacts to Reducer State Changes) ---
  subscribe((): void => {
    const state: ApplicationState = getState();

    // Reset all classes and text first
    recordBtn.classList.remove('recording-active', 'paused');
    playBtn.classList.remove('playback-active', 'paused');
    recordBtn.innerText = 'Record (R)';
    playBtn.innerText = 'Play (Space)';

    if (state.mode === 'recording-progress') {
      recordBtn.classList.add('recording-active');
      recordBtn.innerText = 'Pause Rec (R)';
    } else if (state.mode === 'recording-paused') {
      recordBtn.classList.add('paused');
      recordBtn.innerText = 'Continue Rec (R)';
    }

    if (state.mode === 'playback-progress') {
      playBtn.classList.add('playback-active');
      playBtn.innerText = 'Pause Play (Space)';
    } else if (state.mode === 'playback-paused') {
      playBtn.classList.add('paused');
      playBtn.innerText = 'Continue Play (Space)';
    }
  });

  // --- AUDIO ENGINE ---
  const playDrum = (code: string): void => {
    const soundclip = fileCache.get(code);
    const keyelement = keyCache.get(code);

    if (!soundclip || !keyelement) return;

    keyelement.classList.add('playing');
    soundclip.currentTime = 0;
    soundclip.play();
  };

  const schedulePlayback = (startOffset: number): void => {
    const state = getState();
    const lastIndex = state.recordings.length - 1;

    // Early return if no recordings exist
    if (lastIndex < 0) return;

    const activeRecording = state.recordings[lastIndex];

    activeRecording.beats.forEach((beat: Beat): void => {
      // Only schedule beats that happen AFTER our current paused offset
      if (beat.timestamp >= startOffset) {
        const delay = beat.timestamp - startOffset;
        const timeout = window.setTimeout((): void => {
          playDrum(beat.key);
        }, delay);
        playbackTimeouts.push(timeout);
      }
    });

    // Schedule the automatic stop at the end of the track
    const totalBeats = activeRecording.beats.length;
    if (totalBeats > 0) {
      const lastBeat = activeRecording.beats[totalBeats - 1];
      if (lastBeat.timestamp >= startOffset) {
        const finishDelay = lastBeat.timestamp - startOffset + 500;
        const stopTimeout = window.setTimeout((): void => {
          dispatch({ type: 'STOP_PLAYBACK' });
          playbackElapsedTrackTime = 0; // Reset track time
        }, finishDelay);
        playbackTimeouts.push(stopTimeout);
      }
    }
  };

  const clearPlaybackTimeouts = (): void => {
    playbackTimeouts.forEach(clearTimeout);
    playbackTimeouts = [];
  };

  // --- ACTION ROUTERS ---
  const handleRecordToggle = (): void => {
    const state = getState();

    if (state.mode === 'normal') {
      recordingStartRealTime = Date.now();
      totalPausedTime = 0;
      dispatch({ type: 'START_RECORDING', timestamp: recordingStartRealTime });
      return;
    }

    if (state.mode === 'recording-progress') {
      pauseStartRealTime = Date.now();
      dispatch({ type: 'PAUSE_RECORDING', timestamp: pauseStartRealTime });
      return;
    }

    if (state.mode === 'recording-paused') {
      const now = Date.now();
      totalPausedTime += now - pauseStartRealTime;
      dispatch({ type: 'CONTINUE_RECORDING', timestamp: now });
      return;
    }
  };

  const handlePlaybackToggle = (): void => {
    const state = getState();

    if (state.mode === 'normal') {
      if (state.recordings.length === 0) return;
      playbackStartRealTime = Date.now();
      playbackElapsedTrackTime = 0;
      dispatch({ type: 'START_PLAYBACK' });
      schedulePlayback(0);
      return;
    }

    if (state.mode === 'playback-progress') {
      const now = Date.now();
      playbackElapsedTrackTime += now - playbackStartRealTime;
      clearPlaybackTimeouts();
      dispatch({ type: 'PAUSE_PLAYBACK', timestamp: now });
      return;
    }

    if (state.mode === 'playback-paused') {
      playbackStartRealTime = Date.now();
      dispatch({ type: 'CONTINUE_PLAYBACK' });
      schedulePlayback(playbackElapsedTrackTime);
      return;
    }
  };

  const handleStop = (): void => {
    const state = getState();

    if (
      state.mode === 'recording-progress' ||
      state.mode === 'recording-paused'
    ) {
      dispatch({ type: 'STOP_RECORDING' });
      stopBtn.classList.add('playing');
      return;
    }

    if (
      state.mode === 'playback-progress' ||
      state.mode === 'playback-paused'
    ) {
      clearPlaybackTimeouts();
      playbackElapsedTrackTime = 0;
      dispatch({ type: 'STOP_PLAYBACK' });
      stopBtn.classList.add('playing');
      return;
    }
  };

  const triggerKeyAction = (code: string): void => {
    // 1. Handle Control Keys
    if (code === 'KeyR') {
      handleRecordToggle();
      return;
    }
    if (code === 'Space') {
      handlePlaybackToggle();
      return;
    }
    if (code === 'Backspace') {
      handleStop();
      return;
    }

    // 2. Handle Drum Hits
    playDrum(code);

    const state = getState();
    if (state.mode === 'recording-progress') {
      // Calculate the exact relative time inside the track, factoring out pause times
      const relativeTimestamp =
        Date.now() - recordingStartRealTime - totalPausedTime;
      dispatch({
        type: 'BEAT',
        data: { key: code, timestamp: relativeTimestamp },
      });
    }
  };

  // --- EVENT LISTENERS ---
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
      if (code) triggerKeyAction(code);
    });
  });

  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.repeat) return; // Prevent holding down a key from firing infinite events
    triggerKeyAction(e.code);
  });
})();
