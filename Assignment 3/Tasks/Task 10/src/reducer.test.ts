import { describe, it, expect } from 'vitest';
import {
  reducer,
  initialState,
  type ApplicationState,
  type Action,
} from './reducer';

describe('Drumkit reducer module test', () => {
  it('Start recording and reset the old recording track', () => {
    const action: Action = { type: 'START_RECORDING', timestamp: 1000 };
    const nextState = reducer(initialState, action);
    expect(nextState.mode).toBe('recording-progress');
    expect(nextState.recordings).not.toBeNull();
    expect(nextState.recordings?.beats).toEqual([]);
  });

  it('ignore playback if no beats in store', () => {
    const stateWithEmptyRecording: ApplicationState = {
      mode: 'normal',
      recordings: { beats: [] },
    };
    const action: Action = { type: 'START_PLAYBACK' };
    const nextState = reducer(stateWithEmptyRecording, action);
    expect(nextState.mode).toBe('normal');
  });

  it('have to append the beats in recording-progress mode', () => {
    const activeState: ApplicationState = {
      mode: 'recording-progress',
      recordings: { beats: [] },
    };
    const action: Action = {
      type: 'BEAT',
      data: { key: 'KeyA', timestamp: 1500 },
    };
    const nextState = reducer(activeState, action);
    expect(nextState.recordings?.beats.length).toBe(1);
    expect(nextState.recordings?.beats[0]).toEqual({
      key: 'KeyA',
      timestamp: 1500,
    });
  });

  it('ignore beats if not in recording-progress mode', () => {
    const normalState: ApplicationState = {
      mode: 'normal',
      recordings: { beats: [] },
    };
    const action: Action = {
      type: 'BEAT',
      data: { key: 'KeyA', timestamp: 1500 },
    };
    const nextState = reducer(normalState, action);
    expect(nextState.recordings?.beats.length).toBe(0);
  });

  it('pause resume and stop recording test', () => {
    let state: ApplicationState = {
      mode: 'recording-progress',
      recordings: { beats: [{ key: 'KeyA', timestamp: 100 }] },
    };
    state = reducer(state, { type: 'PAUSE_RECORDING', timestamp: 2000 });
    expect(state.mode).toBe('recording-paused');
    state = reducer(state, { type: 'CONTINUE_RECORDING', timestamp: 3000 });
    expect(state.mode).toBe('recording-progress');
    state = reducer(state, { type: 'STOP_RECORDING' });
    expect(state.mode).toBe('normal');
    expect(state.recordings?.beats.length).toBe(1);
  });

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
  });
});
