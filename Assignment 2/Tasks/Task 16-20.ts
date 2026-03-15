import assert from "node:assert/strict";
//! task 16 Generate an array that contains first n natural numbers.  Then get us an object, that contains two keys, ‘odd’, and ‘even’.  Each of these keys will have values as  arrays of odd numbers and even numbers respectively.  How do you transform this result such that keys remain same, but values will be sums of odd numbers and even numbers?
const naturalNumbers = (n: number) =>
  Array.from({ length: n }, (_, i) => i + 1);

/**
 * Groups an array of numbers into odd and even categories.
 * @param nums An array of integers to be categorized.
 * @returns An object containing two arrays: 'odd' and 'even'.
 */
const grouped = (nums: number[]) =>
  nums.reduce(
    (acc, num) => {
      if (num % 2 === 0) {
        acc.even.push(num);
      } else {
        acc.odd.push(num);
      }
      return acc;
    },
    { odd: [] as number[], even: [] as number[] },
  );
assert.deepStrictEqual(grouped(naturalNumbers(10)), {
  odd: [1, 3, 5, 7, 9],
  even: [2, 4, 6, 8, 10],
});

//! task 17 Generate an array containing alphabets. Then produce an object that contain two keys, ‘vowels’ and 'consonants'. The values will be array of alphabets representing vowels and consonants.

const alpha: string[] = [];
for (let i = 97; i <= 122; ++i) {
  alpha.push(String.fromCharCode(i));
}
const isVowel = (char: string): boolean =>
  ["a", "e", "i", "o", "u"].includes(char);

/**
 * An object containing the alphabet partitioned into vowels and consonants.
 */
const groupedAlphabets = alpha.reduce<{
  vowels: string[];
  consonants: string[];
}>(
  (acc, char) => {
    if (isVowel(char)) {
      acc.vowels.push(char);
    } else {
      acc.consonants.push(char);
    }
    return acc;
  },
  { vowels: [], consonants: [] },
);

assert.deepStrictEqual(groupedAlphabets, {
  vowels: ["a", "e", "i", "o", "u"],
  consonants: [
    "b",
    "c",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "n",
    "p",
    "q",
    "r",
    "s",
    "t",
    "v",
    "w",
    "x",
    "y",
    "z",
  ],
});

//! task 18: Movie operations over a movie json file

type Movie = {
  title: string;
  year: number;
  cast: string[];
  genres?: string[];
};

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "..", "data", "movies.json");
const rawData = fs.readFileSync(filePath, "utf-8");

const moviesData: Movie[] = JSON.parse(rawData);

/**
 * Extracts a unique list of all actors across the entire movie dataset.
 * Uses map to isolate cast lists and reduce to flatten them.
 * @param movies The array of movie objects to process.
 * @returns A flat array of unique actor names.
 */
const getAllActors = (movies: Movie[]): string[] => {
  const cast = movies
    .map((movie) => movie.cast)
    .reduce((acc, currentCast) => {
      return acc.concat(currentCast);
    }, [] as string[]);

  return [...new Set(cast)];
};

/**
 * Groups movie titles by their release year, limiting the results to 3 movies per year.
 * @param movies The array of movie objects to process.
 * @returns An object where keys are years and values are arrays of up to 3 titles.
 */
const getMoviesByYear = (movies: Movie[]): Record<string, string[]> => {
  return movies.reduce(
    (acc, movie) => {
      const year = movie.year.toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      if (acc[year].length < 3) {
        acc[year].push(movie.title);
      }

      return acc;
    },
    {} as Record<string, string[]>,
  );
};
console.log(getAllActors(moviesData));
const result = getMoviesByYear(moviesData);

console.log(JSON.stringify(result, null, 4));

//! task 20: implimenting Map() and filter() using the reduce()

/**
 * Recreates the Array.map functionality using the reduce method.
 * Transforms each element in an array by applying a callback function.
 * @param array The source array to be transformed.
 * @param transform A function that defines the transformation for each element.
 * @returns A new array containing the transformed elements.
 */
const map = <T, U>(array: T[], transform: (item: T) => U): U[] => {
  return array.reduce((acc, item) => {
    acc.push(transform(item));
    return acc;
  }, [] as U[]);
};
assert.deepStrictEqual(
  map([1, 2, 3], (x) => x * 2),
  [2, 4, 6],
);

/**
 * Recreates the Array.filter functionality using the reduce method.
 * Creates a new array with all elements that pass the test implemented by the predicate function.
 * @param array The source array to be filtered.
 * @param predicate A function that returns true to keep the element, false otherwise.
 * @returns A new array containing only the elements that satisfied the predicate.
 */
const filter = <T>(array: T[], predicate: (item: T) => boolean): T[] => {
  return array.reduce((acc, item) => {
    if (predicate(item)) {
      acc.push(item);
    }
    return acc;
  }, [] as T[]);
};
assert.deepStrictEqual(
  filter(["apple", "banana", "cherry"], (s) => s.startsWith("b")),
  ["banana"],
);
