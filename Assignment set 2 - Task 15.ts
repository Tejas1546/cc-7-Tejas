import assert from "node:assert/strict";
//! Task 15
const diet: Diet[] = [
  {
    name: "Banana",
    type: "fruit",
    treats: [
      "constipation",
      "vitamin deficiency",
      "skin issues",
      "sleep problems",
    ],
    nutritions: {
      protein: 8,
      carbs: 40,
      sugar: 30,
      vitamins: 45,
    },
  },
  {
    name: "Badam",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "sugar"],
    nutritions: {
      protein: 18,
      carbs: 20,
      sugar: 20,
      vitamins: 65,
    },
  },
  {
    name: "Cashew",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "bone issues"],
    nutritions: {
      protein: 22,
      carbs: 22,
      vitamins: 60,
    },
  },
  {
    name: "Wallnut",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "bone issues"],
    nutritions: {
      protein: 33,
      carbs: 26,
      vitamins: 64,
    },
  },
  {
    name: "Apple",
    type: "fruit",
    treats: ["heart problems", "skin issues", "bone issues", "migraine"],
    nutritions: {
      protein: 22,
      carbs: 22,
      vitamins: 60,
    },
  },
];

type Fon = "fruit" | "nut";

type Issues =
  | "heart problems"
  | "skin issues"
  | "bone issues"
  | "migraine"
  | "protein deficiency"
  | "bp"
  | "sugar"
  | "constipation"
  | "vitamin deficiency"
  | "sleep problems";

type Diet = {
  name: string;
  type: Fon;
  treats: Issues[];
  nutritions: {
    protein?: number;
    vitamins?: number;
    carbs?: number;
    sugar?: number;
  };
};
//function that will generate an object that will contain a key for each nutrition, and the value should be a fruit or nut that has highest content of that nutrition. If there is a tie, choose  the first one.

/**
 * the getHighestNutrient() is used to extract the items which has heighest nutrietion in the set
 * @param diet intakes all the defined diet which is in the format Diet[]
 * @returns the fruit or nut having heighest nutrient
 */
const getHighestNutrient = (diet: Diet[]): Record<string, string> => {
  const highest = diet.reduce(
    (acc, curr) => {
      Object.keys(curr.nutritions).forEach((nutrient) => {
        const key = nutrient as keyof Diet["nutritions"];
        const value = curr.nutritions[key];

        if (value !== undefined) {
          if (!acc[nutrient] || value > acc[nutrient].value) {
            acc[nutrient] = { name: curr.name, value };
          }
        }
      });
      return acc;
    },
    {} as Record<string, { name: string; value: number }>,
  );
  return Object.keys(highest).reduce(
    (final, nutrient) => {
      final[nutrient] = highest[nutrient].name;
      return final;
    },
    {} as Record<string, string>,
  );
};
assert.deepStrictEqual(getHighestNutrient(diet), {
  protein: "Wallnut",
  carbs: "Banana",
  sugar: "Banana",
  vitamins: "Badam",
});

//Get an array of all unique nutritions that are present in all the fruits and nuts above
/**
 * The getUniqueNutrients() returns all the nutrients available in the diet object
 * @param data intakes all the defined diet which is in the format Diet[]
 * @returns gets all the nutrients listed
 */
const getUniqueNutrients = (data: Diet[]): string[] => {
  return data
    .map((item) => Object.keys(item.nutritions))
    .reduce((acc, keys) => {
      keys.forEach((key) => {
        if (!acc.includes(key)) {
          acc.push(key);
        }
      });
      return acc;
    });
};
assert.deepStrictEqual(getUniqueNutrients(diet), [
  "protein",
  "carbs",
  "sugar",
  "vitamins",
]);

//Get an array of all unique health conditions that the fruits treat.
/**
 * The fruitTreats() is a function that returns the diseases that are treatable by fruits
 * @param diet intakes all the defined diet which is in the format Diet[]
 * @returns the diseases that are treatable by fruits
 */
const fruitTreats = (diet: Diet[]) => {
  return diet
    .filter((item) => item.type === "fruit")
    .map((item) => item.treats)
    .reduce((acc, curr) => {
      curr.forEach((condi) => {
        if (!acc.includes(condi)) {
          acc.push(condi);
        }
      });
      return acc;
    });
};
assert.deepStrictEqual(fruitTreats(diet), [
  "constipation",
  "vitamin deficiency",
  "skin issues",
  "sleep problems",
  "heart problems",
  "bone issues",
  "migraine",
]);

//Get the array of all common health conditions that are treated by  all nuts.
/**
 * The commonNuts() is a function that returns the diseases that common and are treatable by nuts
 * @param diet intakes all the defined diet which is in the format Diet[]
 * @returns the common diseases that are treatable by nuts
 */
const commonNuts = (diet: Diet[]) => {
  const nuts = diet.filter((item) => item.type === "nut");
  return nuts.reduce((acc, curr) => {
    return acc.filter((condi) => curr.treats.includes(condi));
  }, nuts[0].treats);
};
assert.deepStrictEqual(commonNuts(diet), [
  "bp",
  "protein deficiency",
  "skin issues",
]);

