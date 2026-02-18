import { describe, expect, it } from "vitest";
// Import the factory function and the interface
import { createLinkedList, LinkedListInterface } from "./LinkedList";

describe("LinkedList", () => {
  describe("Add node at the end", () => {
    it("Adding node to the end", () => {
      const linkedlist: LinkedListInterface<string> =
        createLinkedList<string>();
      linkedlist.addAtEnd("first");
      linkedlist.addAtEnd("second");
      linkedlist.addAtEnd("third");

      expect(linkedlist.headValue).toBe("first");
      expect(linkedlist.tailValue).toBe("third");
      expect(linkedlist.length).toBe(3);
    });
  });

  describe("Remove the node from the end", () => {
    it("Removing node '3' and '2' from the end", () => {
      const linkedlist: LinkedListInterface<number> =
        createLinkedList<number>();
      linkedlist.addAtEnd(1);
      linkedlist.addAtEnd(2);
      linkedlist.addAtEnd(3);

      expect(linkedlist.tailValue).toBe(3);

      linkedlist.removeFromEnd();
      expect(linkedlist.tailValue).toBe(2);

      linkedlist.removeFromEnd();
      expect(linkedlist.tailValue).toBe(1);
    });
  });

  describe("Add node to the head", () => {
    it("Adding a '3' node to the head", () => {
      const linkedlist: LinkedListInterface<number> =
        createLinkedList<number>();
      linkedlist.addAtHead(1);
      linkedlist.addAtHead(2);

      expect(linkedlist.headValue).toBe(2);
      linkedlist.addAtHead(3);
      expect(linkedlist.headValue).toBe(3);
    });
  });

  describe("Remove node from the head", () => {
    it("Removing the 'new' node from the head", () => {
      const linkedlist: LinkedListInterface<string> =
        createLinkedList<string>();
      linkedlist.addAtHead("first");
      linkedlist.addAtEnd("last");
      linkedlist.addAtHead("new");

      expect(linkedlist.headValue).toBe("new");
      linkedlist.removeFromHead();
      expect(linkedlist.headValue).toBe("first");
    });
  });

  describe("Search for node", () => {
    it("Search for a node 'titan' in the list", () => {
      const linkedlist: LinkedListInterface<string> =
        createLinkedList<string>();
      linkedlist.addAtHead("bronze");
      linkedlist.addAtHead("silver");
      linkedlist.addAtHead("gold");
      linkedlist.addAtHead("crystal");
      linkedlist.addAtHead("titan");
      linkedlist.addAtHead("epic");

      expect(linkedlist.searchFor("titan")).toBe("titan");
      expect(linkedlist.searchFor("gold")).toBe("gold");
      expect(linkedlist.searchFor("champion")).toBe(null);
    });
  });

  describe("Check list length", () => {
    it("Should return the correct length of the list", () => {
      const linkedlist: LinkedListInterface<number> =
        createLinkedList<number>();
      linkedlist.addAtHead(11);
      linkedlist.addAtHead(22);
      linkedlist.addAtHead(33);
      linkedlist.addAtHead(44);
      linkedlist.addAtHead(55);
      linkedlist.addAtHead(66);

      expect(linkedlist.length).toBe(6);
    });
  });
});
