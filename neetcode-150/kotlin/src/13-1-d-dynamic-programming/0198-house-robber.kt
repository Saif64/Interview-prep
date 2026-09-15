@file:JvmName("HouseRobber")
// 198. House Robber — Medium
// https://leetcode.com/problems/house-robber/
// Pattern: 1-D DP
// Time O(n) | Space O(1)
//
// Idea: at each house, either rob it (and add the best from two houses back) or skip it (and
// keep the best from one house back). The "cannot take adjacent" constraint is the entire
// problem, and this recurrence is the canonical answer to it.

package neetcode.dp1d

import neetcode.lib.eq

fun rob(nums: IntArray): Int {
    var twoBack = 0
    var oneBack = 0
    for (amount in nums) {
        val current = maxOf(oneBack, twoBack + amount)
        twoBack = oneBack
        oneBack = current
    }
    return oneBack
}

fun main() {
    eq(rob(intArrayOf(1, 2, 3, 1)), 4)
    eq(rob(intArrayOf(2, 7, 9, 3, 1)), 12)
    eq(rob(intArrayOf()), 0)
    eq(rob(intArrayOf(5)), 5)
    eq(rob(intArrayOf(2, 1, 1, 2)), 4, "skipping two in a row can be right")
    println("198 ok")
}
