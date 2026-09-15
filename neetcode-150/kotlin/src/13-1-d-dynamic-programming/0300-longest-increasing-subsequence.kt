@file:JvmName("LongestIncreasingSubsequence")
// 300. Longest Increasing Subsequence — Medium
// https://leetcode.com/problems/longest-increasing-subsequence/
// Pattern: 1-D DP + Binary Search (patience sorting)
// Time O(n log n) | Space O(n)
//
// Idea: `tails[k]` holds the smallest possible tail of an increasing subsequence of length
// k + 1. Each number either extends the longest run or replaces the first tail >= itself,
// keeping future options as open as possible. The answer is tails.size.
// Note `tails` is NOT itself a valid subsequence — only its length is meaningful.
// The O(n^2) DP (dp[i] = best run ending at i) is the version to explain first.

package neetcode.dp1d

import neetcode.lib.eq

fun lengthOfLIS(nums: IntArray): Int {
    val tails = ArrayList<Int>()
    for (n in nums) {
        var lo = 0
        var hi = tails.size
        while (lo < hi) {
            val mid = lo + (hi - lo) / 2
            if (tails[mid] < n) lo = mid + 1 else hi = mid
        }
        if (lo == tails.size) tails.add(n) else tails[lo] = n
    }
    return tails.size
}

fun main() {
    eq(lengthOfLIS(intArrayOf(10, 9, 2, 5, 3, 7, 101, 18)), 4)
    eq(lengthOfLIS(intArrayOf(0, 1, 0, 3, 2, 3)), 4)
    eq(lengthOfLIS(intArrayOf(7, 7, 7, 7)), 1, "strictly increasing only")
    eq(lengthOfLIS(intArrayOf()), 0)
    eq(lengthOfLIS(intArrayOf(4, 3, 2, 1)), 1)

    // Cross-check against the straightforward O(n^2) DP on random input.
    fun naive(nums: IntArray): Int {
        if (nums.isEmpty()) return 0
        val dp = IntArray(nums.size) { 1 }
        for (i in 1 until nums.size) {
            for (j in 0 until i) if (nums[j] < nums[i]) dp[i] = maxOf(dp[i], dp[j] + 1)
        }
        return dp.max()
    }
    val rng = java.util.Random(11)
    repeat(300) {
        val arr = IntArray(rng.nextInt(25)) { rng.nextInt(20) }
        eq(lengthOfLIS(arr), naive(arr), arr.toList().toString())
    }
    println("300 ok")
}
