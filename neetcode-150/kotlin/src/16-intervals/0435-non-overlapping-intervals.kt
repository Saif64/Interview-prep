@file:JvmName("NonOverlappingIntervals")
// 435. Non-overlapping Intervals — Medium
// https://leetcode.com/problems/non-overlapping-intervals/
// Pattern: Intervals (greedy)
// Time O(n log n) | Space O(1)
//
// Idea: the classic activity-selection problem. Sort by END time and keep every interval that
// starts after the last kept one ends — finishing early leaves the most room for what follows.
// Sorting by start time instead is the common wrong answer: one very long interval then
// blocks everything.

package neetcode.intervals

import neetcode.lib.eq

fun eraseOverlapIntervals(intervals: Array<IntArray>): Int {
    if (intervals.isEmpty()) return 0
    val sorted = intervals.sortedBy { it[1] }

    var kept = 1
    var lastEnd = sorted[0][1]
    for (i in 1 until sorted.size) {
        if (sorted[i][0] >= lastEnd) {
            kept++
            lastEnd = sorted[i][1]
        }
    }
    return intervals.size - kept
}

fun main() {
    eq(
        eraseOverlapIntervals(
            arrayOf(intArrayOf(1, 2), intArrayOf(2, 3), intArrayOf(3, 4), intArrayOf(1, 3))
        ),
        1,
    )
    eq(
        eraseOverlapIntervals(
            arrayOf(intArrayOf(1, 2), intArrayOf(1, 2), intArrayOf(1, 2))
        ),
        2,
    )
    eq(
        eraseOverlapIntervals(arrayOf(intArrayOf(1, 2), intArrayOf(2, 3))),
        0,
        "touching is not overlapping",
    )
    eq(eraseOverlapIntervals(arrayOf()), 0)
    // Sorting by start would keep [1,100] and drop three; sorting by end keeps three.
    eq(
        eraseOverlapIntervals(
            arrayOf(intArrayOf(1, 100), intArrayOf(11, 22), intArrayOf(1, 11), intArrayOf(2, 12))
        ),
        2,
    )
    println("435 ok")
}
