import { describe, expect, it } from "vitest";
import { Stack } from "./Stack"; // Imported Stack interface

describe("Stack", () => {
  describe("Push operation", () => {
    it("add items to the top of the stack", () => {
      const stack = new Stack<string>();
      stack.push("base");
      stack.push("middle");
      stack.push("top");

      expect(stack.top()).toBe("top");
    });
  });

  describe("Pop operation", () => {
    it("remove and return the top item", () => {
      const stack = new Stack<number>();
      stack.push(10);
      stack.push(20);
      stack.push(30);

      expect(stack.pop()).toBe(30);
      expect(stack.pop()).toBe(20);
      expect(stack.top()).toBe(10);
    });

    it("return null when popping an empty stack", () => {
      const stack = new Stack<string>();
      expect(stack.pop()).toBe(null);
    });
  });

  describe("Top operation", () => {
    it("peek at the top element without removing it", () => {
      const stack = new Stack<string>();
      stack.push("stay");

      expect(stack.top()).toBe("stay");
      expect(stack.top()).toBe("stay");
    });

    it("return null for top() on an empty stack", () => {
      const stack = new Stack<number>();
      expect(stack.top()).toBe(null);
    });
  });

  describe("Size Operation", () => {
    it("Should return proper stack size", () => {
      const stack = new Stack<number>();
      stack.push(10);
      stack.push(20);
      stack.push(30);

      expect(stack.size()).toBe(3);
      stack.pop();
      expect(stack.size()).toBe(2);
      stack.push(40);
      stack.push(50);
      expect(stack.size()).toBe(4);
    });
  });
});
