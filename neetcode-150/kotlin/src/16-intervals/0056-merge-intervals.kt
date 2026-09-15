@file:JvmName("MergeIntervals")
// 56. Merge Intervals — Medium
// https://leetcode.com/problems/merge-intervals/
// Pattern: Intervals
// Time O(n log n) | Space O(n)
//
// Idea: sort by start, then walk. If the next interval starts at or before the current end,
// they overlap — extend the end to the larger of the two. Sorting first is what makes
// "overlap" a purely local check.

package neetcode.intervals

import neetcode.lib.eq

fun merge(intervals: Array<IntArray>): List<List<Int>> {
    if (intervals.isEmpty()) return emptyList()
    val sorted = intervals.sortedBy { it[0] }
    val out = ArrayList<MutableList<Int>>()
    out.add(mutableListOf(sorted[0][0], sorted[0][1]))

    for (i in 1 until sorted.size) {
        val (start, end) = sorted[i][0] to sorted[i][1]
        val last = out.last()
        if (start <= last[1]) last[1] = maxOf(last[1], end)
        else out.add(mutableListOf(start, end))
    }
    return out
}

fun main() {
    eq(
        merge(
            arrayOf(intArrayOf(1, 3), intArrayOf(2, 6), intArrayOf(8, 10), intArrayOf(15, 18))
        ),
        listOf(listOf(1, 6), listOf(8, 10), listOf(15, 18)),
    )
    eq(
        merge(arrayOf(intArrayOf(1, 4), intArrayOf(4, 5))),
        listOf(listOf(1, 5)),
        "touching counts as overlapping",
    )
    eq(
        merge(arrayOf(intArrayOf(1, 4), intArrayOf(2, 3))),
        listOf(listOf(1, 4)),
        "fully contained",
    )
    eq(merge(arrayOf()), emptyList())
    eq(
        merge(arrayOf(intArrayOf(1, 4), intArrayOf(0, 2), intArrayOf(3, 5))),
        listOf(listOf(0, 5)),
    )
    println("56 ok")
}
