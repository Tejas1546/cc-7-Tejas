export type RecordedAction = {
  code: string;
  time: number;
};

export class DrumRecorder {
  isRecording = false;
  isPlaying = false;
  startTime = 0;
  offset = 0;
  recordedSequence: RecordedAction[] = [];
  playbackTimeouts: number[] = [];

  playDrum: (code: string) => void;

  recordBtn: HTMLDivElement;
  playBtn: HTMLDivElement;

  constructor(callback: (code: string) => void) {
    this.playDrum = callback;
    this.recordedSequence = JSON.parse(
      localStorage.getItem('drumRecord') || '[]',
    );
    this.recordBtn = document.getElementById('record-btn') as HTMLDivElement;
    this.playBtn = document.getElementById('play-btn') as HTMLDivElement;
  }

  recording = (): void => {
    if (this.isPlaying) return;
    this.isRecording = !this.isRecording;
    if (this.isRecording) {
      this.startTime = Date.now() - this.offset;
      this.recordBtn.classList.add('recording-active');
    } else {
      this.offset = Date.now() - this.startTime;
      this.recordBtn.classList.remove('recording-active');
    }
  };

  playback = (): void => {
    if (this.isRecording || this.recordedSequence.length === 0) return;
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.playBtn.classList.add('playback-active');
      this.recordedSequence.forEach((action) => {
        const timeout = window.setTimeout(() => {
          this.playDrum(action.code);
        }, action.time);
        this.playbackTimeouts.push(timeout);
      });
      const lastNoteTime =
        this.recordedSequence[this.recordedSequence.length - 1].time;
      const stopTimeout = window.setTimeout(
        this.stopPlayback,
        lastNoteTime + 500,
      );
      this.playbackTimeouts.push(stopTimeout);
    } else {
      this.stopPlayback();
    }
  };

  stopPlayback = (): void => {
    this.isPlaying = false;
    this.playBtn.classList.remove('playback-active');
    this.playbackTimeouts.forEach(clearTimeout);
    this.playbackTimeouts = [];
  };

  clearRecording = (): void => {
    this.recordedSequence = [];
    this.offset = 0;
    localStorage.removeItem('drumRecord');
    const clearBtnElement = document.getElementById(
      'clear-btn',
    ) as HTMLDivElement;
    if (clearBtnElement) clearBtnElement.classList.add('playing');
  };

  logKeystroke = (code: string): void => {
    if (!this.isRecording) return;
    //prevents the delay between the start of record and the first beat
    if (this.recordedSequence.length === 0) {
      this.startTime = Date.now();
      this.offset = 0;
    }

    this.recordedSequence.push({
      code: code,
      time: Date.now() - this.startTime,
    });
    localStorage.setItem('drumRecord', JSON.stringify(this.recordedSequence));
  };
}
