import assert from "node:assert/strict";
//! Task 1 Write a Higher Order function(HOF):
/**
 * Creates a cutoff checker function.
 * @param cutOffValue - The maximum allowed value.
 * @returns {(number: number) => boolean} A function that takes a number and returns true if the number is less than or equal to the cutoff value,otherwise false.
 */
const createCutOff = (cutOffValue: number) => (num: number) =>
  num <= cutOffValue;
const cutOff100 = createCutOff(100);
assert.deepStrictEqual(cutOff100(89), true);
assert.equal(cutOff100(189), false);

// ! Task 2 : We have an array that contains a string with "CraftCode" in the array items, the function has replace this string with "CodeCraft"
/**
 * The function replaceString() simply replaces the word "CraftCode" with "CodeCraft"
 * @param stringArray takes the array of strings
 * @returns returns a transformed array of strings
 * Eg ["CraftCode is a nice company", "We love CraftCode", "We are working in CraftCode", "Where is CraftCode?"] becomes ["CodeCraft is a nice company","We love CodeCraft”, “We are working in CodeCraft","Where is CodeCraft?"]
 */

const replaceString = (stringArray: string[]): string[] =>
  stringArray.map((srt) => srt.replaceAll("CraftCode", "CodeCraft"));
assert.deepStrictEqual(
  replaceString([
    "CraftCode is a nice company",
    "We love CraftCode”, “We are working in CraftCode",
    "Where is CraftCode?",
  ]),
  [
    "CodeCraft is a nice company",
    "We love CodeCraft”, “We are working in CodeCraft",
    "Where is CodeCraft?",
  ],
);
assert.deepStrictEqual(
  replaceString(["CraftCode CraftCode CraftCode", "Welcome to CraftCode"]),
  ["CodeCraft CodeCraft CodeCraft", "Welcome to CodeCraft"],
);

// ! Task 3: Write a function to remove the item containing the number 4 and for the other add it by 10
/**
 * Excludes any line containing the digit "4" from a multi-line purchase string
 * and increments the numeric quantity of the remaining items by 10 (excluding the header line).
 * @param purchases takes in the string that has to be transformed
 * @returns the transformed result
 * Eg: `items qty
apple 24
mango 50
guava 42
onion 31
water 10` to
`items qty
mango 60
onion 41
water 20`
 */

const excludeFourAndAddTen = (purchases: string) => {
  return purchases
    .split("\n")
    .filter((line) => !line.includes("4"))
    .map((item, index) => {
      if (index === 0) return item;
      const [name, qty] = item.split(" ");
      return `${name} ${Number(qty) + 10}`;
    })
    .join("\n");
};

assert.deepStrictEqual(
  excludeFourAndAddTen(`items qty
apple 24
mango 50
guava 42
onion 31
water 10`),
  `items qty
mango 60
onion 41
water 20`,
);
assert.deepStrictEqual(
  excludeFourAndAddTen(`items qty
banana 14
carrot 33
tomato 44
potato 12
peach 41`),
  `items qty
carrot 43
potato 22`,
);

assert.deepStrictEqual(
  excludeFourAndAddTen(`items qty
rice 40
beans 35
corn 42
peas 20`),
  `items qty
beans 45
peas 30`,
);

assert.deepStrictEqual(
  excludeFourAndAddTen(`items qty
milk 24
cheese 15
yogurt 42
butter 19`),
  `items qty
cheese 25
butter 29`,
);

assert.deepStrictEqual(
  excludeFourAndAddTen(`items qty
tea 12
coffee 41
sugar 33
honey 42`),
  `items qty
tea 22
sugar 43`,
);

// ! Task 4: In the array given below, filter out all strings that contain  either ‘u’ or ‘g’.
/**
 * Filters out items from an array of strings that contain the letters "u" or "g".
 * @param itemString takes in the array of strings
 * @returns the modified array of string
 */
const excludeUAndG = (itemString: string[]): string[] =>
  itemString.filter((item) => !/u|g/.test(item));
assert.deepStrictEqual(
  excludeUAndG(["browl", "faaast", "energy", "stand", "eat", "lunch"]),
  ["browl", "faaast", "stand", "eat"],
);
assert.deepStrictEqual(
  excludeUAndG(["umbrella", "fan", "lamp", "rug", "desk"]),
  ["fan", "lamp", "desk"],
);

assert.deepStrictEqual(excludeUAndG(["sun", "moon", "star", "galaxy"]), [
  "moon",
  "star",
]);

// ! Task 5: For the given input array, filter all elements that start with "mang" or end with "fy"
/**
 * Filters out strings that start with "mang" or end with "fy".
 *
 * @param itemString - An array of strings to filter.
 * @returns A new array excluding strings that

 */
const filterOutMangAndFy = (itemString: string[]): string[] =>
  itemString.filter((item) => !/^mang|fy$/.test(item));

assert.deepStrictEqual(
  filterOutMangAndFy([
    "mangalore",
    "semangin",
    "2 lonely",
    "verify",
    "rectify",
    "mangala",
    "notifyy",
  ]),
  ["semangin", "2 lonely", "notifyy"],
);
assert.deepStrictEqual(
  filterOutMangAndFy([
    "mangosteen",
    "amango",
    "simplify",
    "amplify",
    "mango",
    "clarifyy",
    "hello",
  ]),
  ["amango", "clarifyy", "hello"],
);
