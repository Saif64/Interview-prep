@file:JvmName("LongestIncreasingPathInAMatrix")
// 329. Longest Increasing Path in a Matrix — Hard
// https://leetcode.com/problems/longest-increasing-path-in-a-matrix/
// Pattern: 2-D DP (memoised DFS)
// Time O(rows * cols) | Space O(rows * cols)
//
// Idea: DFS from every cell, memoising the best path length starting there.
// No visited set is needed: paths must strictly increase, so the graph is acyclic by
// construction and each cell is computed exactly once.

package neetcode.dp2d

import neetcode.lib.eq

fun longestIncreasingPath(matrix: Array<IntArray>): Int {
    val rows = matrix.size
    val cols = if (rows == 0) 0 else matrix[0].size
    if (rows == 0 || cols == 0) return 0

    val memo = Array(rows) { IntArray(cols) }

    fun dfs(r: Int, c: Int): Int {
        if (memo[r][c] != 0) return memo[r][c]
        var best = 1
        for ((dr, dc) in listOf(1 to 0, -1 to 0, 0 to 1, 0 to -1)) {
            val nr = r + dr
            val nc = c + dc
            if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue
            if (matrix[nr][nc] <= matrix[r][c]) continue
            best = maxOf(best, 1 + dfs(nr, nc))
        }
        memo[r][c] = best
        return best
    }

    var answer = 0
    for (r in 0 until rows) for (c in 0 until cols) answer = maxOf(answer, dfs(r, c))
    return answer
}

fun main() {
    eq(
        longestIncreasingPath(
            arrayOf(intArrayOf(9, 9, 4), intArrayOf(6, 6, 8), intArrayOf(2, 1, 1))
        ),
        4,
    )
    eq(
        longestIncreasingPath(
            arrayOf(intArrayOf(3, 4, 5), intArrayOf(3, 2, 6), intArrayOf(2, 2, 1))
        ),
        4,
    )
    eq(longestIncreasingPath(arrayOf(intArrayOf(1))), 1)
    eq(longestIncreasingPath(arrayOf()), 0)
    eq(
        longestIncreasingPath(arrayOf(intArrayOf(1, 1), intArrayOf(1, 1))),
        1,
        "equal values do not count",
    )
    println("329 ok")
}
