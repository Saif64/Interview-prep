@file:JvmName("SetMatrixZeroes")
// 73. Set Matrix Zeroes — Medium
// https://leetcode.com/problems/set-matrix-zeroes/
// Pattern: Math & Geometry
// Time O(rows * cols) | Space O(1)
//
// Idea: the naive fix is two sets of flagged rows and columns, O(m + n) space. To reach O(1),
// store those flags in the matrix's own first row and column.
// The first column needs a separate boolean because cell [0][0] is shared between the two
// markers — that collision is the only real subtlety here.

package neetcode.mathgeometry

import neetcode.lib.eq

fun setZeroes(matrix: Array<IntArray>) {
    val rows = matrix.size
    val cols = if (rows == 0) 0 else matrix[0].size
    var firstColHasZero = false

    for (r in 0 until rows) {
        if (matrix[r][0] == 0) firstColHasZero = true
        for (c in 1 until cols) {
            if (matrix[r][c] == 0) {
                matrix[r][0] = 0
                matrix[0][c] = 0
            }
        }
    }

    // Apply the marks backwards, so the markers are read before being overwritten.
    for (r in rows - 1 downTo 0) {
        for (c in cols - 1 downTo 1) {
            if (matrix[r][0] == 0 || matrix[0][c] == 0) matrix[r][c] = 0
        }
        if (firstColHasZero) matrix[r][0] = 0
    }
}

fun main() {
    fun run(m: Array<IntArray>): List<List<Int>> {
        setZeroes(m)
        return m.map { it.toList() }
    }
    eq(
        run(arrayOf(intArrayOf(1, 1, 1), intArrayOf(1, 0, 1), intArrayOf(1, 1, 1))),
        listOf(listOf(1, 0, 1), listOf(0, 0, 0), listOf(1, 0, 1)),
    )
    eq(
        run(
            arrayOf(
                intArrayOf(0, 1, 2, 0), intArrayOf(3, 4, 5, 2), intArrayOf(1, 3, 1, 5)
            )
        ),
        listOf(listOf(0, 0, 0, 0), listOf(0, 4, 5, 0), listOf(0, 3, 1, 0)),
    )
    eq(run(arrayOf(intArrayOf(0))), listOf(listOf(0)))
    eq(run(arrayOf(intArrayOf(1, 0))), listOf(listOf(0, 0)))
    eq(run(arrayOf(intArrayOf(1), intArrayOf(0))), listOf(listOf(0), listOf(0)))
    println("73 ok")
}
