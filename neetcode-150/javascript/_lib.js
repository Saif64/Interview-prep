// Shared test helpers for the NeetCode 150 solutions.
// Kept dependency-free on purpose: `node <any-solution>.js` must just work.

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/** Build a linked list from an array. */
const toList = (arr) => {
  const dummy = new ListNode();
  let tail = dummy;
  for (const v of arr) tail = tail.next = new ListNode(v);
  return dummy.next;
};

/** Flatten a linked list back to an array. Stops after `limit` nodes so a cycle cannot hang a test. */
const fromList = (head, limit = 10000) => {
  const out = [];
  while (head && out.length < limit) {
    out.push(head.val);
    head = head.next;
  }
  return out;
};

/** Build a binary tree from LeetCode's level-order array format (null for a missing child). */
const toTree = (arr) => {
  if (!arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (i < arr.length) {
    const node = queue.shift();
    if (i < arr.length && arr[i] !== null) queue.push((node.left = new TreeNode(arr[i])));
    i++;
    if (i < arr.length && arr[i] !== null) queue.push((node.right = new TreeNode(arr[i])));
    i++;
  }
  return root;
};

/** Flatten a binary tree back to LeetCode's level-order array format, trailing nulls trimmed. */
const fromTree = (root) => {
  if (!root) return [];
  const out = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node) {
      out.push(node.val);
      queue.push(node.left, node.right);
    } else {
      out.push(null);
    }
  }
  while (out.length && out.at(-1) === null) out.pop();
  return out;
};


/**
 * Binary heap. JavaScript ships no priority queue, and writing one is a fair interview
 * question in its own right — so it lives here rather than being hand-rolled per problem.
 *
 * Pass a comparator: (a, b) => negative when `a` should come out first.
 * The default gives a min-heap over numbers; flip it for a max-heap.
 *
 *   push / pop  O(log n)
 *   peek / size O(1)
 *   heapify     O(n) via the constructor's optional `items`
 */
class Heap {
  constructor(compare = (a, b) => a - b, items = []) {
    this.compare = compare;
    this.items = [...items];
    for (let i = (this.items.length >> 1) - 1; i >= 0; i--) this._sink(i);
  }

  get size() {
    return this.items.length;
  }

  peek() {
    return this.items[0];
  }

  push(value) {
    this.items.push(value);
    this._swim(this.items.length - 1);
    return this;
  }

  pop() {
    if (!this.items.length) return undefined;
    const top = this.items[0];
    const last = this.items.pop();
    if (this.items.length) {
      this.items[0] = last;
      this._sink(0);
    }
    return top;
  }

  _swim(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.compare(this.items[i], this.items[parent]) >= 0) break;
      this._swap(i, parent);
      i = parent;
    }
  }

  _sink(i) {
    const n = this.items.length;
    for (;;) {
      const left = i * 2 + 1;
      const right = left + 1;
      let best = i;
      if (left < n && this.compare(this.items[left], this.items[best]) < 0) best = left;
      if (right < n && this.compare(this.items[right], this.items[best]) < 0) best = right;
      if (best === i) break;
      this._swap(i, best);
      i = best;
    }
  }

  _swap(a, b) {
    [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
  }
}

/** Compare two arrays ignoring order (and ignoring inner order, for arrays of arrays). */
const sorted = (arr) =>
  arr.map((x) => (Array.isArray(x) ? [...x].sort() : x)).sort((a, b) => String(a).localeCompare(String(b)));

module.exports = { ListNode, TreeNode, Heap, toList, fromList, toTree, fromTree, sorted };
