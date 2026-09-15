@file:JvmName("PartitionEqualSubsetSum")
// 416. Partition Equal Subset Sum — Medium
// https://leetcode.com/problems/partition-equal-subset-sum/
// Pattern: 1-D DP (0/1 knapsack)
// Time O(n * sum) | Space O(sum)
//
// Idea: two equal halves means finding a subset summing to total / 2 — a 0/1 knapsack
// feasibility question. An odd total is impossible, which is the cheap early exit.
// The inner loop counts DOWNWARD: going upward would let one number be used twice, quietly
// turning this into the unbounded knapsack.

package neetcode.dp1d

import neetcode.lib.eq

fun canPartition(nums: IntArray): Boolean {
    val total = nums.sum()
    if (total % 2 != 0) return false
    val target = total / 2

    val reachable = BooleanArray(target + 1)
    reachable[0] = true

    for (n in nums) {
        for (sum in target downTo n) {
            if (reachable[sum - n]) reachable[sum] = true
        }
    }
    return reachable[target]
}

fun main() {
    eq(canPartition(intArrayOf(1, 5, 11, 5)), true, "[1,5,5] and [11]")
    eq(canPartition(intArrayOf(1, 2, 3, 5)), false)
    eq(canPartition(intArrayOf(1, 1)), true)
    eq(canPartition(intArrayOf(1)), false)
    eq(canPartition(intArrayOf(2, 2, 3, 5)), false)
    eq(canPartition(intArrayOf(3, 3)), true)
    println("416 ok")
}
