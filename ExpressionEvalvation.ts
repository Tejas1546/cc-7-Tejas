import { createStack } from "./Stack";

/**
 * The function here is used to find the precedence of an operator
 * @param op This takes in 'op' the operator as the input
 * @returns Returns the particular precedence of that operator as the output
 */
function precedence(op: string): number {
  if (op === "+" || op === "-") return 1;
  if (op === "*" || op === "/") return 2;
  return 0;
}

/**
 * the function is used to calculate the result... it takes in 2 numbers and a operator as input and calculates a mathematical result
 * @param a takes in the left operand for input
 * @param b takes in the right operand for input
 * @param op takes in the actual operator
 * @returns return a resultant number
 */
function calculate(a: number, b: number, op: string): number {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) throw new Error("Division by zero");
      return a / b;
    default:
      throw new Error("Invalid operator");
  }
}

/**
 * this function evaluates the mathematical expression according to the BODMAS rule and gives out the proper result
 * @param expression the user expression is inputed here
 * @returns returns a resulting number if the expression is valid else a error is thrown
 */
export function evaluate(expression: string): number {
  let value = createStack<number>();
  let operator = createStack<string>();
  let i = 0;
  while (i < expression.length) {
    let ch = expression[i];
    if (ch === " ") {
      i++;
      continue;
    }
    if (!isNaN(Number(ch))) {
      let num = "";
      while (i < expression.length && !isNaN(Number(expression[i]))) {
        num += expression[i];
        i++;
      }
      value.push(Number(num));
      continue;
    }
    if (ch === "(") {
      operator.push(ch);
    } else if (ch === ")") {
      while (operator.top() !== "(") {
        let b = value.pop();
        let a = value.pop();
        let op = operator.pop();
        if (a === null || b === null || op === null) {
          throw new Error("Invalid Expression");
        }
        value.push(calculate(a, b, op));
      }
      operator.pop();
    } else {
      while (
        operator.top() !== null &&
        precedence(operator.top() as string) >= precedence(ch)
      ) {
        let b = value.pop();
        let a = value.pop();
        let op = operator.pop();
        if (a === null || b === null || op === null) {
          throw new Error("Invalid Expression");
        }
        value.push(calculate(a, b, op));
      }
      operator.push(ch);
    }
    i++;
  }
  while (operator.top() !== null) {
    let b = value.pop();
    let a = value.pop();
    let op = operator.pop();
    if (a === null || b === null || op === null) {
      throw new Error("Invalid Expression");
    }
    value.push(calculate(a, b, op));
  }
  let result = value.pop();
  if (result === null) throw new Error("Invalid Expression");
  return result;
}