//Get a modified array of the fruits and nuts, where a new key called, totalNutritions get added to each object.  Total nutritions is nothing but the total of the values of the nutritions keys.

/**
 * sums up the total diet value in the available objects
 */
const totalDietValue = diet.map((item) => {
  const nutriValue = Object.values(item.nutritions);
  const total = nutriValue.reduce((acc, cur) => acc + (cur || 0), 0);
  return { ...item, totalNurtirient: total };
});

assert.deepStrictEqual(totalDietValue, [
  {
    name: "Banana",
    type: "fruit",
    treats: [
      "constipation",
      "vitamin deficiency",
      "skin issues",
      "sleep problems",
      "heart problems",
      "bone issues",
      "migraine",
    ],
    nutritions: { protein: 8, carbs: 40, sugar: 30, vitamins: 45 },
    totalNurtirient: 123,
  },
  {
    name: "Badam",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "sugar"],
    nutritions: { protein: 18, carbs: 20, sugar: 20, vitamins: 65 },
    totalNurtirient: 123,
  },
  {
    name: "Cashew",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "bone issues"],
    nutritions: { protein: 22, carbs: 22, vitamins: 60 },
    totalNurtirient: 104,
  },
  {
    name: "Wallnut",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "bone issues"],
    nutritions: { protein: 33, carbs: 26, vitamins: 64 },
    totalNurtirient: 123,
  },
  {
    name: "Apple",
    type: "fruit",
    treats: ["heart problems", "skin issues", "bone issues", "migraine"],
    nutritions: { protein: 22, carbs: 22, vitamins: 60 },
    totalNurtirient: 104,
  },
]);

//Find the total nutrition value of all fruits and nuts
/**
 * sums up the total diet value in the available whole object
 */
const grandTotal = totalDietValue.reduce((acc, item) => {
  return acc + item.totalNurtirient;
}, 0);
assert.deepStrictEqual(grandTotal, 577);

//Which fruits  / nuts solve the bone issues?
/**
 * returns the array of fruits and nuts that treats bone issues
 */
const boneSolve = diet
  .filter((item) => item.treats.includes("bone issues"))
  .map((item) => item.name);
assert.deepStrictEqual(boneSolve, ["Banana", "Cashew", "Wallnut", "Apple"]);

//Which fruit or nut has maximum nutrition types ( like different type of nutritions)?
/**
 * returns the item with highest nutrientional value in the whole object
 */
const maxNutri = diet.reduce((acc, curr) => {
  const count = Object.keys(curr.nutritions).length;
  const maxCount = Object.keys(acc.nutritions).length;
  return count > maxCount ? curr : acc;
});
assert.deepEqual(maxNutri.name, "Banana");

//Which fruits or nuts solve migraine and have vitamins greater than or equal to 60
/**
 * returns the item which can treat migrain and also has vitamins
 */
const vitaminsAndMigr = diet.filter((item) => {
  const migraine = item.treats.includes("migraine");
  const highVitamins = item.nutritions.vitamins! >= 60;
  return migraine && highVitamins;
});
const vitaminsAndMigr1 = vitaminsAndMigr.map((item) => item.name);
assert.deepStrictEqual(vitaminsAndMigr1, ["Apple"]);

//Which fruit or nut has lowest carbs? (Ignore the fruits/nuts that don't have carbs in the first place)
/**
 * returns the item hta thas the lowest carbs
 */
const lowestCarb = diet
  .filter((item) => item.nutritions.carbs! > 0)
  .reduce((acc, curr) => {
    return curr.nutritions.carbs! < acc.nutritions.carbs! ? curr : acc;
  }).name;
assert.deepStrictEqual(lowestCarb, "Badam");

//What is the total amount of proteins I will end up intaking if I eat each of the nuts except nuts those do not solve sugar issues as doctor has warned that my skin will become pale in case I eat such nuts?

/**
 * returns the total protein intake by consuming the items that can solve sugar issues
 */
const proteInIntake = diet
  .filter((item) => item.treats.includes("sugar"))
  .reduce((acc, curr) => {
    return acc + (curr.nutritions.protein! || 0);
  }, 0);
assert.deepStrictEqual(proteInIntake, 18);

//If I eat one fruit and nut  each from the all fruits and nuts available in the above list, what is the quantity of vitamins I will end up intaking? Doctor has asked me to avoid fruit containing any sugar in it.
/**
 * returns the vitamins intake value by eating 1 fruit and 1 nut in the list and also does not contain sugar in it
 */
const totalVitemins = diet
  .filter((item) => {
    if (item.type === "fruit") {
      return !item.nutritions.sugar || item.nutritions.sugar === 0;
    }
    return true;
  })
  .reduce((acc, curr) => {
    return acc + (curr.nutritions.vitamins || 0);
  }, 0);
assert.deepStrictEqual(totalVitemins, 249);
