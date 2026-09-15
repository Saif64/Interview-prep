@file:JvmName("MinCostClimbingStairs")
// 746. Min Cost Climbing Stairs — Easy
// https://leetcode.com/problems/min-cost-climbing-stairs/
// Pattern: 1-D DP
// Time O(n) | Space O(1)
//
// Idea: climbing stairs with weights. Cost to stand on step i = cost[i] + min(reaching i-1,
// i-2). You may start at index 0 or 1, and the "top" is one past the last step.

package neetcode.dp1d

import neetcode.lib.eq

fun minCostClimbingStairs(cost: IntArray): Int {
    var twoBack = 0
    var oneBack = 0
    for (i in 2..cost.size) {
        val current = minOf(oneBack + cost[i - 1], twoBack + cost[i - 2])
        twoBack = oneBack
        oneBack = current
    }
    return oneBack
}

fun main() {
    eq(minCostClimbingStairs(intArrayOf(10, 15, 20)), 15)
    eq(minCostClimbingStairs(intArrayOf(1, 100, 1, 1, 1, 100, 1, 1, 100, 1)), 6)
    eq(minCostClimbingStairs(intArrayOf(0, 0)), 0)
    eq(minCostClimbingStairs(intArrayOf(5, 5)), 5, "start at the cheaper of the two")
    println("746 ok")
}
