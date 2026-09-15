@file:JvmName("BestTimeToBuyAndSellStockWithCooldown")
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

package neetcode.dp2d

import neetcode.lib.eq

fun maxProfitWithCooldown(prices: IntArray): Int {
    var holding = Int.MIN_VALUE / 2 // /2 to leave headroom for the additions below
    var sold = Int.MIN_VALUE / 2
    var resting = 0

    for (price in prices) {
        val prevHolding = holding
        val prevSold = sold
        val prevResting = resting

        holding = maxOf(prevHolding, prevResting - price) // keep holding, or buy today
        sold = prevHolding + price // must have been holding
        resting = maxOf(prevResting, prevSold) // keep resting, or come off cooldown
    }
    return maxOf(sold, resting)
}

fun main() {
    eq(maxProfitWithCooldown(intArrayOf(1, 2, 3, 0, 2)), 3)
    eq(maxProfitWithCooldown(intArrayOf(1)), 0)
    eq(maxProfitWithCooldown(intArrayOf()), 0)
    eq(maxProfitWithCooldown(intArrayOf(2, 1)), 0, "never profitable")
    eq(maxProfitWithCooldown(intArrayOf(1, 2, 4)), 3, "one trade beats two with a cooldown")
    println("309 ok")
}
