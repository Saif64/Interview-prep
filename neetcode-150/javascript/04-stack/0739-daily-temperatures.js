// 739. Daily Temperatures — Medium
// https://leetcode.com/problems/daily-temperatures/
// Pattern: Stack (monotonic)
// Time O(n) | Space O(n)
//
// Idea: the canonical "next greater element". Hold indices of days still waiting for a
// warmer day; a warmer day resolves all of them at once. Each index is pushed and popped
// once, so the nested loop is still linear overall.

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
const dailyTemperatures = (temperatures) => {
  const out = new Array(temperatures.length).fill(0);
  const stack = []; // indices, temperatures decreasing

  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[stack.at(-1)] < temperatures[i]) {
      const day = stack.pop();
      out[day] = i - day;
    }
    stack.push(i);
  }
  return out; // whatever is left never warmed up, and stays 0
};

module.exports = { dailyTemperatures };

if (require.main === module) {
  const assert = require('node:assert');
  assert.deepStrictEqual(
    dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]),
    [1, 1, 4, 2, 1, 1, 0, 0]
  );
  assert.deepStrictEqual(dailyTemperatures([30, 40, 50, 60]), [1, 1, 1, 0]);
  assert.deepStrictEqual(dailyTemperatures([30, 30, 30]), [0, 0, 0]); // ties are not warmer
  console.log('739 ok');
}
