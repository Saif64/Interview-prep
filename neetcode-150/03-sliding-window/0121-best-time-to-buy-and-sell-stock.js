// 121. Best Time to Buy and Sell Stock — Easy
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
// Pattern: Sliding Window
// Time O(n) | Space O(1)
//
// Idea: track the cheapest price seen so far and the best profit against it.
// One pass, and it is really Kadane's algorithm wearing a different hat.

/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = (prices) => {
  let cheapest = Infinity;
  let best = 0;
  for (const price of prices) {
    if (price < cheapest) cheapest = price;
    else best = Math.max(best, price - cheapest);
  }
  return best;
};

module.exports = { maxProfit };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(maxProfit([7, 1, 5, 3, 6, 4]), 5);
  assert.strictEqual(maxProfit([7, 6, 4, 3, 1]), 0); // never profitable -> 0, not negative
  assert.strictEqual(maxProfit([]), 0);
  console.log('121 ok');
}
