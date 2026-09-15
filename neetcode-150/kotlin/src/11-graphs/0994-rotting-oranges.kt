@file:JvmName("RottingOranges")
// 994. Rotting Oranges — Medium
// https://leetcode.com/problems/rotting-oranges/
// Pattern: Graphs (multi-source BFS)
// Time O(rows * cols) | Space O(rows * cols)
//
// Idea: every rotten orange starts rotting at minute 0, so seed the BFS queue with ALL of
// them at once. Multi-source BFS advances every front in lockstep and the level count is the
// answer. DFS gives wrong answers here because the shortest rot time matters.

package neetcode.graphs

import neetcode.lib.eq

fun orangesRotting(grid: Array<IntArray>): Int {
    val rows = grid.size
    val cols = if (rows == 0) 0 else grid[0].size
    var queue = ArrayList<Pair<Int, Int>>()
    var fresh = 0

    for (r in 0 until rows) {
        for (c in 0 until cols) {
            if (grid[r][c] == 2) queue.add(r to c) else if (grid[r][c] == 1) fresh++
        }
    }
    if (fresh == 0) return 0 // nothing to rot, even if the grid is empty

    var minutes = 0
    while (queue.isNotEmpty() && fresh > 0) {
        val next = ArrayList<Pair<Int, Int>>()
        for ((r, c) in queue) {
            for ((dr, dc) in DIRECTIONS) {
                val nr = r + dr
                val nc = c + dc
                if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || grid[nr][nc] != 1) continue
                grid[nr][nc] = 2
                fresh--
                next.add(nr to nc)
            }
        }
        queue = next
        if (queue.isNotEmpty()) minutes++
    }
    return if (fresh == 0) minutes else -1
}

fun main() {
    eq(
        orangesRotting(arrayOf(intArrayOf(2, 1, 1), intArrayOf(1, 1, 0), intArrayOf(0, 1, 1))),
        4,
    )
    eq(
        orangesRotting(arrayOf(intArrayOf(2, 1, 1), intArrayOf(0, 1, 1), intArrayOf(1, 0, 1))),
        -1,
        "one orange is unreachable",
    )
    eq(orangesRotting(arrayOf(intArrayOf(0, 2))), 0)
    eq(orangesRotting(arrayOf(intArrayOf(0))), 0)
    eq(orangesRotting(arrayOf(intArrayOf(1))), -1, "fresh with no source")
    eq(orangesRotting(arrayOf(intArrayOf(2, 1))), 1)
    println("994 ok")
}
