// 332. Reconstruct Itinerary — Hard
// https://leetcode.com/problems/reconstruct-itinerary/
// Pattern: Advanced Graphs (Hierholzer's algorithm)
// Time O(E log E) | Space O(E)
//
// Idea: use every ticket exactly once — an Eulerian path. Plain greedy "always take the
// smallest airport" gets stuck in dead ends, so Hierholzer's trick is to only add an airport
// to the route once it has no tickets left, then reverse at the end. Sorting each
// destination list descending lets `pop()` take the lexicographically smallest in O(1).

/**
 * @param {string[][]} tickets  [from, to]
 * @return {string[]}
 */
const findItinerary = (tickets) => {
  const destinations = new Map();
  for (const [from, to] of tickets) {
    if (!destinations.has(from)) destinations.set(from, []);
    destinations.get(from).push(to);
  }
  for (const list of destinations.values()) list.sort().reverse(); // pop() => smallest

  const route = [];
  const stack = ['JFK'];
  while (stack.length) {
    const airport = stack.at(-1);
    const next = destinations.get(airport);
    if (next?.length) stack.push(next.pop());
    else route.push(stack.pop()); // stuck here: this airport belongs at the end
  }
  return route.reverse();
};

module.exports = { findItinerary };

if (require.main === module) {
  const assert = require('node:assert');
  assert.deepStrictEqual(
    findItinerary([['MUC', 'LHR'], ['JFK', 'MUC'], ['SFO', 'SJC'], ['LHR', 'SFO']]),
    ['JFK', 'MUC', 'LHR', 'SFO', 'SJC']
  );
  // The greedy choice (ATL first) would strand the traveller; Hierholzer's handles it.
  assert.deepStrictEqual(
    findItinerary([['JFK', 'SFO'], ['JFK', 'ATL'], ['SFO', 'ATL'], ['ATL', 'JFK'], ['ATL', 'SFO']]),
    ['JFK', 'ATL', 'JFK', 'SFO', 'ATL', 'SFO']
  );
  assert.deepStrictEqual(findItinerary([['JFK', 'KUL'], ['JFK', 'NRT'], ['NRT', 'JFK']]), [
    'JFK', 'NRT', 'JFK', 'KUL',
  ]);
  assert.deepStrictEqual(findItinerary([['JFK', 'AAA']]), ['JFK', 'AAA']);
  console.log('332 ok');
}
