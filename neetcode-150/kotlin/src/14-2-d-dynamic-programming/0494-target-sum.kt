@file:JvmName("TargetSum")
// 494. Target Sum — Medium
// https://leetcode.com/problems/target-sum/
// Pattern: 2-D DP
// Time O(n * sum) | Space O(sum)
//
// Idea: every number gets a + or a -, so there are 2^n assignments. Instead of enumerating
// them, carry a map from "running sum" -> "how many ways to reach it". Distinct assignments
// collapse onto the same sum, which is exactly the saving DP provides here.

package neetcode.dp2d

import neetcode.lib.eq

fun findTargetSumWays(nums: IntArray, target: Int): Int {
    var ways = hashMapOf(0 to 1)

    for (n in nums) {
        val next = HashMap<Int, Int>()
        for ((sum, count) in ways) {
            next[sum + n] = (next[sum + n] ?: 0) + count
            next[sum - n] = (next[sum - n] ?: 0) + count
        }
        ways = next
    }
    return ways[target] ?: 0
}

fun main() {
    eq(findTargetSumWays(intArrayOf(1, 1, 1, 1, 1), 3), 5)
    eq(findTargetSumWays(intArrayOf(1), 1), 1)
    eq(findTargetSumWays(intArrayOf(1), 2), 0)
    eq(findTargetSumWays(intArrayOf(0, 0), 0), 4, "+0/-0 count as distinct assignments")
    eq(findTargetSumWays(intArrayOf(1, 2, 1), 0), 2)
    println("494 ok")
}
