@file:JvmName("RotateImage")
// 48. Rotate Image — Medium
// https://leetcode.com/problems/rotate-image/
// Pattern: Math & Geometry
// Time O(n^2) | Space O(1)
//
// Idea: transpose (mirror across the main diagonal), then reverse each row.
// That composition equals a 90-degree clockwise rotation, and both halves are trivial to get
// right — far easier than juggling four-way cell swaps.
// Counter-clockwise: transpose, then reverse each column instead.

package neetcode.mathgeometry

import neetcode.lib.eq

fun rotate(matrix: Array<IntArray>) {
    val n = matrix.size

    for (r in 0 until n) {
        for (c in r + 1 until n) {
            val swap = matrix[r][c]
            matrix[r][c] = matrix[c][r]
            matrix[c][r] = swap
        }
    }
    for (row in matrix) row.reverse()
}

fun main() {
    fun run(m: Array<IntArray>): List<List<Int>> {
        rotate(m)
        return m.map { it.toList() }
    }
    eq(
        run(arrayOf(intArrayOf(1, 2, 3), intArrayOf(4, 5, 6), intArrayOf(7, 8, 9))),
        listOf(listOf(7, 4, 1), listOf(8, 5, 2), listOf(9, 6, 3)),
    )
    eq(
        run(arrayOf(intArrayOf(1, 2), intArrayOf(3, 4))),
        listOf(listOf(3, 1), listOf(4, 2)),
    )
    eq(run(arrayOf(intArrayOf(1))), listOf(listOf(1)))

    // Four rotations return to the original.
    val m = arrayOf(intArrayOf(1, 2, 3), intArrayOf(4, 5, 6), intArrayOf(7, 8, 9))
    repeat(4) { rotate(m) }
    eq(m.map { it.toList() }, listOf(listOf(1, 2, 3), listOf(4, 5, 6), listOf(7, 8, 9)))
    println("48 ok")
}
