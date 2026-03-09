import assert from "node:assert/strict";
//! Task 6: We want to add 10 to each number in an array of given numbers, and then filter out those that can be divided by 4.
/**
 * Adds 10 to each number in an array and filters out numbers divisible by 4.
 * @param numbersArray - The input array of numbers.
 * @returns A new array containing only numbers (after adding 10)
 * that are divisible by 4.
 */
const incrementAndFilterByFour = (numbersArray: number[]): number[] =>
  numbersArray.map((n) => n + 10).filter((n) => n % 4 === 0);
assert.deepStrictEqual(
  incrementAndFilterByFour([34, 45, 2, 53, 84, 542, 31, 23]),
  [44, 12, 552],
);
assert.deepStrictEqual(
  incrementAndFilterByFour([10, 22, 35, 46, 78, 90]),
  [20, 32, 56, 88, 100],
);

// ! Task 7: For the given array of indices, we need to return an array containing fibonacci numbers at those indices
/**
 * This is a function that returns a fibonacci value at a given index
 * @param index the input index to be passed
 * @returns the value at the index will be returned
 */
const fibonacci = (index: number): number => {
  if (index === 0) return 0;
  if (index === 1 || index === 2) return 1;
  let a = 0,
    b = 1;
  for (let i = 2; i <= index; i++) {
    const next = a + b;
    a = b;
    b = next;
  }
  return b;
};

/**
 * The function return a transformed array which contains fibonacci values for the corresponding indices
 * @param numbersArray enter the array of indices
 * @returns a array of numbers with corresponding fibonacci values
 */
const fibonacciAtIndices = (numbersArray: number[]): number[] =>
  numbersArray.map((index) => fibonacci(index));

assert.deepStrictEqual(fibonacciAtIndices([2, 1, 5, 7]), [1, 1, 5, 13]);
assert.deepStrictEqual(fibonacciAtIndices([0, 3, 4, 8]), [0, 2, 3, 21]);

//! Task 8: Extract Emails from the address text
/**
 * This function extracts email from the array of strings containing addresses
 * @param address the array of strings containing the address details
 * @returns the array of string that returns the extracted emails
 */
const extractEmail1 = (address: string[]): string[] => {
  return address
    .filter((mail) => /[A-Za-z0-9.-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}/.test(mail))
    .map((mail) => {
      const match = mail.match(/[A-Za-z0-9.-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}/);
      return match![0].toLowerCase();
    });
};
assert.deepStrictEqual(
  extractEmail1([
    "34, brighten street, email: BS@sft.com",
    "Behind hotel paragon, rode street, micHel@sun.it",
    "ulef court, cown street, email:cown@street",
    "CodeCraft",
  ]),
  ["bs@sft.com", "michel@sun.it"],
);
assert.deepStrictEqual(
  extractEmail1([
    "Contact: john.Doe@Example.com",
    "No email here",
    "Sales: sales-team@company.org",
    "Random text",
    "Support: SUPPORT@help.net",
  ]),
  ["john.doe@example.com", "sales-team@company.org", "support@help.net"],
);

//Varun's implimentation
/**
 * Extracts the valid emails from an array of emails
 * @param emails An array with emails
 * @returns Array of vaild emails
 */
export const extractEmails2 = (emails: string[]): string[] => {
  const emailRegex = /[a-z0-9._]+@[a-z]+\.[a-z](\.[a-z])?/i;

  return emails
    .filter((email) => email.match(emailRegex))
    .map((email) => email.toLowerCase());
};

//! Task 9: Extract the list of ages
type Person = {
  name: string;
  age: number;
};
/**
 * Extracts the ages from an array of Person objects.
 * @param agelist the list containg object is passed here
 * @returns a array of numbers is returned which is the extracted ages from the array
 */
const extractAge = (agelist: Person[]): number[] =>
  agelist.map((ages) => ages.age);

assert.deepStrictEqual(
  extractAge([
    {
      name: "John",
      age: 13,
    },
    {
      name: "Mark",
      age: 56,
    },
    {
      name: "Rachel",
      age: 45,
    },
    {
      name: "Nate",
      age: 67,
    },
    {
      name: "Jeniffer",
      age: 65,
    },
  ]),
  [13, 56, 45, 67, 65],
);
const peopleArray: Person[] = [
  { name: "John", age: 13 },
  { name: "Mark", age: 56 },
  { name: "Rachel", age: 45 },
];
assert.deepStrictEqual(extractAge(peopleArray), [13, 56, 45]);
//! List the sugar free food
type FoodItem = Record<string, string[]>;
const sugarFree = (foodList: FoodItem[]): string[] =>
  foodList
    .filter((food) => !Object.values(food)[0].includes("sugar"))
    .map((food) => Object.keys(food)[0]);

const getSpiceAndOil = (foodList: FoodItem[]): string[] =>
  foodList
    .filter((food) => {
      const ingredients = Object.values(food)[0];
      return ingredients.includes("chilli") && ingredients.includes("oil");
    })
    .map((food) => Object.keys(food)[0]);
type SafetyStatus = Record<string, "safe" | "unsafe">;
const foodSafeOrUnsafe = (foodList: FoodItem[]): SafetyStatus[] =>
  foodList.map((food) => {
    const [[name, ingredients]] = Object.entries(food);
    const status = ingredients.includes("sugar") ? "unsafe" : "safe";
    return { [name]: status };
  });
const foods: FoodItem[] = [
  { idli: ["rice", "urad", "oil", "cashew", "water"] },
  { chapathi: ["atta", "gluten", "water", "oil", "sugar"] },
  { pizza: ["maida", "sugar", "oil", "chilli", "flakes", "sauce"] },
  { "paneer masala": ["paneer", "onion", "tomato", "garlic", "oil"] },
];
assert.deepStrictEqual(sugarFree(foods), ["idli", "paneer masala"]);
assert.deepStrictEqual(getSpiceAndOil(foods), ["pizza"]);
assert.deepStrictEqual(foodSafeOrUnsafe(foods), [
  { idli: "safe" },
  { chapathi: "unsafe" },
  { pizza: "unsafe" },
  { "paneer masala": "safe" },
]);
