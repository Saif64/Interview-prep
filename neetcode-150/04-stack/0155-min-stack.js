// 155. Min Stack — Medium
// https://leetcode.com/problems/min-stack/
// Pattern: Stack
// Time O(1) per operation | Space O(n)
//
// Idea: a parallel stack storing "the minimum as of this push". Popping the main stack
// pops the mirror too, so the minimum is restored automatically — no rescanning.

class MinStack {
  constructor() {
    this.stack = [];
    this.mins = [];
  }

  /** @param {number} val */
  push(val) {
    this.stack.push(val);
    this.mins.push(this.mins.length ? Math.min(val, this.mins.at(-1)) : val);
  }

  pop() {
    this.mins.pop();
    return this.stack.pop();
  }

  /** @return {number} */
  top() {
    return this.stack.at(-1);
  }

  /** @return {number} */
  getMin() {
    return this.mins.at(-1);
  }
}

module.exports = { MinStack };

if (require.main === module) {
  const assert = require('node:assert');
  const s = new MinStack();
  s.push(-2);
  s.push(0);
  s.push(-3);
  assert.strictEqual(s.getMin(), -3);
  s.pop();
  assert.strictEqual(s.top(), 0);
  assert.strictEqual(s.getMin(), -2); // the old minimum comes back
  s.push(-2);
  assert.strictEqual(s.getMin(), -2);
  s.pop();
  assert.strictEqual(s.getMin(), -2); // duplicate minima must not be lost
  console.log('155 ok');
}
