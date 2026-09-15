@file:JvmName("MinCostToConnectAllPoints")
// 1584. Min Cost to Connect All Points — Medium
// https://leetcode.com/problems/min-cost-to-connect-all-points/
// Pattern: Advanced Graphs (minimum spanning tree, Prim's)
// Time O(n^2 log n) | Space O(n^2)
//
// Idea: a complete graph on the points with Manhattan-distance weights; the answer is its
// minimum spanning tree. Prim's grows one tree: repeatedly take the cheapest edge leaving the
// tree. Kruskal + union-find gives the same answer and is the other standard route.

package neetcode.advancedgraphs

import neetcode.lib.eq
import java.util.PriorityQueue
import kotlin.math.abs

fun minCostConnectPoints(points: Array<IntArray>): Int {
    val n = points.size
    if (n <= 1) return 0

    val heap = PriorityQueue<Pair<Int, Int>>(compareBy { it.first }) // (cost, pointIndex)
    heap.add(0 to 0)
    val inTree = HashSet<Int>()
    var total = 0

    while (inTree.size < n) {
        val (cost, i) = heap.poll()
        if (!inTree.add(i)) continue
        total += cost

        for (j in 0 until n) {
            if (j in inTree) continue
            val distance = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])
            heap.add(distance to j)
        }
    }
    return total
}

fun main() {
    eq(
        minCostConnectPoints(
            arrayOf(
                intArrayOf(0, 0), intArrayOf(2, 2), intArrayOf(3, 10),
                intArrayOf(5, 2), intArrayOf(7, 0),
            )
        ),
        20,
    )
    eq(
        minCostConnectPoints(arrayOf(intArrayOf(3, 12), intArrayOf(-2, 5), intArrayOf(-4, 1))),
        18,
    )
    eq(minCostConnectPoints(arrayOf(intArrayOf(0, 0))), 0)
    eq(minCostConnectPoints(arrayOf(intArrayOf(0, 0), intArrayOf(1, 1))), 2)
    eq(
        minCostConnectPoints(arrayOf(intArrayOf(0, 0), intArrayOf(0, 1), intArrayOf(0, 2))),
        2,
        "collinear",
    )
    println("1584 ok")
}
