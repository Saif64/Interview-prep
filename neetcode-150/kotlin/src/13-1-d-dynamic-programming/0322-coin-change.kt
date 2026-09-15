@file:JvmName("CoinChange")
// 322. Coin Change — Medium
// https://leetcode.com/problems/coin-change/
// Pattern: 1-D DP (unbounded knapsack)
// Time O(amount * coins) | Space O(amount)
//
// Idea: dp[a] = fewest coins summing to a. Build upward: dp[a] = 1 + min(dp[a - coin]).
// Greedy (largest coin first) is WRONG — coins [1,3,4] and amount 6 gives 4+1+1 = 3 coins
// greedily but 3+3 = 2 is optimal. That counterexample is worth having ready.

package neetcode.dp1d

import neetcode.lib.eq

fun coinChange(coins: IntArray, amount: Int): Int {
    val unreachable = amount + 1
    val dp = IntArray(amount + 1) { unreachable }
    dp[0] = 0

    for (a in 1..amount) {
        for (coin in coins) {
            if (coin <= a) dp[a] = minOf(dp[a], dp[a - coin] + 1)
        }
    }
    return if (dp[amount] == unreachable) -1 else dp[amount]
}

fun main() {
    eq(coinChange(intArrayOf(1, 2, 5), 11), 3)
    eq(coinChange(intArrayOf(2), 3), -1)
    eq(coinChange(intArrayOf(1), 0), 0)
    eq(coinChange(intArrayOf(1, 3, 4), 6), 2, "the greedy counterexample")
    eq(coinChange(intArrayOf(), 5), -1)
    println("322 ok")
}
