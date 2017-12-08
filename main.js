class LinkedList {
  constructor(limit) {
    this.head = null;
    this.tail = null;
    this.limit = limit;
    this.length = 0;
  }
  
  // Add to head since you want to know the last accessed
  add(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    if (++this.length > this.limit) {
      this.tail = this.tail.prev;
      this.length--;
    }
    return node;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class MemoryCache {
  constructor(limit) {
    this.cache = {};
    this.linkedlist = new LinkedList(limit);
  }

  access(id) {
    const node = this.cache[id];
    if (node) {
      const prevNode = node.prev;
      const nextNode = node.next;
      prevNode.next = nextNode;
      nextNode.prev = prevNode;
      this.linkedlist.head = node;
      return node.value;
    } else {
      return this.add(id);
    }
  }

  add(id) {
    const node = this.linkedlist.add(id);
    this.cache[id] = node;
    return node;
  }
}

/**
 * Bad tests
 */

const students = new MemoryCache(10);
const s1 = students.add(1);
const s2 = students.add(2);
const s3 = students.add(3);
const s4 = students.add(4);
console.log('Current head is ', students.linkedlist.head.value);
students.access(2);
console.log('Current head is ', students.linkedlist.head.value);
students.access(7);
console.log('Current head is ', students.linkedlist.head.value);
