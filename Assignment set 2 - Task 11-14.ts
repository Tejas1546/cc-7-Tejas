import assert from "node:assert/strict";

//! Task 11: Find second largest number in a given array first by using an imperative approach without using reduce. Use a forEach HOF to iterate over items and figure out the second largest item.
/**
 * This function finds the 2nd largest number in the array using the foreach loop
 * @param numArray the input array
 * @returns a the 2nd largest number
 */
const secondLargest = (numArray: number[]): number => {
  if (numArray.length < 2) return numArray[0];
  let largest = numArray[0];
  let secondLargest = numArray[0];
  numArray.forEach((num) => {
    if (num > largest) {
      secondLargest = largest;
      largest = num;
    } else if (num > secondLargest && num !== largest) secondLargest = num;
  });
  return secondLargest;
};
assert.deepStrictEqual(secondLargest([2, 3, 51, 3, 5]), 5);
assert.deepStrictEqual(secondLargest([2, 3, 51, 3, 5, 94]), 51);

//! Same solution using reduce method.
/**
 * This function finds the 2nd largest number in the array using the reduce()
 * @param numArray the input array
 * @returns a the 2nd largest number
 */
const secondLargest1 = (numArray: number[]): number => {
  if (numArray.length < 2) return numArray[0];
  const result = numArray.reduce(
    (accum, num) => {
      if (num > accum.largest) {
        accum.secondLargest = accum.largest;
        accum.largest = num;
      } else if (num > accum.secondLargest && num !== accum.largest) {
        accum.secondLargest = num;
      }
      return accum;
    },
    { largest: -Infinity, secondLargest: -Infinity },
  );
  return result.secondLargest;
};
assert.deepStrictEqual(secondLargest1([2, 3, 51, 3, 5]), 5);
assert.deepStrictEqual(secondLargest1([2, 3, 51, 3, 5, 94]), 51);

// !Task 12: Implimentation of a some() that uses predicate
/**
 * The some() checks the array with predicate() that is passed and returns if the given array satisfies the function
 * @param arr the generic array input
 * @param predicate the condition to pass
 * @returns a boolean value
 */
const some = <T>(arr: T[], predicate: (item: T) => boolean): boolean => {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) {
      return true;
    }
  }
  return false;
};
assert.deepStrictEqual(
  some([6, 43, 98], (item) => item > 4),
  true,
);
assert.deepStrictEqual(
  some(["apple", "banana", "cherry"], (item) => item.includes("a")),
  true,
);

assert.deepStrictEqual(
  some(["dog", "cat", "fish"], (item) => item.includes("z")),
  false,
);

// some based on reduce
const some1 = <T>(arr: T[], predicate: (item: T) => boolean): boolean => {
  return arr.reduce((acc, item) => acc || predicate(item), false);
};
assert.deepStrictEqual(
  some1(["dog", "cat", "fish"], (item) => item.includes("z")),
  false,
);

//! Task 13: Author and works

const quotes = [
  {
    text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
    author: "Thomas Edison",
  },
  {
    text: "You can observe a lot just by watching.",
    author: "Yogi Berra",
  },
  {
    text: "To invent, you need a good imagination and a pile of junk",
    author: "Thomas Edison",
  },
  {
    text: "Difficulties increase the nearer we get to the goal.",
    author: "Yogi Berra",
  },
  {
    text: "Fate is in your hands and no one elses",
    author: "Byron Pulsifer",
  },
  {
    text: "Be the chief but never the lord.",
    author: "Lao Tzu",
  },
  {
    text: "Nothing happens unless first we dream.",
    author: "Byron Pulsifer",
  },
  {
    text: "Well begun is half done.",
    author: "Aristotle",
  },
  {
    text: "Life is a learning experience, only if you learn.",
    author: "Yogi Berra",
  },
  {
    text: "Self-complacency is fatal to progress.",
    author: "Margaret Sangster",
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
  },
  {
    text: "What you give is what you get.",
    author: "Byron Pulsifer",
  },
  {
    text: "We can only learn to love by loving.",
    author: "Lao Tzu",
  },
  {
    text: "Life is change. Growth is optional. Choose wisely.",
    author: "Karen Clark",
  },
  {
    text: "You'll see it when you believe it.",
    author: "Buddha",
  },
];
type Quotes = {
  text: string;
  author: string;
};

//in the form author:text
/**
 * Converts an array of quote objects into an array of strings
 * formatted as "author: text".
 * @param quotes the object array is expected
 * @returns a string[] in the form author:text
 */
const authorAndWork = (quotes: Quotes[]) =>
  quotes.map((quot) => `${quot.author}: ${quot.text}`);

//extract text containing word
const getQuotesContainingWord = (quotes: Quotes[], word: string) =>
  quotes
    .filter((q) => q.text.toLowerCase().includes(word.toLowerCase()))
    .map((q) => q.text);

