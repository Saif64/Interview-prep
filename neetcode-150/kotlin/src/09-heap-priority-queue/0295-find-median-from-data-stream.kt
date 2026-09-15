@file:JvmName("MedianFinderMain")
// 295. Find Median from Data Stream — Hard
// https://leetcode.com/problems/find-median-from-data-stream/
// Pattern: Heap
// Time: addNum O(log n), findMedian O(1) | Space O(n)
//
// Idea: two heaps facing each other. A max-heap holds the smaller half, a min-heap the larger
// half. The median is then either the top of the bigger heap or the average of both tops.
// Two invariants keep it honest: every element in `low` <= every element in `high`, and the
// sizes never differ by more than one.

package neetcode.heap

import neetcode.lib.eq
import java.util.PriorityQueue

class MedianFinder {
    private val low = PriorityQueue<Int>(compareByDescending { it }) // smaller half
    private val high = PriorityQueue<Int>() // larger half

    fun addNum(num: Int) {
        low.add(num)
        high.add(low.poll()) // route through low to preserve the ordering invariant
        if (high.size > low.size) low.add(high.poll())
    }

    fun findMedian(): Double =
        if (low.size == high.size) (low.peek().toDouble() + high.peek()) / 2.0
        else low.peek().toDouble()
}

fun main() {
    val m = MedianFinder()
    m.addNum(1)
    eq(m.findMedian(), 1.0)
    m.addNum(2)
    eq(m.findMedian(), 1.5)
    m.addNum(3)
    eq(m.findMedian(), 2.0)

    // Cross-check against a sorted list on random input.
    val f = MedianFinder()
    val seen = ArrayList<Int>()
    val rng = java.util.Random(7)
    repeat(300) {
        val v = rng.nextInt(1000) - 500
        f.addNum(v)
        seen.add(v)
        seen.sort()
        val mid = seen.size / 2
        val expected =
            if (seen.size % 2 == 1) seen[mid].toDouble()
            else (seen[mid - 1].toDouble() + seen[mid]) / 2.0
        eq(f.findMedian(), expected)
    }
    println("295 ok")
}
