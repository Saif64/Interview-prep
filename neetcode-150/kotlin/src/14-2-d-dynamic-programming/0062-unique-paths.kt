@file:JvmName("UniquePaths")
// 62. Unique Paths — Medium
// https://leetcode.com/problems/unique-paths/
// Pattern: 2-D DP
// Time O(m * n) | Space O(n)
//
// Idea: paths(r, c) = paths(r-1, c) + paths(r, c-1), with the top row and left column all 1.
// Only the previous row is ever read, so one array suffices.
// Closed form worth mentioning: C(m+n-2, m-1).

package neetcode.dp2d

import neetcode.lib.eq

fun uniquePaths(m: Int, n: Int): Int {
    val row = IntArray(n) { 1 }
    repeat(m - 1) {
        for (c in 1 until n) row[c] += row[c - 1]
    }
    return row[n - 1]
}

fun main() {
    eq(uniquePaths(3, 7), 28)
    eq(uniquePaths(3, 2), 3)
    eq(uniquePaths(1, 1), 1)
    eq(uniquePaths(1, 10), 1, "only one way along a single row")
    eq(uniquePaths(10, 10), 48620)
    println("62 ok")
}
