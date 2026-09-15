@file:JvmName("CoinChangeII")
// 518. Coin Change II — Medium
// https://leetcode.com/problems/coin-change-ii/
// Pattern: 2-D DP (unbounded knapsack, counting)
// Time O(amount * coins) | Space O(amount)
//
// Idea: count COMBINATIONS, not permutations. Loop order is the whole answer: coins outside,
// amounts inside. That way each coin is fully considered before the next, so {1,2} is counted
// once instead of as both 1+2 and 2+1. Swapping the loops counts permutations — a different
// (also common) problem.

package neetcode.dp2d

import neetcode.lib.eq

fun change(amount: Int, coins: IntArray): Int {
    val dp = IntArray(amount + 1)
    dp[0] = 1

    for (coin in coins) {
        for (a in coin..amount) dp[a] += dp[a - coin]
    }
    return dp[amount]
}

fun main() {
    eq(change(5, intArrayOf(1, 2, 5)), 4)
    eq(change(3, intArrayOf(2)), 0)
    eq(change(10, intArrayOf(10)), 1)
    eq(change(0, intArrayOf(1, 2)), 1, "exactly one way: take nothing")
    eq(change(4, intArrayOf(1, 2, 3)), 4, "1111, 112, 22, 13 — order-insensitive")
    println("518 ok")
}
