@file:JvmName("WallsAndGates")
// 286. Walls and Gates — Medium (LeetCode Premium)
// https://leetcode.com/problems/walls-and-gates/
// Pattern: Graphs (multi-source BFS)
// Time O(rows * cols) | Space O(rows * cols)
//
// Idea: same shape as rotting oranges. Running a BFS from each empty room would be
// O((rc)^2); instead run one BFS outward from every gate at once. Because BFS reaches each
// cell by the shortest path first, the first write to a cell is already final.

package neetcode.graphs

import neetcode.lib.eq

const val INF = 2147483647

fun wallsAndGates(rooms: Array<IntArray>) {
    val rows = rooms.size
    val cols = if (rows == 0) 0 else rooms[0].size
    var queue = ArrayList<Pair<Int, Int>>()

    for (r in 0 until rows) {
        for (c in 0 until cols) if (rooms[r][c] == 0) queue.add(r to c)
    }

    var distance = 0
    while (queue.isNotEmpty()) {
        distance++
        val next = ArrayList<Pair<Int, Int>>()
        for ((r, c) in queue) {
            for ((dr, dc) in DIRECTIONS) {
                val nr = r + dr
                val nc = c + dc
                if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || rooms[nr][nc] != INF) continue
                rooms[nr][nc] = distance
                next.add(nr to nc)
            }
        }
        queue = next
    }
}

fun main() {
    val rooms = arrayOf(
        intArrayOf(INF, -1, 0, INF),
        intArrayOf(INF, INF, INF, -1),
        intArrayOf(INF, -1, INF, -1),
        intArrayOf(0, -1, INF, INF),
    )
    wallsAndGates(rooms)
    eq(
        rooms.map { it.toList() },
        listOf(
            listOf(3, -1, 0, 1),
            listOf(2, 2, 1, -1),
            listOf(1, -1, 2, -1),
            listOf(0, -1, 3, 4),
        ),
    )

    val unreachable = arrayOf(intArrayOf(INF))
    wallsAndGates(unreachable)
    eq(unreachable.map { it.toList() }, listOf(listOf(INF)), "no gate: left as-is")
    println("286 ok")
}
