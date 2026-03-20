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
};

export const reducer = (
  state: ApplicationState = initialState,
  action: Action,
): ApplicationState => {
  switch (state.mode) {
    case 'normal':
      switch (action.type) {
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
        default:
          return state;
      }

    case 'recording-progress':
      switch (action.type) {
        case 'PAUSE_RECORDING':
          return {
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
        default:
          return state;
      }

    case 'recording-paused':
      switch (action.type) {
        case 'CONTINUE_RECORDING':
          return {
            mode: 'recording-progress',
            recordings: state.recordings,
          };
        case 'STOP_RECORDING':
          return {
            mode: 'normal',
            recordings: state.recordings,
          };
        default:
          return state;
      }

    case 'playback-progress':
      switch (action.type) {
        case 'PAUSE_PLAYBACK':
          return {
            mode: 'playback-paused',
            recordings: state.recordings,
          };
        case 'STOP_PLAYBACK':
          return {
            mode: 'normal',
            recordings: state.recordings,
          };
        default:
          return state;
      }

    case 'playback-paused':
      switch (action.type) {
        case 'CONTINUE_PLAYBACK':
          return {
            mode: 'playback-progress',
            recordings: state.recordings,
          };
        case 'STOP_PLAYBACK':
          return {
            mode: 'normal',
            recordings: state.recordings,
          };
        default:
          return state;
      }

    default:
      return state;
  }
};