//extract text
const quotStringArray = (quotes: Quotes[]) =>
  quotes.map((quote) => `${quote.text}`);

//extract authors
const getUniqueAuthors = (quotes: Quotes[]) => {
  return quotes.reduce((auhor: string[], quote) => {
    if (!auhor.includes(quote.author)) auhor.push(quote.author);
    return auhor;
  }, []);
};

assert.deepStrictEqual(getUniqueAuthors(quotes), [
  "Thomas Edison",
  "Yogi Berra",
  "Byron Pulsifer",
  "Lao Tzu",
  "Aristotle",
  "Margaret Sangster",
  "Buddha",
  "Karen Clark",
]);
assert.deepStrictEqual(quotStringArray(quotes), [
  "Genius is one percent inspiration and ninety-nine percent perspiration.",
  "You can observe a lot just by watching.",
  "To invent, you need a good imagination and a pile of junk",
  "Difficulties increase the nearer we get to the goal.",
  "Fate is in your hands and no one elses",
  "Be the chief but never the lord.",
  "Nothing happens unless first we dream.",
  "Well begun is half done.",
  "Life is a learning experience, only if you learn.",
  "Self-complacency is fatal to progress.",
  "Peace comes from within. Do not seek it without.",
  "What you give is what you get.",
  "We can only learn to love by loving.",
  "Life is change. Growth is optional. Choose wisely.",
  "You'll see it when you believe it.",
]);

assert.deepStrictEqual(getQuotesContainingWord(quotes, "half"), [
  "Well begun is half done.",
]);

assert.deepStrictEqual(authorAndWork(quotes), [
  "Thomas Edison: Genius is one percent inspiration and ninety-nine percent perspiration.",
  "Yogi Berra: You can observe a lot just by watching.",
  "Thomas Edison: To invent, you need a good imagination and a pile of junk",
  "Yogi Berra: Difficulties increase the nearer we get to the goal.",
  "Byron Pulsifer: Fate is in your hands and no one elses",
  "Lao Tzu: Be the chief but never the lord.",
  "Byron Pulsifer: Nothing happens unless first we dream.",
  "Aristotle: Well begun is half done.",
  "Yogi Berra: Life is a learning experience, only if you learn.",
  "Margaret Sangster: Self-complacency is fatal to progress.",
  "Buddha: Peace comes from within. Do not seek it without.",
  "Byron Pulsifer: What you give is what you get.",
  "Lao Tzu: We can only learn to love by loving.",
  "Karen Clark: Life is change. Growth is optional. Choose wisely.",
  "Buddha: You'll see it when you believe it.",
]);

//! Task 14: Employees record
type Employees = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  salary: number;
};
const emplyee = [
  {
    firstName: "Molly",
    lastName: "Rojas",
    age: 38,
    email: "mollyrojas@plasmox.com",
    salary: 3065,
  },
  {
    firstName: "Marguerite",
    lastName: "Santiago",
    age: 27,
    email: "margueritesantiago@plasmox.com",
    salary: 2796,
  },
  {
    firstName: "Evelyn",
    lastName: "Oneil",
    age: 26,
    email: "evelynoneil@plasmox.com",
    salary: 3947,
  },
  {
    firstName: "Consuelo",
    lastName: "Case",
    age: 23,
    email: "consuelocase@plasmox.com",
    salary: 2819,
  },
  {
    firstName: "Earline",
    lastName: "Bush",
    age: 29,
    email: "earlinebush@plasmox.com",
    salary: 3494,
  },
  {
    firstName: "Sanford",
    lastName: "Hurley",
    age: 26,
    email: "sanfordhurley@plasmox.com",
    salary: 3068,
  },
  {
    firstName: "Todd",
    lastName: "Gomez",
    age: 33,
    email: "toddgomez@plasmox.com",
    salary: 3906,
  },
];

const salaryAbove30 = (emplyee: Employees[]): number => {
  return emplyee
    .filter((emp) => emp.age > 30)
    .reduce((accu, curr) => accu + curr.salary, 0);
};
assert.deepStrictEqual(salaryAbove30(emplyee), 6971);

const employeeFullName = (emplyee: Employees[]): string[] =>
  emplyee.map((emp) => `${emp.firstName} ${emp.lastName}`);

assert.deepStrictEqual(employeeFullName(emplyee), [
  "Molly Rojas",
  "Marguerite Santiago",
  "Evelyn Oneil",
  "Consuelo Case",
  "Earline Bush",
  "Sanford Hurley",
  "Todd Gomez",
]);

const employeeEmailid = (emplyee: Employees[]): string =>
  emplyee.map((emp) => emp.email).join(" , ");
assert.deepStrictEqual(
  employeeEmailid(emplyee),
  "mollyrojas@plasmox.com , margueritesantiago@plasmox.com , evelynoneil@plasmox.com , consuelocase@plasmox.com , earlinebush@plasmox.com , sanfordhurley@plasmox.com , toddgomez@plasmox.com",
);
