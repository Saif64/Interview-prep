@file:JvmName("MaximumSubarray")
// 53. Maximum Subarray — Medium
// https://leetcode.com/problems/maximum-subarray/
// Pattern: Greedy (Kadane's algorithm)
// Time O(n) | Space O(1)
//
// Idea: a running sum that has gone negative is pure dead weight — any future subarray is
// better off starting fresh. That single insight is Kadane's algorithm.
// Seeding `best` with MIN_VALUE (not 0) is what makes an all-negative array work.

package neetcode.greedy

import neetcode.lib.eq

fun maxSubArray(nums: IntArray): Int {
    var best = Int.MIN_VALUE
    var running = 0
    for (n in nums) {
        running = maxOf(n, running + n) // start fresh, or extend
        best = maxOf(best, running)
    }
    return best
}

fun main() {
    eq(maxSubArray(intArrayOf(-2, 1, -3, 4, -1, 2, 1, -5, 4)), 6)
    eq(maxSubArray(intArrayOf(1)), 1)
    eq(maxSubArray(intArrayOf(5, 4, -1, 7, 8)), 23)
    eq(maxSubArray(intArrayOf(-3, -1, -2)), -1, "all negative: pick the least bad")
    println("53 ok")
}
