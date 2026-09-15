@file:JvmName("HouseRobberII")
// 213. House Robber II — Medium
// https://leetcode.com/problems/house-robber-ii/
// Pattern: 1-D DP
// Time O(n) | Space O(1)
//
// Idea: the houses form a circle, so the first and last are now adjacent. You cannot rob
// both — so run House Robber twice, once excluding the last house and once excluding the
// first, and take the better. Reducing a new constraint to two runs of a solved problem is
// the move worth internalising.

package neetcode.dp1d

import neetcode.lib.eq

fun robCircular(nums: IntArray): Int {
    if (nums.size == 1) return nums[0]
    return maxOf(
        rob(nums.copyOfRange(0, nums.size - 1)),
        rob(nums.copyOfRange(1, nums.size)),
    )
}

fun main() {
    eq(robCircular(intArrayOf(2, 3, 2)), 3, "can't take both 2s")
    eq(robCircular(intArrayOf(1, 2, 3, 1)), 4)
    eq(robCircular(intArrayOf(1, 2, 3)), 3)
    eq(robCircular(intArrayOf(5)), 5)
    eq(robCircular(intArrayOf(1, 2)), 2)
    println("213 ok")
}
