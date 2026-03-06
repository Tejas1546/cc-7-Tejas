import assert from "assert";
// ! Task 1. Basic Blue Heart Pattern

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
  const res: string[] = [];
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
assert.deepStrictEqual(blueHearts(1), ["💙 "]);
assert.deepStrictEqual(blueHearts(2), ["💙 ", "💙 💙 "]);

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
  const res: string[] = [];
  for (let i = 0; i < lineCount; i++) {
    const heart = i % 2 === 1 ? "💙 " : "💚 ";
    let linePrint = "";
    for (let j = 0; j <= i; j++) {
      linePrint += heart;
    }
    res.push(linePrint);
  }
  return res;
}
console.log(blueGreenHearts(9));
assert.deepStrictEqual(blueGreenHearts(1), ["💚 "]);
assert.deepStrictEqual(blueGreenHearts(2), ["💚 ", "💙 💙 "]);
assert.deepStrictEqual(blueGreenHearts(5), [
  "💚 ",
  "💙 💙 ",
  "💚 💚 💚 ",
  "💙 💙 💙 💙 ",
  "💚 💚 💚 💚 💚 ",
]);
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
  const res: string[] = [];
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
assert.deepStrictEqual(alternatingGreenBlue(1), ["💚 "]);
assert.deepStrictEqual(alternatingGreenBlue(2), ["💚 ", "💚 💙 "]);
assert.deepStrictEqual(alternatingGreenBlue(3), ["💚 ", "💚 💙 ", "💚 💙 💚 "]);
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
  const res: string[] = [];
  for (let i = 0; i < lineCount; i++) {
    let linePrint = "";
    for (let j = 0; j <= i; j++) {
      const isBorder = j === 0 || j === i || i === lineCount - 1;
      linePrint += isBorder ? "💙 " : "💚 ";
    }
    res.push(linePrint);
  }
  return res;
}
console.log(boundedHearts(6));
assert.deepStrictEqual(boundedHearts(1), ["💙 "]);
assert.deepStrictEqual(boundedHearts(2), ["💙 ", "💙 💙 "]);
assert.deepStrictEqual(boundedHearts(3), ["💙 ", "💙 💙 ", "💙 💙 💙 "]);
assert.deepStrictEqual(boundedHearts(4), [
  "💙 ",
  "💙 💙 ",
  "💙 💚 💙 ",
  "💙 💙 💙 💙 ",
]);
console.log("\n\n");
