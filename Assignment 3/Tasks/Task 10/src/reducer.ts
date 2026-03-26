// --- TYPES ---

export type Beat = {
  key: string;
  timestamp: number;
};

export type Recording = {
  beats: Beat[];
};

export type ApplicationState = {
  mode:
    | 'normal'
    | 'recording-progress'
    | 'recording-paused'
    | 'playback-progress'
    | 'playback-paused';
  recordings: Recording | null;
  recordingStartTime: number;
  recordingOffset: number;
  playbackOffset: number;
};

type StartRecordingAction = { type: 'START_RECORDING'; timestamp: number };
type StartPlaybackAction = { type: 'START_PLAYBACK' };
type ContinueRecordingAction = {
  type: 'CONTINUE_RECORDING';
  newStartTime: number;
};
type StopRecordingAction = { type: 'STOP_RECORDING' };
type PauseRecordingAction = { type: 'PAUSE_RECORDING'; currentOffset: number };
type BeatAction = {
  type: 'BEAT';
  data: Beat;
  newStartTime?: number;
};
type PausePlaybackAction = {
  type: 'PAUSE_PLAYBACK';
  currentPlaybackTime: number;
};
type StopPlaybackAction = { type: 'STOP_PLAYBACK' };
type ContinuePlaybackAction = { type: 'CONTINUE_PLAYBACK' };

export type Action =
  | StartRecordingAction
  | StartPlaybackAction
  | ContinueRecordingAction
  | StopRecordingAction
  | PauseRecordingAction
  | BeatAction
  | PausePlaybackAction
  | StopPlaybackAction
  | ContinuePlaybackAction;

export const initialState: ApplicationState = {
  mode: 'normal',
  recordings: null,
  recordingStartTime: 0,
  recordingOffset: 0,
  playbackOffset: 0,
};

export const reducer = (
  state: ApplicationState = initialState,
  action: Action,
): ApplicationState => {
  switch (state.mode) {
    case 'normal':
      switch (action.type) {
        case 'START_RECORDING':
          return {
            mode: 'recording-progress',
            recordings: { beats: [] },
            recordingStartTime: action.timestamp,
            recordingOffset: 0,
            playbackOffset: 0,
          };
        case 'START_PLAYBACK':
          if (!state.recordings || state.recordings.beats.length === 0)
            return state;
          return {
            ...state,
            mode: 'playback-progress',
            playbackOffset: 0,
          };
        default:
          return state;
      }

    case 'recording-progress':
      switch (action.type) {
        case 'PAUSE_RECORDING':
          return {
            ...state,
            mode: 'recording-paused',
            recordingOffset: action.currentOffset,
          };
        case 'STOP_RECORDING':
          return { ...state, mode: 'normal' };
        case 'BEAT':
          if (!state.recordings) return state;

          return {
            ...state,
            recordings: {
              beats: state.recordings.beats.concat(action.data),
            },
            recordingStartTime:
              action.newStartTime !== undefined
                ? action.newStartTime
                : state.recordingStartTime,
          };
        default:
          return state;
      }

    case 'recording-paused':
      switch (action.type) {
        case 'CONTINUE_RECORDING':
          return {
            ...state,
            mode: 'recording-progress',
            recordingStartTime: action.newStartTime,
          };
        case 'STOP_RECORDING':
          return { ...state, mode: 'normal' };
        default:
          return state;
      }

    case 'playback-progress':
      switch (action.type) {
        case 'PAUSE_PLAYBACK':
          return {
            ...state,
            mode: 'playback-paused',
            playbackOffset: action.currentPlaybackTime,
          };
        case 'STOP_PLAYBACK':
          return {
            ...state,
            mode: 'normal',
            playbackOffset: 0,
          };
        default:
          return state;
      }

    case 'playback-paused':
      switch (action.type) {
        case 'CONTINUE_PLAYBACK':
          return {
            ...state,
            mode: 'playback-progress',
          };
        case 'STOP_PLAYBACK':
          return {
            ...state,
            mode: 'normal',
            playbackOffset: 0,
          };
        default:
          return state;
      }
    default:
      return state;
  }
};
export const isCurrentlyRecording = (state: ApplicationState): boolean => {
  return (
    state.mode === 'recording-progress' || state.mode === 'recording-paused'
  );
};
