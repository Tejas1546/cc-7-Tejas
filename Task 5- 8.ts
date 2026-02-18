import assert from "assert";
import { log } from "console";
// ! 5. Print N Odd or Even Numbers

type EvenOrOdd = "even" | "odd";

/**
 * The printNumbers prints out the array of numbers which are either even or odd in nature and the length of the array is defined by the user
 * @param n to specify number of the numbers to be printed
 * @param evenOrOdd to specify whether the number to be printed is even or odd
 * @returns a array of numbers which is either in the even or odd state as defined by the user
 */
function printNumbers(n: number, evenOrOdd: EvenOrOdd): number[] {
  let res: number[] = [];
  let c = 0;
  let temp: number;
  if (evenOrOdd === "even") {
    temp = 0;
  } else {
    temp = -1;
  }
  do {
    c++;
    temp += 2;
    res.push(temp);
  } while (c !== n);
  return res;
}
console.log(printNumbers(5, "even"));
assert.deepEqual(printNumbers(1, "even"), [2]);
assert.deepEqual(printNumbers(1, "odd"), [1]);
assert.deepEqual(printNumbers(3, "even"), [2, 4, 6]);
// assert.deepEqual(printNumbers(3, "even"), [1, 3, 5]); // * this should cause a error to throw up (illegal way to check if the assertion is working or not)
console.log("\n\n");

// ! 6. Pad Zeros Before a Number

/**
 * The padZerosBeforeNumber function takes in a number and number of digits parameters and returns a number with '0' padding infront of the number to match the length to numOfDigits
 * @param number the parameter to be modified
 * @param numOfDigits the length of the resultant
 * @returns the resultant with '0' padding added in front
 */
function padZerosBeforeNumber(number: number, numOfDigits: number): string {
  let n1 = String(number);
  if (n1.length - 1 >= numOfDigits) return n1;
  let flag = 0;
  if (n1[0] === "-") {
    flag = 1;
    n1 = n1.slice(1);
  }
  n1 = n1.padStart(numOfDigits, "0");
  if (flag === 1) {
    n1 = "-" + n1;
  }
  return n1;
}
console.log(padZerosBeforeNumber(500, 5));
console.log(padZerosBeforeNumber(-500, 5));
assert.deepEqual(padZerosBeforeNumber(500, 5), "00500");
assert.deepEqual(padZerosBeforeNumber(-500, 5), "-00500");
// assert.deepEqual(padZerosBeforeNumber(500, 3), "00500");// * this should cause a error to throw up (illegal way to check if the assertion is working or not)
console.log("\n\n");

// ! 7. Convert Decimal to Binary

/**
 * the convertToBinary is a simple function that takes in a decimal number and converts into a binary number
 * @param numInDecimal the decimal number
 * @returns the resultant binary number
 */
function convertToBinary(numInDecimal: number): string {
  if (numInDecimal === 0) return "0";
  let res = "";
  while (numInDecimal > 0) {
    res = (numInDecimal % 2) + res;
    numInDecimal = Math.floor(numInDecimal / 2);
  }
  return res;
}
console.log(convertToBinary(10));
assert.deepEqual(convertToBinary(10), "1010");
assert.deepEqual(convertToBinary(30), "11110");
// assert.deepEqual(convertToBinary(88), "10001");// * this should cause a error to throw up (illegal way to check if the assertion is working or not)
console.log("\n\n");

// ! 8. Substring Until Repeating Character

/**
 * the getStringSpecial function take in a string parameter and returns a substring which will be not contain the repeated character
 * @param str input the string
 * @returns the unique substring
 */
function getStringSpecial(str: string): string {
  let length = str.length;
  if (length === 0) return "";
  if (length === 1) return str;
  let i: number;
  for (i = 1; i < length; i++) {
    let flag = 0;
    for (let j = i - 1; j >= 0; j--) {
      if (str[i] === str[j]) {
        flag = 1;
        break;
      }
    }
    if (flag === 1) break;
  }
  return str.slice(0, i);
}

console.log(getStringSpecial("a dream that is"));
assert.deepEqual(getStringSpecial("a dream that is"), "a dre");
assert.deepEqual(getStringSpecial("unparliamentary"), "unparli");
//assert.deepEqual(getStringSpecial("Tejas Shetty"), "Tejas ");// * this should cause a error to throw up (illegal way to check if the assertion is working or not)
console.log("\n\n");
