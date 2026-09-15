@file:JvmName("BestTimeToBuyAndSellStock")
// 121. Best Time to Buy and Sell Stock — Easy
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
// Pattern: Sliding Window
// Time O(n) | Space O(1)
//
// Idea: track the cheapest price seen so far and the best profit against it.
// One pass, and it is really Kadane's algorithm wearing a different hat.

package neetcode.slidingwindow

import neetcode.lib.eq

fun maxProfit(prices: IntArray): Int {
    var cheapest = Int.MAX_VALUE
    var best = 0
    for (price in prices) {
        if (price < cheapest) cheapest = price else best = maxOf(best, price - cheapest)
    }
    return best
}

fun main() {
    eq(maxProfit(intArrayOf(7, 1, 5, 3, 6, 4)), 5)
    eq(maxProfit(intArrayOf(7, 6, 4, 3, 1)), 0, "never profitable -> 0, not negative")
    eq(maxProfit(intArrayOf()), 0)
    println("121 ok")
}
