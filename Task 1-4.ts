import assert from "assert";
// ! Task 1. Basic Blue Heart Pattern

// function blueHearts(lineCount: number): void {
//   for (let i = 0; i < lineCount; i++) {
//     for (let j = 0; j <= i; j++) {
//       console.log("💙  ");
//     }
//     console.log("\n");
//   }
// }

// blueHearts(8);
// * failed attempt 👆

/**
 * The blueHearts function prints blue hearts in a right-angled triangle pattern as shown below.
 *💙
 *💙 💙
 *💙 💙 💙
 * when the function is called with the parameter as '3' this should be the output
 * @param lineCount the number of lines to be printed
 * @returns a string object with the patterns
 */

function blueHearts(lineCount: number): string[] {
  let res: string[] = [];
  for (let i = 0; i < lineCount; i++) {
    let linePrint = "";
    for (let j = 0; j <= i; j++) {
      linePrint = linePrint + "💙 ";
    }
    res.push(linePrint);
  }
  return res;
}
console.log(blueHearts(8));
assert.deepEqual(blueHearts(1), ["💙 "]);
assert.deepEqual(blueHearts(2), ["💙 ", "💙 💙 "]);
//assert.deepEqual(blueHearts(3), ["💙 ", "💙 💙 "]); // * this should cause a error to throw up (illegal way to check if the assertion is working or not)
console.log("\n\n");

//! Task 2. Blue and Green Heart Pattern (Line Parity)

/**
 * The blueGreenHearts function prints blue hearts in a right-angled triangle pattern as shown below.
 * 💚
 * 💙 💙
 * 💚 💚 💚
 * when the function is called with the parameter as '3' this should be the output
 * @param lineCount the number of lines to be printed
 * @returns a string object with the patterns
 */

function blueGreenHearts(lineCount: number): string[] {
  let res: string[] = [];
  for (let i = 0; i < lineCount; i++) {
    let linePrint = "";
    if (i % 2 === 1) {
      for (let j = 0; j <= i; j++) {
        linePrint = linePrint + "💙 ";
      }
    } else {
      for (let j = 0; j <= i; j++) {
        linePrint = linePrint + "💚 ";
      }
    }
    res.push(linePrint);
  }
  return res;
}
console.log(blueGreenHearts(9));
assert.deepEqual(blueGreenHearts(1), ["💚 "]);
assert.deepEqual(blueGreenHearts(2), ["💚 ", "💙 💙 "]);
assert.deepEqual(blueGreenHearts(5), [
  "💚 ",
  "💙 💙 ",
  "💚 💚 💚 ",
  "💙 💙 💙 💙 ",
  "💚 💚 💚 💚 💚 ",
]);
// assert.deepEqual(blueGreenHearts(6), [
//   "💚 ",
//   "💙 💙 ",
//   "💚 💚 💚 ",
//   "💙 💙 💙 💙 ",
//   "💚 💚 💚 💚 💚 ",
//   "💚 💚 💚 💚 💚 💚 ",
// ]);   // * this should cause a error to throw up (illegal way to check if the assertion is working or not)
console.log("\n\n");

// ! 3. Alternating Heart Pattern

/**
 * The alternatingGreenBlue function prints blue and green hearts in a right-angled triangle pattern as shown below.
 * '💚 ',
   '💚 💙 ',
   '💚 💙 💚 ',
   '💚 💙 💚 💙 ',
   '💚 💙 💚 💙 💚 ',
   '💚 💙 💚 💙 💚 💙 '
   when the function is called with the parameter as '6' this should be the output
 * @param lineCount the number of lines to be printed
 * @returns a string object with the patterns
 */
function alternatingGreenBlue(lineCount: number): string[] {
  let res: string[] = [];
  for (let i = 0; i < lineCount; i++) {
    let linePrint = "";
    for (let j = 0; j <= i; j++) {
      if (j % 2 === 0) {
        linePrint = linePrint + "💚 ";
      } else {
        linePrint = linePrint + "💙 ";
      }
    }
    res.push(linePrint);
  }
  return res;
}
console.log(alternatingGreenBlue(6));
assert.deepEqual(alternatingGreenBlue(1), ["💚 "]);
assert.deepEqual(alternatingGreenBlue(2), ["💚 ", "💚 💙 "]);
assert.deepEqual(alternatingGreenBlue(3), ["💚 ", "💚 💙 ", "💚 💙 💚 "]);
//assert.deepEqual(alternatingGreenBlue(7), ["💚 ", "💚 💙 ", "💚 💙 💚 ", "💚 💙 💚 💙 "]); // * this should cause a error to throw up (illegal way to check if the assertion is working or not)
console.log("\n\n");

// ! 4. Bounded Heart Pattern

/**
 * The boundedHearts function prints blue and green hearts in a right-angled triangle pattern as shown below.
 * '💙 ',
   '💙 💙 ',
   '💙 💚 💙 ',
   '💙 💚 💚 💙 ',
   '💙 💚 💚 💚 💙 ',
   '💙 💙 💙 💙 💙 💙 '
   when the function is called with the parameter as '6' this should be the output
 * @param lineCount the number of lines to be printed
 * @returns a string object with the patterns
 */
function boundedHearts(lineCount: number): string[] {
  let res: string[] = [];
  for (let i = 0; i < lineCount; i++) {
    let linePrint = "";
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i || i === lineCount - 1) {
        linePrint = linePrint + "💙 ";
      } else {
        linePrint = linePrint + "💚 ";
      }
    }
    res.push(linePrint);
  }
  return res;
}
console.log(boundedHearts(6));
assert.deepEqual(boundedHearts(1), ["💙 "]);
assert.deepEqual(boundedHearts(2), ["💙 ", "💙 💙 "]);
assert.deepEqual(boundedHearts(3), ["💙 ", "💙 💙 ", "💙 💙 💙 "]);
assert.deepEqual(boundedHearts(4), [
  "💙 ",
  "💙 💙 ",
  "💙 💚 💙 ",
  "💙 💙 💙 💙 ",
]);
//assert.deepEqual(boundedHearts(3), ["💙 ", "💙 💙 ", "💙 💚 💙 "]);// * this should cause a error to throw up (illegal way to check if the assertion is working or not)
console.log("\n\n");
