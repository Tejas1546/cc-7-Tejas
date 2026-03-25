export type TrackEvent =
  | { type: 'beat'; timestamp: number; key: string }
  | { type: 'pause'; timestamp: number };

export type Recording = { events: TrackEvent[] };
export type Listener = (beatIndex: number, totalBeats: number) => void;
type Timeout = ReturnType<typeof setTimeout>;

export class Player {
  listeners: Listener[] = [];
  scheduledPlaybackTimers: Timeout[] = [];
  beatIndex: number = 0;

  playableBeats: { timestamp: number; key: string }[] = [];

  get totalBeats() {
    return this.playableBeats.length;
  }

  constructor(
    private recording: Recording,
    private playback: (beat: { timestamp: number; key: string }) => void,
  ) {
    this.playableBeats = this.normalizeTape(this.recording.events);
  }

  normalizeTape(events: TrackEvent[]) {
    const stitchedBeats: { timestamp: number; key: string }[] = [];
    const firstBeat = events.find((ev) => ev.type === 'beat'); //First beat is found and normalized to 0
    if (!firstBeat) return stitchedBeats;

    let currentPlaybackTime = 0;
    let previousBeatTime = firstBeat.timestamp; // Start the baseline right at the first beat
    let lastPauseTime: number | null = null;

    for (const ev of events) {
      if (ev.type === 'pause') {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 522cf3f (added additional tests and implimented fixes)
        if (lastPauseTime === null) {
          // handles multiple concurrent pauses
          lastPauseTime = ev.timestamp; //records the pause timestamp
        }
<<<<<<< HEAD
=======
        lastPauseTime = ev.timestamp; //records the pause timestamp
>>>>>>> 0a11067 (corrected reducer implimentation and implimented player logic)
=======
>>>>>>> 522cf3f (added additional tests and implimented fixes)
      } else if (ev.type === 'beat') {
        let gap: number;
        if (lastPauseTime !== null) {
          gap = lastPauseTime - previousBeatTime; // removes the pause delay
          if (gap < 0) gap = 0; // prevents the difference from going negative
          lastPauseTime = null;
        } else {
          gap = ev.timestamp - previousBeatTime;
        }
        currentPlaybackTime += gap;
        stitchedBeats.push({
          key: ev.key,
          timestamp: currentPlaybackTime,
        });
        previousBeatTime = ev.timestamp;
      }
    }
    return stitchedBeats;
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  notify() {
    this.listeners.forEach((l) => l(this.beatIndex, this.totalBeats));
  }

  play() {
    if (this.totalBeats === 0) return;

    const baseTimestamp = this.playableBeats[this.beatIndex].timestamp;

    for (let i = this.beatIndex; i < this.totalBeats; i++) {
      const beat = this.playableBeats[i];
      const delay = beat.timestamp - baseTimestamp;
      const timer = setTimeout(() => {
        this.playback(beat);

        this.beatIndex = i + 1; //records the index in-case of pause
        this.notify();
        this.scheduledPlaybackTimers = this.scheduledPlaybackTimers.filter(
          (t) => t !== timer,
        );
      }, delay);

      this.scheduledPlaybackTimers.push(timer);
    }

    this.notify();
  }

  pause() {
    this.scheduledPlaybackTimers.forEach(clearTimeout);
    this.scheduledPlaybackTimers = [];
    this.notify();
  }

  stop() {
    this.pause();
    this.beatIndex = 0;
    this.notify();
  }
}
