@file:JvmName("MaximumProductSubarray")
// 152. Maximum Product Subarray — Medium
// https://leetcode.com/problems/maximum-product-subarray/
// Pattern: 1-D DP
// Time O(n) | Space O(1)
//
// Idea: Kadane's, except a negative number flips the ranking — so the SMALLEST product so far
// can become the largest. Track both, and swap them when the current value is negative.
// A zero resets both, which falls out of the max/min against `n` itself.

package neetcode.dp1d

import neetcode.lib.eq

fun maxProduct(nums: IntArray): Int {
    if (nums.isEmpty()) return 0
    var maxHere = nums[0]
    var minHere = nums[0]
    var best = nums[0]

    for (i in 1 until nums.size) {
        val n = nums[i]
        if (n < 0) {
            val swap = maxHere
            maxHere = minHere
            minHere = swap
        }
        maxHere = maxOf(n, maxHere * n)
        minHere = minOf(n, minHere * n)
        best = maxOf(best, maxHere)
    }
    return best
}

fun main() {
    eq(maxProduct(intArrayOf(2, 3, -2, 4)), 6)
    eq(maxProduct(intArrayOf(-2, 0, -1)), 0)
    eq(maxProduct(intArrayOf(-2, 3, -4)), 24, "two negatives make a positive")
    eq(maxProduct(intArrayOf(-2)), -2)
    eq(maxProduct(intArrayOf(0, 2)), 2)
    println("152 ok")
}
