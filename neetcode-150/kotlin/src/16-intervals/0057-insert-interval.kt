@file:JvmName("InsertInterval")
// 57. Insert Interval — Medium
// https://leetcode.com/problems/insert-interval/
// Pattern: Intervals
// Time O(n) | Space O(n)
//
// Idea: the list is already sorted and non-overlapping, so no sort is needed — three phases:
// copy everything strictly before, absorb everything that overlaps into one widened interval,
// then copy the rest.

package neetcode.intervals

import neetcode.lib.eq

fun insert(intervals: Array<IntArray>, newInterval: IntArray): List<List<Int>> {
    val out = ArrayList<List<Int>>()
    var start = newInterval[0]
    var end = newInterval[1]
    var i = 0

    while (i < intervals.size && intervals[i][1] < start) out.add(intervals[i++].toList())

    while (i < intervals.size && intervals[i][0] <= end) {
        start = minOf(start, intervals[i][0])
        end = maxOf(end, intervals[i][1])
        i++
    }
    out.add(listOf(start, end))

    while (i < intervals.size) out.add(intervals[i++].toList())
    return out
}

fun main() {
    eq(
        insert(arrayOf(intArrayOf(1, 3), intArrayOf(6, 9)), intArrayOf(2, 5)),
        listOf(listOf(1, 5), listOf(6, 9)),
    )
    eq(
        insert(
            arrayOf(
                intArrayOf(1, 2), intArrayOf(3, 5), intArrayOf(6, 7),
                intArrayOf(8, 10), intArrayOf(12, 16),
            ),
            intArrayOf(4, 8),
        ),
        listOf(listOf(1, 2), listOf(3, 10), listOf(12, 16)),
    )
    eq(insert(arrayOf(), intArrayOf(5, 7)), listOf(listOf(5, 7)))
    eq(
        insert(arrayOf(intArrayOf(1, 5)), intArrayOf(6, 8)),
        listOf(listOf(1, 5), listOf(6, 8)),
        "no overlap, appended",
    )
    eq(
        insert(arrayOf(intArrayOf(3, 5)), intArrayOf(1, 2)),
        listOf(listOf(1, 2), listOf(3, 5)),
        "inserted at the front",
    )
    println("57 ok")
}
