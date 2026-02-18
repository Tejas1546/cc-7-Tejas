import { describe, expect, it } from "vitest";
import { createStack, Stack } from "./Stack"; // Imported Stack interface

describe("Stack", () => {
  describe("Push operation", () => {
    it("add items to the top of the stack", () => {
      const stack: Stack<string> = createStack<string>();
      stack.push("base");
      stack.push("middle");
      stack.push("top");

      expect(stack.top()).toBe("top");
    });
  });

  describe("Pop operation", () => {
    it("remove and return the top item", () => {
      const stack: Stack<number> = createStack<number>();
      stack.push(10);
      stack.push(20);
      stack.push(30);

      expect(stack.pop()).toBe(30);
      expect(stack.pop()).toBe(20);
      expect(stack.top()).toBe(10);
    });

    it("return null when popping an empty stack", () => {
      const stack: Stack<string> = createStack<string>();
      expect(stack.pop()).toBe(null);
    });
  });

  describe("Top operation", () => {
    it("peek at the top element without removing it", () => {
      const stack: Stack<string> = createStack<string>();
      stack.push("stay");

      expect(stack.top()).toBe("stay");
      expect(stack.top()).toBe("stay");
    });

    it("return null for top() on an empty stack", () => {
      const stack: Stack<number> = createStack<number>();
      expect(stack.top()).toBe(null);
    });
  });

  describe("Underlying LinkedList Access", () => {
    it("allow access to the internal item list length", () => {
      const stack: Stack<number> = createStack<number>();
      stack.push(1);
      stack.push(2);
      stack.push(3);

      // This works because 'item' is defined in the Stack interface
      expect(stack.item.length).toBe(3);
    });
  });
});
