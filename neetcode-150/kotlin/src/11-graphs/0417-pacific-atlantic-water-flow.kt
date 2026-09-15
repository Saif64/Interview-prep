@file:JvmName("PacificAtlanticWaterFlow")
// 417. Pacific Atlantic Water Flow — Medium
// https://leetcode.com/problems/pacific-atlantic-water-flow/
// Pattern: Graphs
// Time O(rows * cols) | Space O(rows * cols)
//
// Idea: reverse the flow. Asking "can this cell reach an ocean?" from every cell is
// O((rc)^2); instead start at each ocean's border and walk UPHILL (to cells at least as
// high). That yields the set of cells draining to that ocean, and the answer is the
// intersection of the two sets.

package neetcode.graphs

import neetcode.lib.eq

fun pacificAtlantic(heights: Array<IntArray>): List<List<Int>> {
    val rows = heights.size
    val cols = if (rows == 0) 0 else heights[0].size
    if (rows == 0 || cols == 0) return emptyList()

    fun climb(starts: List<Pair<Int, Int>>): Set<Int> {
        val seen = HashSet<Int>()
        val stack = ArrayDeque(starts)
        while (stack.isNotEmpty()) {
            val (r, c) = stack.removeLast()
            if (!seen.add(r * cols + c)) continue
            for ((dr, dc) in DIRECTIONS) {
                val nr = r + dr
                val nc = c + dc
                if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue
                if (heights[nr][nc] < heights[r][c]) continue // water would not flow this way
                stack.addLast(nr to nc)
            }
        }
        return seen
    }

    val pacificStarts = (0 until rows).map { it to 0 } + (0 until cols).map { 0 to it }
    val atlanticStarts =
        (0 until rows).map { it to cols - 1 } + (0 until cols).map { rows - 1 to it }

    val pacific = climb(pacificStarts)
    val atlantic = climb(atlanticStarts)

    return pacific.intersect(atlantic).map { listOf(it / cols, it % cols) }
}

fun main() {
    fun sortedCells(cells: List<List<Int>>) = cells.sortedWith(compareBy({ it[0] }, { it[1] }))

    eq(
        sortedCells(
            pacificAtlantic(
                arrayOf(
                    intArrayOf(1, 2, 2, 3, 5),
                    intArrayOf(3, 2, 3, 4, 4),
                    intArrayOf(2, 4, 5, 3, 1),
                    intArrayOf(6, 7, 1, 4, 5),
                    intArrayOf(5, 1, 1, 2, 4),
                )
            )
        ),
        sortedCells(
            listOf(
                listOf(0, 4), listOf(1, 3), listOf(1, 4), listOf(2, 2),
                listOf(3, 0), listOf(3, 1), listOf(4, 0),
            )
        ),
    )
    eq(pacificAtlantic(arrayOf(intArrayOf(1))), listOf(listOf(0, 0)))
    eq(pacificAtlantic(arrayOf()), emptyList())
    eq(
        pacificAtlantic(arrayOf(intArrayOf(1, 1), intArrayOf(1, 1))).size,
        4,
        "a flat grid drains everywhere",
    )
    println("417 ok")
}
