import { LinkedList, LinkedListInterface } from "./LinkedList";

/**
 * This class uses the Linkedlist DS implemented on other file to create a Stack DataStructure
 */
export class Stack<T> {
  readonly items: LinkedListInterface<T>;

  constructor() {
    this.items = new LinkedList<T>();
  }

  push(item: T): T {
    return this.items.addAtHead(item);
  }

  pop(): T | null {
    const removedElement = this.items.removeFromHead();
    return removedElement;
  }

  top(): T | null {
    return this.items.headValue;
  }

  size(): number {
    return this.items.length;
  }
}
