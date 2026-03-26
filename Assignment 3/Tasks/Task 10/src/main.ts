import { Player, type TrackEvent as PlayerTrackEvent } from './players';
import {
  reducer,
  type ApplicationState,
  type Action,
  initialState,
  isCurrentlyRecording,
} from './reducer';

let drumPlayer: Player | null = null;
let appState: ApplicationState = initialState;

function dispatch(action: Action) {
  appState = reducer(appState, action);
}

const recordZone = document.getElementById('record-zone')!;
const playbackZone = document.getElementById('playback-zone')!;

const recordBtn = document.getElementById('record-btn')!;
const pauseRecordBtn = document.getElementById('pause-record-btn')!;

const playBtn = document.getElementById('play-btn')!;
const progressBar = document.getElementById('progress-bar')!;

document.querySelectorAll('.key').forEach((key) => {
  key.addEventListener('transitionend', (e: Event) => {
    if ((e as TransitionEvent).propertyName !== 'transform') return;
    (e.target as HTMLElement).classList.remove('playing');
  });
});

function playSound(keyCode: string) {
  const audio = document.querySelector(
    `audio[data-key="${keyCode}"]`,
  ) as HTMLAudioElement;
  const keyDiv = document.querySelector(
    `div[data-key="${keyCode}"]`,
  ) as HTMLDivElement;

  if (!audio) return;
  audio.currentTime = 0;
  audio.play();

  if (keyDiv) {
    keyDiv.classList.add('playing');
  }
}

function toggleRecord() {
  const isRecording = isCurrentlyRecording(appState);

  if (!isRecording) {
    dispatch({ type: 'START_RECORDING', timestamp: Date.now() });

    recordBtn.classList.add('recording-active');
    pauseRecordBtn.classList.remove('recording-active');
    playbackZone.classList.add('disabled-zone');
  } else {
    dispatch({ type: 'STOP_RECORDING' });

    recordBtn.classList.remove('recording-active');
    pauseRecordBtn.classList.remove('recording-active');

    if (appState.recordings && appState.recordings.beats.length > 0) {
      const mappedEvents: PlayerTrackEvent[] = appState.recordings.beats.map(
        (b) => {
          if (b.key === 'PAUSE') {
            return { type: 'pause' as const, timestamp: b.timestamp };
          }
          return {
            type: 'beat' as const,
            timestamp: b.timestamp,
            key: b.key,
          };
        },
      );

      drumPlayer = new Player({ events: mappedEvents }, (beat) =>
        playSound(beat.key),
      );
      playbackZone.classList.remove('disabled-zone');

      drumPlayer.subscribe((index, total) => {
        const percent = total === 0 ? 0 : (index / total) * 100;
        progressBar.style.width = `${percent}%`;

        if (index >= total && total > 0) {
          playBtn.classList.remove('playback-active');
          recordZone.classList.remove('disabled-zone');
          setTimeout(() => {
            drumPlayer?.stop();
          }, 300); //resets the index to 0
        }
      });
    } else {
      recordZone.classList.remove('disabled-zone');
      playbackZone.classList.add('disabled-zone');
    }
  }
}

function togglePauseRecord() {
  if (appState.mode === 'recording-progress') {
    dispatch({
      type: 'BEAT',
      data: {
        timestamp: Date.now(),
        key: 'PAUSE',
      },
    });

    const currentOffset = Date.now() - appState.recordingStartTime;
    dispatch({ type: 'PAUSE_RECORDING', currentOffset });

    recordBtn.classList.remove('recording-active');
    pauseRecordBtn.classList.add('recording-active');
  } else if (appState.mode === 'recording-paused') {
    dispatch({ type: 'CONTINUE_RECORDING', newStartTime: Date.now() });

    pauseRecordBtn.classList.remove('recording-active');
    recordBtn.classList.add('recording-active');
  }
}

function playPauseTape() {
  if (!drumPlayer || drumPlayer.totalBeats === 0) return;

  const isPlaying = playBtn.classList.contains('playback-active');

  if (isPlaying) {
    drumPlayer.pause();
    playBtn.classList.remove('playback-active');
    recordZone.classList.remove('disabled-zone');
  } else {
    drumPlayer.play();
    playBtn.classList.add('playback-active');
    recordZone.classList.add('disabled-zone');
  }
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyR' && !recordZone.classList.contains('disabled-zone'))
    return toggleRecord();
  if (e.code === 'KeyE' && !recordZone.classList.contains('disabled-zone'))
    return togglePauseRecord();

  if (e.code === 'Space' && !playbackZone.classList.contains('disabled-zone'))
    return playPauseTape();

  const validDrumKeys = [
    'KeyA',
    'KeyS',
    'KeyD',
    'KeyF',
    'KeyG',
    'KeyH',
    'KeyJ',
    'KeyK',
    'KeyL',
  ];

  if (validDrumKeys.includes(e.code)) {
    playSound(e.code);

    if (appState.mode === 'recording-progress') {
      dispatch({
        type: 'BEAT',
        data: {
          timestamp: Date.now(),
          key: e.code,
        },
      });
    }
  }
});

recordBtn.addEventListener('click', toggleRecord);
pauseRecordBtn.addEventListener('click', togglePauseRecord);
playBtn.addEventListener('click', playPauseTape);
