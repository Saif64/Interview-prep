// 309. Best Time to Buy and Sell Stock with Cooldown — Medium
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
// Pattern: 2-D DP (state machine)
// Time O(n) | Space O(1)
//
// Idea: model it as three states and step them day by day:
//   holding  - own a share
//   sold     - sold today, so tomorrow is a cooldown
//   resting  - own nothing and free to buy
// Each day's values depend only on yesterday's, so read from a snapshot.
// Drawing the state machine first makes this class of problem mechanical.

/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = (prices) => {
  let holding = -Infinity;
  let sold = -Infinity;
  let resting = 0;

  for (const price of prices) {
    const prevHolding = holding;
    const prevSold = sold;
    const prevResting = resting;

    holding = Math.max(prevHolding, prevResting - price); // keep holding, or buy today
    sold = prevHolding + price; // must have been holding
    resting = Math.max(prevResting, prevSold); // keep resting, or come off cooldown
  }
  return Math.max(sold, resting);
};

module.exports = { maxProfit };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(maxProfit([1, 2, 3, 0, 2]), 3);
  assert.strictEqual(maxProfit([1]), 0);
  assert.strictEqual(maxProfit([]), 0);
  assert.strictEqual(maxProfit([2, 1]), 0); // never profitable
  assert.strictEqual(maxProfit([1, 2, 4]), 3); // one trade beats two with a cooldown
  console.log('309 ok');
}
