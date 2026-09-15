@file:JvmName("NumberOfConnectedComponents")
// 323. Number of Connected Components in an Undirected Graph — Medium (LeetCode Premium)
// https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/
// Pattern: Graphs (union-find)
// Time O(E * α(V)) ~ O(E) | Space O(V)
//
// Idea: start with n components and subtract one every time an edge merges two distinct sets.
// Edges within an already-merged component change nothing.
// Union by rank keeps the trees flat; with path compression the find is near constant.

package neetcode.graphs

import neetcode.lib.eq

fun countComponents(n: Int, edges: Array<IntArray>): Int {
    val parent = IntArray(n) { it }
    val rank = IntArray(n) { 1 }

    fun find(start: Int): Int {
        var x = start
        while (parent[x] != x) {
            parent[x] = parent[parent[x]]
            x = parent[x]
        }
        return x
    }

    var components = n
    for (edge in edges) {
        val rootA = find(edge[0])
        val rootB = find(edge[1])
        if (rootA == rootB) continue
        when {
            rank[rootA] < rank[rootB] -> parent[rootA] = rootB
            rank[rootA] > rank[rootB] -> parent[rootB] = rootA
            else -> {
                parent[rootB] = rootA
                rank[rootA]++
            }
        }
        components--
    }
    return components
}

fun main() {
    eq(countComponents(5, arrayOf(intArrayOf(0, 1), intArrayOf(1, 2), intArrayOf(3, 4))), 2)
    eq(
        countComponents(
            5,
            arrayOf(intArrayOf(0, 1), intArrayOf(1, 2), intArrayOf(2, 3), intArrayOf(3, 4)),
        ),
        1,
    )
    eq(countComponents(4, arrayOf()), 4, "all isolated")
    eq(countComponents(1, arrayOf()), 1)
    eq(
        countComponents(3, arrayOf(intArrayOf(0, 1), intArrayOf(0, 1))),
        2,
        "a repeated edge is harmless",
    )
    println("323 ok")
}
