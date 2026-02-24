import { LinkedList, LinkedListInterface } from "./LinkedList";

export interface Stack<T> {
  //This is interface or an abstract of the implimented Stack
  readonly item: LinkedListInterface<T>;
  push(item: T): T;
  pop(): T | null;
  top(): T | null;
  size(): number;
}

/**
 * This class uses the Linkedlist DS implimented on other file to create a Stack DataStructure
 */
export class LinkedListStack<T> implements Stack<T> {
  readonly item: LinkedListInterface<T>;

  constructor() {
    this.item = new LinkedList<T>();
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

  size(): number {
    return this.item.length;
  }
}
