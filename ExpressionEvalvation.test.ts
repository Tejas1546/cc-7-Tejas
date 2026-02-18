import { describe, it, expect } from "vitest";
import { evaluate } from "./ExpressionEvalvation";

describe("Expression Evaluator using Stack", () => {
  it("should evaluate simple addition", () => {
    expect(evaluate("2+3")).toBe(5);
  });

  it("should respect operator precedence", () => {
    expect(evaluate("2+3*4")).toBe(14);
  });

  it("should evaluate parentheses correctly", () => {
    expect(evaluate("(2+3)*4")).toBe(20);
  });

  it("should evaluate multi-digit numbers", () => {
    expect(evaluate("12+8")).toBe(20);
  });

  it("should evaluate complex expression", () => {
    expect(evaluate("10+(2*3)-4")).toBe(12);
  });

  it("should handle division", () => {
    expect(evaluate("20/5")).toBe(4);
  });

  it("should throw error for division by zero", () => {
    expect(() => evaluate("10/0")).toThrow();
  });

  it("should throw error for invalid expression", () => {
    expect(() => evaluate("2+")).toThrow();
  });
});
