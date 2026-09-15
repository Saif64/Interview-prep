@file:JvmName("SpiralMatrix")
// 54. Spiral Matrix — Medium
// https://leetcode.com/problems/spiral-matrix/
// Pattern: Math & Geometry
// Time O(rows * cols) | Space O(1) extra
//
// Idea: four shrinking boundaries. Walk right along the top, down the right, left along the
// bottom, up the left, then tighten. The two guards before the bottom and left passes are
// essential: without them a single leftover row or column is emitted twice.

package neetcode.mathgeometry

import neetcode.lib.eq

fun spiralOrder(matrix: Array<IntArray>): List<Int> {
    if (matrix.isEmpty() || matrix[0].isEmpty()) return emptyList()
    val out = ArrayList<Int>()
    var top = 0
    var bottom = matrix.size - 1
    var left = 0
    var right = matrix[0].size - 1

    while (top <= bottom && left <= right) {
        for (c in left..right) out.add(matrix[top][c])
        top++

        for (r in top..bottom) out.add(matrix[r][right])
        right--

        if (top <= bottom) {
            for (c in right downTo left) out.add(matrix[bottom][c])
            bottom--
        }
        if (left <= right) {
            for (r in bottom downTo top) out.add(matrix[r][left])
            left++
        }
    }
    return out
}

fun main() {
    eq(
        spiralOrder(arrayOf(intArrayOf(1, 2, 3), intArrayOf(4, 5, 6), intArrayOf(7, 8, 9))),
        listOf(1, 2, 3, 6, 9, 8, 7, 4, 5),
    )
    eq(
        spiralOrder(
            arrayOf(
                intArrayOf(1, 2, 3, 4), intArrayOf(5, 6, 7, 8), intArrayOf(9, 10, 11, 12)
            )
        ),
        listOf(1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7),
    )
    eq(spiralOrder(arrayOf(intArrayOf(1))), listOf(1))
    eq(spiralOrder(arrayOf(intArrayOf(1, 2, 3))), listOf(1, 2, 3), "single row")
    eq(
        spiralOrder(arrayOf(intArrayOf(1), intArrayOf(2), intArrayOf(3))),
        listOf(1, 2, 3),
        "single column",
    )
    eq(spiralOrder(arrayOf()), emptyList())
    println("54 ok")
}
