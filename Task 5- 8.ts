import assert from "assert";
// ! 5. Print N Odd or Even Numbers

type EvenOrOdd = "even" | "odd";

/**
 * The printNumbers prints out the array of numbers which are either even or odd in nature and the length of the array is defined by the user
 * @param n to specify number of the numbers to be printed
 * @param evenOrOdd to specify whether the number to be printed is even or odd
 * @returns a array of numbers which is either in the even or odd state as defined by the user
 */
function printNumbers(countOfNumbers: number, evenOrOdd: EvenOrOdd): number[] {
  let result: number[] = [];
  let count = 0;
  let temp: number;
  if (evenOrOdd === "even") {
    temp = 0;
  } else {
    temp = -1;
  }
  do {
    count++;
    temp += 2;
    result.push(temp);
  } while (count !== countOfNumbers);
  return result;
}
console.log(printNumbers(5, "even"));
assert.deepStrictEqual(printNumbers(1, "even"), [2]);
assert.deepStrictEqual(printNumbers(1, "odd"), [1]);
assert.deepStrictEqual(printNumbers(3, "even"), [2, 4, 6]);
console.log("\n\n");

// ! 6. Pad Zeros Before a Number

/**
 * The padZerosBeforeNumber function takes in a number and number of digits parameters and returns a number with '0' padding infront of the number to match the length to numOfDigits
 * @param numAsString the parameter to be modified
 * @param numOfDigits the length of the resultant
 * @returns the resultant with '0' padding added in front
 */
function padZerosBeforeNumber(
  numAsString: number,
  numOfDigits: number,
): string {
  let n1 = String(numAsString);
  if (n1.length - 1 >= numOfDigits) return n1;
  let negativeSignFound = false;
  if (n1[0] === "-") {
    negativeSignFound = true;
    n1 = n1.slice(1);
  }
  n1 = n1.padStart(numOfDigits, "0");
  if (negativeSignFound === true) {
    n1 = "-" + n1;
  }
  return n1;
}
console.log(padZerosBeforeNumber(500, 5));
console.log(padZerosBeforeNumber(-500, 5));
assert.deepStrictEqual(padZerosBeforeNumber(500, 5), "00500");
assert.deepStrictEqual(padZerosBeforeNumber(-500, 5), "-00500");
console.log("\n\n");

// ! 7. Convert Decimal to Binary

/**
 * the convertToBinary is a simple function that takes in a decimal number and converts into a binary number
 * @param numInDecimal the decimal number
 * @returns the resultant binary number
 */
function convertToBinary(numInDecimal: number): string {
  if (numInDecimal === 0) return "0";
  let resultString = "";
  while (numInDecimal > 0) {
    resultString = (numInDecimal % 2) + res;
    numInDecimal = Math.floor(numInDecimal / 2);
  }
  return resultString;
}
console.log(convertToBinary(10));
assert.deepStrictEqual(convertToBinary(10), "1010");
assert.deepStrictEqual(convertToBinary(30), "11110");
console.log("\n\n");

// ! 8. Substring Until Repeating Character

/**
 * the getStringSpecial function take in a string parameter and returns a substring which will be not contain the repeated character
 * @param str input the string
 * @returns the unique substring
 */
function getStringSpecial(str: string): string {
  let length = str.length;
  if (length === 1 || length == 0) return str;
  let i: number;
  for (i = 1; i < length; i++) {
    let repetitionFound = false;
    for (let j = i - 1; j >= 0; j--) {
      if (str[i] === str[j]) {
        repetitionFound = true;
        break;
      }
    }
    if (repetitionFound === true) break;
  }
  return str.slice(0, i);
}

console.log(getStringSpecial("a dream that is"));
assert.deepStrictEqual(getStringSpecial("a dream that is"), "a dre");
assert.deepStrictEqual(getStringSpecial("unparliamentary"), "unparli");
console.log("\n\n");
