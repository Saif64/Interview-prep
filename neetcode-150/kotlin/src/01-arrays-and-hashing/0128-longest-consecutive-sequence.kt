@file:JvmName("LongestConsecutiveSequence")
// 128. Longest Consecutive Sequence — Medium
// https://leetcode.com/problems/longest-consecutive-sequence/
// Pattern: Arrays & Hashing
// Time O(n) | Space O(n)
//
// Idea: put everything in a set, then only start counting from a number that has no left
// neighbour. That guard is what keeps this linear — without it you rewalk the same runs.

package neetcode.arrayshashing

import neetcode.lib.eq

fun longestConsecutive(nums: IntArray): Int {
    val set = nums.toHashSet()
    var best = 0
    for (n in set) {
        if (n - 1 in set) continue // not the start of a run
        var length = 1
        while (n + length in set) length++
        best = maxOf(best, length)
    }
    return best
}

fun main() {
    eq(longestConsecutive(intArrayOf(100, 4, 200, 1, 3, 2)), 4)
    eq(longestConsecutive(intArrayOf(0, 3, 7, 2, 5, 8, 4, 6, 0, 1)), 9)
    eq(longestConsecutive(intArrayOf()), 0)
    eq(longestConsecutive(intArrayOf(5, 5, 5)), 1, "duplicates are one run")
    println("128 ok")
}
