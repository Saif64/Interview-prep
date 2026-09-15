// 2013. Detect Squares — Medium
// https://leetcode.com/problems/detect-squares/
// Pattern: Math & Geometry
// Time: add O(1), count O(n) | Space O(n)
//
// Idea: given a query point, iterate over stored points that could be its DIAGONAL opposite
// — same absolute dx and dy, and non-zero (a square has positive area). The other two
// corners are then fully determined, so multiply their counts.
// Points may repeat, so store multiplicities and multiply rather than just checking presence.

class DetectSquares {
  constructor() {
    this.counts = new Map(); // "x,y" -> multiplicity
    this.points = [];
  }

  /** @param {number[]} point */
  add([x, y]) {
    const key = `${x},${y}`;
    this.counts.set(key, (this.counts.get(key) ?? 0) + 1);
    this.points.push([x, y]);
  }

  /**
   * @param {number[]} point
   * @return {number}
   */
  count([qx, qy]) {
    let total = 0;
    for (const [px, py] of this.points) {
      const dx = Math.abs(px - qx);
      if (dx === 0 || dx !== Math.abs(py - qy)) continue; // not a diagonal partner
      total +=
        (this.counts.get(`${px},${qy}`) ?? 0) * (this.counts.get(`${qx},${py}`) ?? 0);
    }
    return total;
  }
}

module.exports = { DetectSquares };

if (require.main === module) {
  const assert = require('node:assert');
  const d = new DetectSquares();
  d.add([3, 10]);
  d.add([11, 2]);
  d.add([3, 2]);
  assert.strictEqual(d.count([11, 10]), 1);
  assert.strictEqual(d.count([14, 8]), 0);
  d.add([11, 2]); // duplicate point doubles the count
  assert.strictEqual(d.count([11, 10]), 2);

  const empty = new DetectSquares();
  assert.strictEqual(empty.count([0, 0]), 0);

  // Degenerate "square" of zero area must not be counted.
  const zero = new DetectSquares();
  zero.add([0, 0]);
  zero.add([0, 0]);
  assert.strictEqual(zero.count([0, 0]), 0);
  console.log('2013 ok');
}
