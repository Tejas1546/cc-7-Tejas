import { describe, it, expect } from 'vitest';
import {
  reducer,
  initialState,
  type ApplicationState,
  type Action,
} from './reducer';

<<<<<<< HEAD
<<<<<<< HEAD
describe('Mode: normal', () => {
  it('Start recording', () => {
    const action: Action = { type: 'START_RECORDING', timestamp: 1000 };
    const nextState = reducer(initialState, action);

    expect(nextState.mode).toBe('recording-progress');
    expect(nextState.recordings?.beats).toEqual([]);
    expect(nextState.recordingStartTime).toBe(1000);
    expect(nextState.recordingOffset).toBe(0);
    expect(nextState.playbackOffset).toBe(0);
  });

  it('Start playback', () => {
    const stateWithEmptyRecording: ApplicationState = {
      ...initialState,
=======
describe('Drumkit reducer module test', () => {
  it('Start recording and reset the old recording track', () => {
=======
describe('Mode: normal', () => {
  it('Start recording', () => {
>>>>>>> 0a11067 (corrected reducer implimentation and implimented player logic)
    const action: Action = { type: 'START_RECORDING', timestamp: 1000 };
    const nextState = reducer(initialState, action);

    expect(nextState.mode).toBe('recording-progress');
    expect(nextState.recordings?.beats).toEqual([]);
    expect(nextState.recordingStartTime).toBe(1000);
    expect(nextState.recordingOffset).toBe(0);
    expect(nextState.playbackOffset).toBe(0);
  });

  it('Start playback', () => {
    const stateWithEmptyRecording: ApplicationState = {
<<<<<<< HEAD
      mode: 'normal',
>>>>>>> 781c1e5 (fixes and implimented unit testing)
=======
      ...initialState,
>>>>>>> 0a11067 (corrected reducer implimentation and implimented player logic)
      recordings: { beats: [] },
    };
    const action: Action = { type: 'START_PLAYBACK' };
    const nextState = reducer(stateWithEmptyRecording, action);
<<<<<<< HEAD
<<<<<<< HEAD

    expect(nextState.mode).toBe('normal');
  });

  it('Start playback', () => {
    const validTrackState: ApplicationState = {
      ...initialState,
      recordings: { beats: [{ key: 'KeyA', timestamp: 100 }] },
      playbackOffset: 5000,
    };
    const nextState = reducer(validTrackState, { type: 'START_PLAYBACK' });

    expect(nextState.mode).toBe('playback-progress');
    expect(nextState.playbackOffset).toBe(0);
  });

  it('Ignores invalid actions', () => {
=======
=======

>>>>>>> 0a11067 (corrected reducer implimentation and implimented player logic)
    expect(nextState.mode).toBe('normal');
  });

  it('Start playback', () => {
    const validTrackState: ApplicationState = {
      ...initialState,
      recordings: { beats: [{ key: 'KeyA', timestamp: 100 }] },
      playbackOffset: 5000,
    };
<<<<<<< HEAD
>>>>>>> 781c1e5 (fixes and implimented unit testing)
=======
    const nextState = reducer(validTrackState, { type: 'START_PLAYBACK' });

    expect(nextState.mode).toBe('playback-progress');
    expect(nextState.playbackOffset).toBe(0);
  });

  it('Ignores invalid actions', () => {
>>>>>>> 0a11067 (corrected reducer implimentation and implimented player logic)
    const action: Action = {
      type: 'BEAT',
      data: { key: 'KeyA', timestamp: 1500 },
    };
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 0a11067 (corrected reducer implimentation and implimented player logic)
    const nextState = reducer(initialState, action);
    expect(nextState).toBe(initialState);
  });
});

describe('Mode: recording-progress', () => {
  const activeState: ApplicationState = {
    ...initialState,
    mode: 'recording-progress',
    recordings: { beats: [] },
    recordingStartTime: 1000,
  };

  it('BEAT: appends beat', () => {
    const action: Action = {
      type: 'BEAT',
      data: { key: 'KeyA', timestamp: 500 },
    };
<<<<<<< HEAD
    const nextState = reducer(activeState, action);

    expect(nextState.recordings?.beats.length).toBe(1);
    expect(nextState.recordings?.beats[0]).toEqual({
      key: 'KeyA',
      timestamp: 500,
    });
    expect(nextState.recordingStartTime).toBe(1000);
  });

  it('BEAT: appends beat', () => {
    const action: Action = {
      type: 'BEAT',
      data: { key: 'KeyS', timestamp: 0 },
      newStartTime: 2000,
    };
    const nextState = reducer(activeState, action);

    expect(nextState.recordingStartTime).toBe(2000);
  });

  it('BEAT: returns state unchanged', () => {
    const nullRecordingState: ApplicationState = {
      ...activeState,
      recordings: null,
    };
    const action: Action = {
      type: 'BEAT',
      data: { key: 'KeyD', timestamp: 500 },
    };
    const nextState = reducer(nullRecordingState, action);

    expect(nextState).toBe(nullRecordingState);
  });

  it('Pause recording', () => {
    const action: Action = { type: 'PAUSE_RECORDING', currentOffset: 3000 };
    const nextState = reducer(activeState, action);

    expect(nextState.mode).toBe('recording-paused');
    expect(nextState.recordingOffset).toBe(3000);
  });

  it('Stop recording', () => {
    const nextState = reducer(activeState, { type: 'STOP_RECORDING' });
    expect(nextState.mode).toBe('normal');
  });
});

describe('Mode: recording-paused', () => {
  const pausedState: ApplicationState = {
    ...initialState,
    mode: 'recording-paused',
    recordingOffset: 3000,
  };

  it('Continue recording', () => {
    const action: Action = { type: 'CONTINUE_RECORDING', newStartTime: 8000 };
    const nextState = reducer(pausedState, action);

    expect(nextState.mode).toBe('recording-progress');
    expect(nextState.recordingStartTime).toBe(8000);
  });

  it('Stop recording', () => {
    const nextState = reducer(pausedState, { type: 'STOP_RECORDING' });
    expect(nextState.mode).toBe('normal');
  });
});

describe('Playback Flow', () => {
  const playState: ApplicationState = {
    ...initialState,
    mode: 'playback-progress',
    recordings: { beats: [{ key: 'KeyA', timestamp: 100 }] },
  };

  it('Pause playback', () => {
    const action: Action = {
      type: 'PAUSE_PLAYBACK',
      currentPlaybackTime: 2500,
    };
    const nextState = reducer(playState, action);

    expect(nextState.mode).toBe('playback-paused');
    expect(nextState.playbackOffset).toBe(2500);
  });

  it('Stop playback', () => {
    const stateWithOffset = { ...playState, playbackOffset: 2500 };
    const nextState = reducer(stateWithOffset, { type: 'STOP_PLAYBACK' });

    expect(nextState.mode).toBe('normal');
    expect(nextState.playbackOffset).toBe(0);
  });

  it('Continue playback', () => {
    const pausedPlayState: ApplicationState = {
      ...playState,
      mode: 'playback-paused',
      playbackOffset: 2500,
    };
    const nextState = reducer(pausedPlayState, { type: 'CONTINUE_PLAYBACK' });

    expect(nextState.mode).toBe('playback-progress');
    expect(nextState.playbackOffset).toBe(2500);
  });

  it('Stop playback', () => {
    const pausedPlayState: ApplicationState = {
      ...playState,
      mode: 'playback-paused',
      playbackOffset: 2500,
    };
    const nextState = reducer(pausedPlayState, { type: 'STOP_PLAYBACK' });

    expect(nextState.mode).toBe('normal');
    expect(nextState.playbackOffset).toBe(0);
=======
=======
>>>>>>> 0a11067 (corrected reducer implimentation and implimented player logic)
    const nextState = reducer(activeState, action);

    expect(nextState.recordings?.beats.length).toBe(1);
    expect(nextState.recordings?.beats[0]).toEqual({
      key: 'KeyA',
      timestamp: 500,
    });
    expect(nextState.recordingStartTime).toBe(1000);
  });

  it('BEAT: appends beat', () => {
    const action: Action = {
      type: 'BEAT',
      data: { key: 'KeyS', timestamp: 0 },
      newStartTime: 2000,
    };
    const nextState = reducer(activeState, action);

    expect(nextState.recordingStartTime).toBe(2000);
  });

  it('BEAT: returns state unchanged', () => {
    const nullRecordingState: ApplicationState = {
      ...activeState,
      recordings: null,
    };
    const action: Action = {
      type: 'BEAT',
      data: { key: 'KeyD', timestamp: 500 },
    };
    const nextState = reducer(nullRecordingState, action);

    expect(nextState).toBe(nullRecordingState);
  });

  it('Pause recording', () => {
    const action: Action = { type: 'PAUSE_RECORDING', currentOffset: 3000 };
    const nextState = reducer(activeState, action);

    expect(nextState.mode).toBe('recording-paused');
    expect(nextState.recordingOffset).toBe(3000);
  });

<<<<<<< HEAD
  it('start playback if recording exists', () => {
    const validTrackState: ApplicationState = {
      mode: 'normal',
      recordings: { beats: [{ key: 'KeyA', timestamp: 100 }] },
    };
    const nextState = reducer(validTrackState, { type: 'START_PLAYBACK' });
    expect(nextState.mode).toBe('playback-progress');
  });

  it('the playback has to work through pause,continue, and stop playback', () => {
    let state: ApplicationState = {
      mode: 'playback-progress',
      recordings: { beats: [{ key: 'KeyA', timestamp: 100 }] },
    };
    state = reducer(state, { type: 'PAUSE_PLAYBACK', timestamp: 2000 });
    expect(state.mode).toBe('playback-paused');
    state = reducer(state, { type: 'CONTINUE_PLAYBACK' });
    expect(state.mode).toBe('playback-progress');
    state = reducer(state, { type: 'STOP_PLAYBACK' });
    expect(state.mode).toBe('normal');
>>>>>>> 781c1e5 (fixes and implimented unit testing)
=======
  it('Stop recording', () => {
    const nextState = reducer(activeState, { type: 'STOP_RECORDING' });
    expect(nextState.mode).toBe('normal');
  });
});

describe('Mode: recording-paused', () => {
  const pausedState: ApplicationState = {
    ...initialState,
    mode: 'recording-paused',
    recordingOffset: 3000,
  };

  it('Continue recording', () => {
    const action: Action = { type: 'CONTINUE_RECORDING', newStartTime: 8000 };
    const nextState = reducer(pausedState, action);

    expect(nextState.mode).toBe('recording-progress');
    expect(nextState.recordingStartTime).toBe(8000);
  });

  it('Stop recording', () => {
    const nextState = reducer(pausedState, { type: 'STOP_RECORDING' });
    expect(nextState.mode).toBe('normal');
  });
});

describe('Playback Flow', () => {
  const playState: ApplicationState = {
    ...initialState,
    mode: 'playback-progress',
    recordings: { beats: [{ key: 'KeyA', timestamp: 100 }] },
  };

  it('Pause playback', () => {
    const action: Action = {
      type: 'PAUSE_PLAYBACK',
      currentPlaybackTime: 2500,
    };
    const nextState = reducer(playState, action);

    expect(nextState.mode).toBe('playback-paused');
    expect(nextState.playbackOffset).toBe(2500);
  });

  it('Stop playback', () => {
    const stateWithOffset = { ...playState, playbackOffset: 2500 };
    const nextState = reducer(stateWithOffset, { type: 'STOP_PLAYBACK' });

    expect(nextState.mode).toBe('normal');
    expect(nextState.playbackOffset).toBe(0);
  });

  it('Continue playback', () => {
    const pausedPlayState: ApplicationState = {
      ...playState,
      mode: 'playback-paused',
      playbackOffset: 2500,
    };
    const nextState = reducer(pausedPlayState, { type: 'CONTINUE_PLAYBACK' });

    expect(nextState.mode).toBe('playback-progress');
    expect(nextState.playbackOffset).toBe(2500);
  });

  it('Stop playback', () => {
    const pausedPlayState: ApplicationState = {
      ...playState,
      mode: 'playback-paused',
      playbackOffset: 2500,
    };
    const nextState = reducer(pausedPlayState, { type: 'STOP_PLAYBACK' });

    expect(nextState.mode).toBe('normal');
    expect(nextState.playbackOffset).toBe(0);
>>>>>>> 0a11067 (corrected reducer implimentation and implimented player logic)
  });
});
