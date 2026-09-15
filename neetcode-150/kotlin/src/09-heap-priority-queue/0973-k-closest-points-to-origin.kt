@file:JvmName("KClosestPointsToOrigin")
// 973. K Closest Points to Origin — Medium
// https://leetcode.com/problems/k-closest-points-to-origin/
// Pattern: Heap
// Time O(n log k) | Space O(k)
//
// Idea: a max-heap of size k keyed on distance; anything farther than its top is dropped.
// Compare SQUARED distances — the square root is monotonic, so it changes no ordering and
// only costs precision and time.

package neetcode.heap

import neetcode.lib.eq
import java.util.PriorityQueue

fun kClosest(points: Array<IntArray>, k: Int): Array<IntArray> {
    val heap = PriorityQueue<IntArray>(compareByDescending { it[0] * it[0] + it[1] * it[1] })
    for (point in points) {
        heap.add(point)
        if (heap.size > k) heap.poll()
    }
    return heap.toTypedArray()
}

fun main() {
    fun asSet(result: Array<IntArray>) = result.map { it.toList() }.sortedBy { it.toString() }

    eq(
        asSet(kClosest(arrayOf(intArrayOf(1, 3), intArrayOf(-2, 2)), 1)),
        listOf(listOf(-2, 2)),
    )
    eq(
        asSet(kClosest(arrayOf(intArrayOf(3, 3), intArrayOf(5, -1), intArrayOf(-2, 4)), 2)),
        listOf(listOf(-2, 4), listOf(3, 3)),
    )
    eq(asSet(kClosest(arrayOf(intArrayOf(0, 1)), 1)), listOf(listOf(0, 1)))
    eq(
        kClosest(arrayOf(intArrayOf(1, 1), intArrayOf(2, 2), intArrayOf(3, 3)), 3).size,
        3,
        "k equals the input size",
    )
    println("973 ok")
}
