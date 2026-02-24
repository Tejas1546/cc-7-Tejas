import assert from "assert";
// ! 9. Add Corresponding Array Elements

/**
 * the addArrays function will generate a result array where it contains the sum of corresponding numbers in the source arrays. If arrays are of different lengths, assume missing elements are 0.
 * @param a first array
 * @param b second array
 * @returns resultant array
 */
function addArrays(a: number[], b: number[]): number[] {
  let resultArray: number[] = [];
  let n = a.length < b.length ? a.length : b.length;
  let i: number;
  for (i = 0; i < n; i++) {
    resultArray.push(a[i] + b[i]);
  }
  if (a.length > i) {
    for (let j = i; j < a.length; j++) {
      resultArray.push(a[j]);
    }
  }
  if (b.length > i) {
    for (let j = i; j < b.length; j++) {
      resultArray.push(b[j]);
    }
  }
  return resultArray;
}
console.log(addArrays([2, 3, 5], [5, 6, 4]));
assert.deepStrictEqual(addArrays([2, 3, 5], [5, 6, 4]), [7, 9, 9]);
assert.deepStrictEqual(addArrays([2, 2], [4, 5, 6]), [6, 7, 6]);
console.log("\n\n");

// ! 10. Compute String Length (Without .length)

/**
 * the function lengthOfString take in a string as its parameter and return the length of that string
 * @param str input a string
 * @returns the length of the string
 */
function lengthOfString(str: string): number {
  const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  return [...segmenter.segment(str)].length;
}
console.log(lengthOfString("one world"));
assert.deepStrictEqual(lengthOfString("Tejas👨‍👩‍👧‍👦"), 6);
assert.deepStrictEqual(lengthOfString("👩🏽‍🔬🏴󠁧󠁢󠁳󠁣󠁴󠁿Hi"), 4);
console.log("\n\n");

//! 11. First N Perfect Squares

/**
 * the generateFirstSquares function will take in a number as input 'n' and return the first n perfect squares.
 * @param n  to specify number of squares
 * @returns array with the perfect squares
 */
function generateFirstSquares(n: number): number[] {
  if (n <= 0) return [];
  let resultArray: number[] = [];
  let i = 0;
  while (i !== n) {
    i++;
    resultArray.push(i * i);
  }
  return resultArray;
}
console.log(generateFirstSquares(4));
assert.deepStrictEqual(generateFirstSquares(4), [1, 4, 9, 16]);
console.log("\n\n");

// ! Get Day of Week from Name
type DayName = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | string;
type Result = 0 | 1 | 2 | 3 | 4 | 5 | 6 | -1;
/**
 * the function getDayOfWeek  will return the day of the week (0 for Sunday, 1 for Monday, etc.) given a short string representation of the day's name.If an unknown string is passed, the function should return -1.
 * @param dayName enter the day name ie. "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat"
 * @returns a number corresponding to the day
 */
function getDayOfWeek(dayName: DayName): Result {
  switch (dayName) {
    case "mon":
      return 1;
    case "tue":
      return 2;
    case "wed":
      return 3;
    case "thu":
      return 4;
    case "fri":
      return 5;
    case "sat":
      return 6;
    case "sun":
      return 0;

    default:
      return -1;
  }
}
console.log(getDayOfWeek("mon"));
assert.deepStrictEqual(getDayOfWeek("mon"), 1);
assert.deepStrictEqual(getDayOfWeek("hi"), -1);
