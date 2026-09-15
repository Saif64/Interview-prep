@file:JvmName("SwimInRisingWater")
// 778. Swim in Rising Water — Hard
// https://leetcode.com/problems/swim-in-rising-water/
// Pattern: Advanced Graphs (Dijkstra variant)
// Time O(n^2 log n) | Space O(n^2)
//
// Idea: Dijkstra where a path's cost is the MAXIMUM cell on it rather than the sum — you can
// wait for the water to rise, so only the worst cell matters.
// Swapping `distance + weight` for `max(distance, weight)` is the entire change. This
// "minimise the maximum edge" shape is also what a bottleneck / minimax path means.

package neetcode.advancedgraphs

import neetcode.lib.eq
import java.util.PriorityQueue

private val MOVES = arrayOf(intArrayOf(1, 0), intArrayOf(-1, 0), intArrayOf(0, 1), intArrayOf(0, -1))

fun swimInWater(grid: Array<IntArray>): Int {
    val n = grid.size
    val heap = PriorityQueue<Triple<Int, Int, Int>>(compareBy { it.first }) // (time, r, c)
    heap.add(Triple(grid[0][0], 0, 0))
    val seen = hashSetOf(0)

    while (heap.isNotEmpty()) {
        val (time, r, c) = heap.poll()
        if (r == n - 1 && c == n - 1) return time
        for ((dr, dc) in MOVES) {
            val nr = r + dr
            val nc = c + dc
            if (nr < 0 || nc < 0 || nr >= n || nc >= n) continue
            if (!seen.add(nr * n + nc)) continue
            heap.add(Triple(maxOf(time, grid[nr][nc]), nr, nc))
        }
    }
    return -1
}

fun main() {
    eq(swimInWater(arrayOf(intArrayOf(0, 2), intArrayOf(1, 3))), 3)
    eq(
        swimInWater(
            arrayOf(
                intArrayOf(0, 1, 2, 3, 4),
                intArrayOf(24, 23, 22, 21, 5),
                intArrayOf(12, 13, 14, 15, 16),
                intArrayOf(11, 17, 18, 19, 20),
                intArrayOf(10, 9, 8, 7, 6),
            )
        ),
        16,
    )
    eq(swimInWater(arrayOf(intArrayOf(0))), 0)
    eq(
        swimInWater(arrayOf(intArrayOf(0, 9, 9), intArrayOf(1, 9, 9), intArrayOf(2, 3, 4))),
        4,
        "a detour over low cells beats a direct high route",
    )
    println("778 ok")
}
