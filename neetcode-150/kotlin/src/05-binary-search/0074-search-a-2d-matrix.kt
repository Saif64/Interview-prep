@file:JvmName("SearchA2DMatrix")
// 74. Search a 2D Matrix — Medium
// https://leetcode.com/problems/search-a-2d-matrix/
// Pattern: Binary Search
// Time O(log(m * n)) | Space O(1)
//
// Idea: the matrix is one sorted list wearing a grid costume. Binary search indices
// 0..m*n-1 and convert with divmod. Finding the row first and then searching within it is
// equally valid and the same complexity — this version is just shorter.

package neetcode.binarysearch

import neetcode.lib.eq

fun searchMatrix(matrix: Array<IntArray>, target: Int): Boolean {
    if (matrix.isEmpty() || matrix[0].isEmpty()) return false
    val cols = matrix[0].size
    var lo = 0
    var hi = matrix.size * cols - 1

    while (lo <= hi) {
        val mid = lo + (hi - lo) / 2
        val value = matrix[mid / cols][mid % cols]
        when {
            value == target -> return true
            value < target -> lo = mid + 1
            else -> hi = mid - 1
        }
    }
    return false
}

fun main() {
    val m = arrayOf(
        intArrayOf(1, 3, 5, 7),
        intArrayOf(10, 11, 16, 20),
        intArrayOf(23, 30, 34, 60),
    )
    eq(searchMatrix(m, 3), true)
    eq(searchMatrix(m, 13), false)
    eq(searchMatrix(m, 60), true, "last cell")
    eq(searchMatrix(m, 1), true, "first cell")
    eq(searchMatrix(arrayOf(), 1), false)
    println("74 ok")
}
