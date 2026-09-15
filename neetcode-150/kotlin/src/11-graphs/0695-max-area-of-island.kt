@file:JvmName("MaxAreaOfIsland")
// 695. Max Area of Island — Medium
// https://leetcode.com/problems/max-area-of-island/
// Pattern: Graphs (flood fill)
// Time O(rows * cols) | Space O(rows * cols)
//
// Idea: problem 200, but the flood fill returns a count instead of just marking.

package neetcode.graphs

import neetcode.lib.eq

fun maxAreaOfIsland(grid: Array<IntArray>): Int {
    val rows = grid.size
    val cols = if (rows == 0) 0 else grid[0].size
    var best = 0

    fun floodFill(startR: Int, startC: Int): Int {
        var area = 0
        val stack = ArrayDeque<Pair<Int, Int>>()
        stack.addLast(startR to startC)
        while (stack.isNotEmpty()) {
            val (r, c) = stack.removeLast()
            if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] != 1) continue
            grid[r][c] = 0
            area++
            for ((dr, dc) in DIRECTIONS) stack.addLast((r + dr) to (c + dc))
        }
        return area
    }

    for (r in 0 until rows) {
        for (c in 0 until cols) if (grid[r][c] == 1) best = maxOf(best, floodFill(r, c))
    }
    return best
}

fun main() {
    eq(
        maxAreaOfIsland(
            arrayOf(
                intArrayOf(0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0),
                intArrayOf(0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0),
                intArrayOf(0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0),
                intArrayOf(0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0),
                intArrayOf(0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0),
                intArrayOf(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0),
                intArrayOf(0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0),
                intArrayOf(0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0),
            )
        ),
        6,
    )
    eq(maxAreaOfIsland(arrayOf(intArrayOf(0, 0, 0, 0, 0, 0, 0, 0))), 0)
    eq(maxAreaOfIsland(arrayOf(intArrayOf(1))), 1)
    println("695 ok")
}
