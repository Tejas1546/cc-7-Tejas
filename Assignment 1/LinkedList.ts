export class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null,
  ) {}
}

//This is interface or an abstract of the implimented Linkedlist
export interface LinkedListInterface<T> {
  readonly headValue: T | null;
  readonly tailValue: T | null;
  readonly length: number;

  addAtEnd(t: T): T;
  removeFromEnd(): T | null;
  addAtHead(t: T): T;
  removeFromHead(): T | null;
  searchFor(t: T, compFun?: (v: T, other: T) => boolean): T | null;
}

/**
 * Here the actual class and its methods are being implimented
 */
export class LinkedList<T> implements LinkedListInterface<T> {
  #head: ListNode<T> | null = null;
  #tail: ListNode<T> | null = null;
  #count: number = 0;

  get headValue(): T | null {
    return this.#head ? this.#head.value : null;
  }

  get tailValue(): T | null {
    return this.#tail ? this.#tail.value : null;
  }

  get length(): number {
    return this.#count;
  }

  addAtEnd(t: T): T {
    const newNode = new ListNode(t);
    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      this.#tail!.next = newNode;
      this.#tail = newNode;
    }
    this.#count++;
    return t;
  }

  removeFromEnd(): T | null {
    if (!this.#head) return null;
    const removedElement = this.#tail!.value;
    if (this.#head === this.#tail) {
      this.#head = null;
      this.#tail = null;
    } else {
      let current: ListNode<T> = this.#head;
      while (current.next !== this.#tail) {
        current = current.next!;
      }
      current.next = null;
      this.#tail = current;
    }
    this.#count--;
    return removedElement;
  }

  addAtHead(t: T): T {
    const newNode = new ListNode(t);
    if (!this.#head) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      newNode.next = this.#head;
      this.#head = newNode;
    }
    this.#count++;
    return t;
  }

  removeFromHead(): T | null {
    if (!this.#head) return null;
    const removedElement = this.#head.value;
    this.#head = this.#head.next;
    if (!this.#head) {
      this.#tail = null;
    }
    this.#count--;
    return removedElement;
  }

  searchFor(t: T, compFun?: (v: T, other: T) => boolean): T | null {
    let current = this.#head;
    const comparator = compFun ?? ((a: T, b: T) => a === b);

    while (current) {
      if (comparator(current.value, t)) {
        return current.value;
      }
      current = current.next;
    }
    return null;
  }
}
