import { createLinkedList, LinkedListInterface } from "./LinkedList";

export interface Stack<T> {
  //This is interface or an abstract of the implimented Stack
  readonly item: LinkedListInterface<T>;
  push(item: T): T;
  pop(): T | null;
  top(): T | null;
}

// This class uses the Linkedlist DS implimented on other file to create a Stack DataStructure
class LinkedListStack<T> implements Stack<T> {
  readonly item: LinkedListInterface<T>;
  constructor() {
    this.item = createLinkedList<T>();
  }
  push(item: T): T {
    return this.item.addAtHead(item);
  }
  pop(): T | null {
    let removedElement = this.item.removeFromHead();
    return removedElement;
  }
  top(): T | null {
    return this.item.headValue;
  }
}

/**
 * This is a special kind of function also called as a factory function which is used to create a new Stack
 * @returns returns a new stack
 */
export function createStack<T>(): Stack<T> {
  return new LinkedListStack<T>();
}
