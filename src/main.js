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

  moveToHead(node) {
    if (node === this.head) return;
    if (node === this.tail) {
      this.tail.prev.next = null;

      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;

      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
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

  accessLast() {
    return this.linkedlist.head.value;
  }

  access(id) {
    const node = this.cache[id];
    if (node) {
      this.linkedlist.moveToHead(node);
      return node.value;
    } else {
      return this.add(id).value;
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
const s0 = students.add(0);
const s1 = students.add(1);
console.log('Current head is', students.linkedlist.head.value);
const s2 = students.add(2);
console.log('Accessing student', students.access(2));
console.log('Current head is', students.linkedlist.head.value);
const s3 = students.add(3);
const s4 = students.add(4);
const s5 = students.add(5);
const s6 = students.add(6);
const s7 = students.add(7);
const s8 = students.add(8);
const s9 = students.add(9);
console.log('Current head is', students.linkedlist.head.value);
console.log('Accessing student', students.access(7));
console.log('Current head is', students.linkedlist.head.value);
console.log('Accessing student', students.access(9));
console.log('Current head is', students.linkedlist.head.value);
