// 787. Cheapest Flights Within K Stops — Medium
// https://leetcode.com/problems/cheapest-flights-within-k-stops/
// Pattern: Advanced Graphs (Bellman-Ford)
// Time O(k * E) | Space O(V)
//
// Idea: plain Dijkstra is wrong here — the cheapest route may use too many stops, and the
// one it discards might be the only legal one. Bellman-Ford relaxes all edges k + 1 times,
// so after round i the costs are exactly "best price using at most i flights".
// Relaxing from a *snapshot* of the previous round is essential; updating in place would
// let one round chain several flights together.

/**
 * @param {number} n
 * @param {number[][]} flights  [from, to, price]
 * @param {number} src
 * @param {number} dst
 * @param {number} k  maximum stops (so k + 1 flights)
 * @return {number} cheapest price, or -1
 */
const findCheapestPrice = (n, flights, src, dst, k) => {
  let costs = new Array(n).fill(Infinity);
  costs[src] = 0;

  for (let round = 0; round <= k; round++) {
    const snapshot = [...costs];
    for (const [from, to, price] of flights) {
      if (snapshot[from] === Infinity) continue;
      if (snapshot[from] + price < costs[to]) costs[to] = snapshot[from] + price;
    }
  }
  return costs[dst] === Infinity ? -1 : costs[dst];
};

module.exports = { findCheapestPrice };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(
    findCheapestPrice(4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 1),
    700
  );
  assert.strictEqual(findCheapestPrice(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1), 200);
  // Same graph, no stops allowed: the two-hop bargain is illegal, so the direct flight wins.
  assert.strictEqual(findCheapestPrice(3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 0), 500);
  assert.strictEqual(findCheapestPrice(2, [[0, 1, 10]], 1, 0, 5), -1); // no route back
  assert.strictEqual(findCheapestPrice(1, [], 0, 0, 0), 0);
  console.log('787 ok');
}
