import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Player, type TrackEvent, type Recording } from './players';

describe('Player Class Engine', () => {
  const mockPlayback = vi.fn();
  const mockListener = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  //Normalization
  describe('', () => {
    it('handles an empty recording', () => {
      const player = new Player({ events: [] }, mockPlayback);
      expect(player.totalBeats).toBe(0);
      expect(player.playableBeats).toEqual([]);
    });

    it('set first to 0', () => {
      const events: TrackEvent[] = [
        { type: 'beat', timestamp: 5000, key: 'KeyA' },
        { type: 'beat', timestamp: 7000, key: 'KeyS' },
      ];
      const player = new Player({ events }, mockPlayback);
      expect(player.playableBeats).toEqual([
        { timestamp: 0, key: 'KeyA' },
        { timestamp: 2000, key: 'KeyS' },
      ]);
    });

    it('delay remove', () => {
      const events: TrackEvent[] = [
        { type: 'beat', timestamp: 0, key: 'b1' },
        { type: 'beat', timestamp: 2000, key: 'b2' },
        { type: 'pause', timestamp: 4000 },
        { type: 'beat', timestamp: 8000, key: 'b3' },
        { type: 'beat', timestamp: 10000, key: 'b4' },
      ];
      const player = new Player({ events }, mockPlayback);

      expect(player.playableBeats).toEqual([
        { timestamp: 0, key: 'b1' },
        { timestamp: 2000, key: 'b2' },
        { timestamp: 4000, key: 'b3' },
        { timestamp: 6000, key: 'b4' },
      ]);
    });
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 522cf3f (added additional tests and implimented fixes)

    it('additional Delay', () => {
      const events: TrackEvent[] = [
        { type: 'beat', timestamp: 0, key: 'b1' },
        { type: 'beat', timestamp: 2000, key: 'b2' },
        { type: 'pause', timestamp: 4000 },
        { type: 'beat', timestamp: 8000, key: 'b3' },
        { type: 'beat', timestamp: 10000, key: 'b4' },
        { type: 'pause', timestamp: 12000 },
        { type: 'beat', timestamp: 20000, key: 'b2' },
      ];
      const player = new Player({ events }, mockPlayback);

      expect(player.playableBeats).toEqual([
        { timestamp: 0, key: 'b1' },
        { timestamp: 2000, key: 'b2' },
        { timestamp: 4000, key: 'b3' },
        { timestamp: 6000, key: 'b4' },
        { timestamp: 8000, key: 'b2' },
      ]);
    });

    it('multiple pause', () => {
      const events: TrackEvent[] = [
        { type: 'beat', timestamp: 0, key: 'b1' },
        { type: 'beat', timestamp: 2000, key: 'b2' },
        { type: 'pause', timestamp: 4000 },
        { type: 'pause', timestamp: 6000 },
        { type: 'beat', timestamp: 8000, key: 'b4' },
      ];
      const player = new Player({ events }, mockPlayback);

      expect(player.playableBeats).toEqual([
        { timestamp: 0, key: 'b1' },
        { timestamp: 2000, key: 'b2' },
        { timestamp: 4000, key: 'b4' },
      ]);
    });
<<<<<<< HEAD
=======
>>>>>>> 0a11067 (corrected reducer implimentation and implimented player logic)
=======
>>>>>>> 522cf3f (added additional tests and implimented fixes)
  });

  describe('Playback Engine', () => {
    const simpleRecording: Recording = {
      events: [
        { type: 'beat', timestamp: 0, key: 'b1' },
        { type: 'beat', timestamp: 1000, key: 'b2' },
        { type: 'beat', timestamp: 2500, key: 'b3' },
      ],
    };

    it('plays the sequence accurately over time', () => {
      const player = new Player(simpleRecording, mockPlayback);

      player.play();
      vi.advanceTimersByTime(0);

      expect(mockPlayback).toHaveBeenCalledTimes(1);
      expect(mockPlayback).toHaveBeenNthCalledWith(1, {
        timestamp: 0,
        key: 'b1',
      });
      vi.advanceTimersByTime(1000);
      expect(mockPlayback).toHaveBeenCalledTimes(2);
      expect(mockPlayback).toHaveBeenNthCalledWith(2, {
        timestamp: 1000,
        key: 'b2',
      });

      vi.advanceTimersByTime(1500);
      expect(mockPlayback).toHaveBeenCalledTimes(3);
      expect(mockPlayback).toHaveBeenNthCalledWith(3, {
        timestamp: 2500,
        key: 'b3',
      });
    });

    it('stops playing when paused', () => {
      const player = new Player(simpleRecording, mockPlayback);
      player.play();
      vi.advanceTimersByTime(0);
      expect(mockPlayback).toHaveBeenCalledTimes(1);
      vi.advanceTimersByTime(500);
      player.pause();
      vi.advanceTimersByTime(5000);
      expect(mockPlayback).toHaveBeenCalledTimes(1);
      expect(player.beatIndex).toBe(1);
    });

    it('resumes playback ', () => {
      const player = new Player(simpleRecording, mockPlayback);
      player.play();
      vi.advanceTimersByTime(500);
      player.pause();
      vi.advanceTimersByTime(100000);
      player.play();
      vi.advanceTimersByTime(0);
      expect(mockPlayback).toHaveBeenCalledTimes(2);
      expect(mockPlayback).toHaveBeenLastCalledWith({
        timestamp: 1000,
        key: 'b2',
      });
    });

    it('completely resets sequence on stop()', () => {
      const player = new Player(simpleRecording, mockPlayback);
      player.play();
      vi.advanceTimersByTime(1000);
      player.stop();
      expect(player.beatIndex).toBe(0);
      vi.advanceTimersByTime(5000);
      expect(mockPlayback).toHaveBeenCalledTimes(2);
    });
  });

  describe('Observer Pattern ', () => {
    it('notifies subscribers on play, beat hits, pause, and stop', () => {
      const player = new Player(
        { events: [{ type: 'beat', timestamp: 0, key: 'A' }] },
        mockPlayback,
      );

      player.subscribe(mockListener);
      player.play();
      vi.advanceTimersByTime(0);
      // play() calls notify(), and the internal setTimeout also calls notify()
      expect(mockListener).toHaveBeenCalled();
      player.pause();
      expect(mockListener).toHaveBeenCalledWith(1, 1);
      player.stop();
      expect(mockListener).toHaveBeenLastCalledWith(0, 1);
      player.unsubscribe(mockListener);
      player.play();

      const callCount = mockListener.mock.calls.length;
      vi.advanceTimersByTime(1000);
      expect(mockListener.mock.calls.length).toBe(callCount);
    });
  });
});
