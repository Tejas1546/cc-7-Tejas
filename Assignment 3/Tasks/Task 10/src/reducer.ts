<<<<<<< HEAD
// --- TYPES ---

=======
>>>>>>> 781c1e5 (fixes and implimented unit testing)
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
<<<<<<< HEAD
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
=======
};

type StartRecordingAction = {
  type: 'START_RECORDING';
  timestamp: number;
};
type StartPlaybackAction = {
  type: 'START_PLAYBACK';
};
type ContinueRecordingAction = {
  type: 'CONTINUE_RECORDING';
  timestamp: number;
};
type StopRecordingAction = {
  type: 'STOP_RECORDING';
};
type PauseRecordingAction = {
  type: 'PAUSE_RECORDING';
  timestamp: number;
};
type BeatAction = {
  type: 'BEAT';
  data: Beat;
};
type PausePlaybackAction = {
  type: 'PAUSE_PLAYBACK';
  timestamp: number;
};
type StopPlaybackAction = {
  type: 'STOP_PLAYBACK';
};
type ContinuePlaybackAction = {
  type: 'CONTINUE_PLAYBACK';
};
>>>>>>> 781c1e5 (fixes and implimented unit testing)

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
<<<<<<< HEAD
  recordingStartTime: 0,
  recordingOffset: 0,
  playbackOffset: 0,
=======
>>>>>>> 781c1e5 (fixes and implimented unit testing)
};

export const reducer = (
  state: ApplicationState = initialState,
  action: Action,
): ApplicationState => {
  switch (state.mode) {
    case 'normal':
      switch (action.type) {
<<<<<<< HEAD
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
=======
        case 'START_RECORDING': {
          const newRecording: Recording = {
            beats: [],
          };
          return {
            mode: 'recording-progress',
            recordings: newRecording,
          };
        }
        case 'START_PLAYBACK': {
          if (!state.recordings || state.recordings.beats.length === 0) {
            return state;
          }
          return {
            mode: 'playback-progress',
            recordings: state.recordings,
          };
        }
>>>>>>> 781c1e5 (fixes and implimented unit testing)
        default:
          return state;
      }

    case 'recording-progress':
      switch (action.type) {
        case 'PAUSE_RECORDING':
          return {
<<<<<<< HEAD
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
=======
            mode: 'recording-paused',
            recordings: state.recordings,
          };
        case 'STOP_RECORDING':
          return {
            mode: 'normal',
            recordings: state.recordings,
          };
        case 'BEAT': {
          if (!state.recordings) return state;

          const updatedRecording: Recording = {
            beats: state.recordings.beats.concat(action.data),
          };

          return {
            mode: state.mode,
            recordings: updatedRecording,
          };
        }
>>>>>>> 781c1e5 (fixes and implimented unit testing)
        default:
          return state;
      }

    case 'recording-paused':
      switch (action.type) {
        case 'CONTINUE_RECORDING':
          return {
<<<<<<< HEAD
            ...state,
            mode: 'recording-progress',
            recordingStartTime: action.newStartTime,
          };
        case 'STOP_RECORDING':
          return { ...state, mode: 'normal' };
=======
            mode: 'recording-progress',
            recordings: state.recordings,
          };
        case 'STOP_RECORDING':
          return {
            mode: 'normal',
            recordings: state.recordings,
          };
>>>>>>> 781c1e5 (fixes and implimented unit testing)
        default:
          return state;
      }

    case 'playback-progress':
      switch (action.type) {
        case 'PAUSE_PLAYBACK':
          return {
<<<<<<< HEAD
            ...state,
            mode: 'playback-paused',
            playbackOffset: action.currentPlaybackTime,
          };
        case 'STOP_PLAYBACK':
          return {
            ...state,
            mode: 'normal',
            playbackOffset: 0,
=======
            mode: 'playback-paused',
            recordings: state.recordings,
          };
        case 'STOP_PLAYBACK':
          return {
            mode: 'normal',
            recordings: state.recordings,
>>>>>>> 781c1e5 (fixes and implimented unit testing)
          };
        default:
          return state;
      }

    case 'playback-paused':
      switch (action.type) {
        case 'CONTINUE_PLAYBACK':
          return {
<<<<<<< HEAD
            ...state,
            mode: 'playback-progress',
          };
        case 'STOP_PLAYBACK':
          return {
            ...state,
            mode: 'normal',
            playbackOffset: 0,
=======
            mode: 'playback-progress',
            recordings: state.recordings,
          };
        case 'STOP_PLAYBACK':
          return {
            mode: 'normal',
            recordings: state.recordings,
>>>>>>> 781c1e5 (fixes and implimented unit testing)
          };
        default:
          return state;
      }
<<<<<<< HEAD
=======

>>>>>>> 781c1e5 (fixes and implimented unit testing)
    default:
      return state;
  }
};
<<<<<<< HEAD
export const isCurrentlyRecording = (state: ApplicationState): boolean => {
  return (
    state.mode === 'recording-progress' || state.mode === 'recording-paused'
  );
};
=======
>>>>>>> 781c1e5 (fixes and implimented unit testing)
