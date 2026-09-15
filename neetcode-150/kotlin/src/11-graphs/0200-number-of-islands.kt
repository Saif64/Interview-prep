@file:JvmName("NumberOfIslands")
// 200. Number of Islands — Medium
// https://leetcode.com/problems/number-of-islands/
// Pattern: Graphs (flood fill)
// Time O(rows * cols) | Space O(rows * cols) worst case
//
// Idea: every unvisited '1' starts one island; flood the whole island so it is counted once.
// Sinking visited land (writing '0') is the tidiest way to mark visited, but it mutates the
// input — worth flagging to an interviewer, and easy to swap for a visited set.
//
// The flood fill is iterative on purpose: a recursive one can blow the stack on a large
// all-land grid.

package neetcode.graphs

import neetcode.lib.eq

val DIRECTIONS = arrayOf(intArrayOf(1, 0), intArrayOf(-1, 0), intArrayOf(0, 1), intArrayOf(0, -1))

fun numIslands(grid: Array<CharArray>): Int {
    val rows = grid.size
    val cols = if (rows == 0) 0 else grid[0].size
    var islands = 0

    fun sink(startR: Int, startC: Int) {
        val stack = ArrayDeque<Pair<Int, Int>>()
        stack.addLast(startR to startC)
        while (stack.isNotEmpty()) {
            val (r, c) = stack.removeLast()
            if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] != '1') continue
            grid[r][c] = '0'
            for ((dr, dc) in DIRECTIONS) stack.addLast((r + dr) to (c + dc))
        }
    }

    for (r in 0 until rows) {
        for (c in 0 until cols) {
            if (grid[r][c] == '1') {
                islands++
                sink(r, c)
            }
        }
    }
    return islands
}

fun main() {
    eq(
        numIslands(
            arrayOf(
                "11110".toCharArray(),
                "11010".toCharArray(),
                "11000".toCharArray(),
                "00000".toCharArray(),
            )
        ),
        1,
    )
    eq(
        numIslands(
            arrayOf(
                "11000".toCharArray(),
                "11000".toCharArray(),
                "00100".toCharArray(),
                "00011".toCharArray(),
            )
        ),
        3,
    )
    eq(numIslands(arrayOf()), 0)
    eq(numIslands(arrayOf("0".toCharArray())), 0)
    eq(
        numIslands(arrayOf("10".toCharArray(), "01".toCharArray())),
        2,
        "diagonals do not connect",
    )
    println("200 ok")
}
