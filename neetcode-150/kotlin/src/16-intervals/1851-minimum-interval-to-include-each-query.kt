@file:JvmName("MinimumIntervalToIncludeEachQuery")
// 1851. Minimum Interval to Include Each Query — Hard
// https://leetcode.com/problems/minimum-interval-to-include-each-query/
// Pattern: Intervals + Heap
// Time O(n log n + q log q) | Space O(n + q)
//
// Idea: sort both the intervals and the queries, then sweep the queries in increasing order.
// Push every interval that has started into a min-heap keyed by size, and lazily discard heap
// entries that have already ended. The heap top is then the smallest interval covering the
// current query.
// Answers must be returned in the ORIGINAL query order, so carry the index along.

package neetcode.intervals

import neetcode.lib.eq
import java.util.PriorityQueue

fun minInterval(intervals: Array<IntArray>, queries: IntArray): IntArray {
    val sortedIntervals = intervals.sortedBy { it[0] }
    val sortedQueries = queries.indices.sortedBy { queries[it] }

    val heap = PriorityQueue<Pair<Int, Int>>(compareBy { it.first }) // (size, end)
    val out = IntArray(queries.size) { -1 }
    var i = 0

    for (index in sortedQueries) {
        val query = queries[index]
        while (i < sortedIntervals.size && sortedIntervals[i][0] <= query) {
            val (start, end) = sortedIntervals[i][0] to sortedIntervals[i][1]
            heap.add((end - start + 1) to end)
            i++
        }
        while (heap.isNotEmpty() && heap.peek().second < query) heap.poll() // already ended
        out[index] = if (heap.isNotEmpty()) heap.peek().first else -1
    }
    return out
}

fun main() {
    eq(
        minInterval(
            arrayOf(intArrayOf(1, 4), intArrayOf(2, 4), intArrayOf(3, 6), intArrayOf(4, 4)),
            intArrayOf(2, 3, 4, 5),
        ),
        intArrayOf(3, 3, 1, 4),
    )
    eq(
        minInterval(
            arrayOf(
                intArrayOf(2, 3), intArrayOf(2, 5), intArrayOf(1, 8), intArrayOf(20, 25)
            ),
            intArrayOf(2, 19, 5, 22),
        ),
        intArrayOf(2, -1, 4, 6),
    )
    eq(minInterval(arrayOf(), intArrayOf(1, 2)), intArrayOf(-1, -1))
    eq(minInterval(arrayOf(intArrayOf(1, 1)), intArrayOf(1)), intArrayOf(1))
    println("1851 ok")
}
