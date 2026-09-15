@file:JvmName("DetectSquaresMain")
// 2013. Detect Squares — Medium
// https://leetcode.com/problems/detect-squares/
// Pattern: Math & Geometry
// Time: add O(1), count O(n) | Space O(n)
//
// Idea: given a query point, iterate over stored points that could be its DIAGONAL opposite —
// same absolute dx and dy, and non-zero (a square has positive area). The other two corners
// are then fully determined, so multiply their counts.
// Points may repeat, so store multiplicities and multiply rather than just checking presence.

package neetcode.mathgeometry

import neetcode.lib.eq
import kotlin.math.abs

class DetectSquares {
    private val counts = HashMap<Pair<Int, Int>, Int>()
    private val points = ArrayList<Pair<Int, Int>>()

    fun add(point: IntArray) {
        val key = point[0] to point[1]
        counts[key] = (counts[key] ?: 0) + 1
        points.add(key)
    }

    fun count(point: IntArray): Int {
        val (qx, qy) = point[0] to point[1]
        var total = 0
        for ((px, py) in points) {
            val dx = abs(px - qx)
            if (dx == 0 || dx != abs(py - qy)) continue // not a diagonal partner
            total += (counts[px to qy] ?: 0) * (counts[qx to py] ?: 0)
        }
        return total
    }
}

fun main() {
    val d = DetectSquares()
    d.add(intArrayOf(3, 10))
    d.add(intArrayOf(11, 2))
    d.add(intArrayOf(3, 2))
    eq(d.count(intArrayOf(11, 10)), 1)
    eq(d.count(intArrayOf(14, 8)), 0)
    d.add(intArrayOf(11, 2)) // duplicate point doubles the count
    eq(d.count(intArrayOf(11, 10)), 2)

    val empty = DetectSquares()
    eq(empty.count(intArrayOf(0, 0)), 0)

    val zero = DetectSquares()
    zero.add(intArrayOf(0, 0))
    zero.add(intArrayOf(0, 0))
    eq(zero.count(intArrayOf(0, 0)), 0, "zero-area square must not count")
    println("2013 ok")
}
