import { Player, type TrackEvent } from './players.ts';

// ---------------------------------------------------------
// TEST 1: Single Pause (Team's Example)
// ---------------------------------------------------------
const input1: TrackEvent[] = [
  { type: 'beat', key: 'A', timestamp: 10 },
  { type: 'pause', timestamp: 20 },
  { type: 'beat', key: 'B', timestamp: 50 },
];

const player1 = new Player({ events: input1 }, () => {});

console.log('--- TEST 1: Single Pause ---');
console.log(player1['playableBeats']);
console.log('\n');

// ---------------------------------------------------------
// TEST 2: Multiple Pauses (Team's Example)
// ---------------------------------------------------------
const input2: TrackEvent[] = [
  { type: 'beat', key: 'A', timestamp: 10 },
  { type: 'pause', timestamp: 20 },
  { type: 'beat', key: 'B', timestamp: 50 },
  { type: 'pause', timestamp: 70 },
  { type: 'beat', key: 'C', timestamp: 100 },
];

const player2 = new Player({ events: input2 }, () => {});

console.log('--- TEST 2: Multiple Pauses ---');
console.log(player2['playableBeats']);
console.log('\n');
