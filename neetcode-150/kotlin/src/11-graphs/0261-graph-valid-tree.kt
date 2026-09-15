@file:JvmName("GraphValidTree")
// 261. Graph Valid Tree — Medium (LeetCode Premium)
// https://leetcode.com/problems/graph-valid-tree/
// Pattern: Graphs (union-find)
// Time O(E * α(V)) ~ O(E) | Space O(V)
//
// Idea: a graph on n nodes is a tree exactly when it has n - 1 edges AND is fully connected.
// Check the edge count first (O(1), rules out most inputs), then union every edge — if a
// union ever joins two nodes already in the same set, that edge closes a cycle.

package neetcode.graphs

import neetcode.lib.eq

fun validTree(n: Int, edges: Array<IntArray>): Boolean {
    if (edges.size != n - 1) return false // too few => disconnected, too many => cycle

    val parent = IntArray(n) { it }
    fun find(start: Int): Int {
        var x = start
        while (parent[x] != x) {
            parent[x] = parent[parent[x]] // path halving
            x = parent[x]
        }
        return x
    }

    for (edge in edges) {
        val rootA = find(edge[0])
        val rootB = find(edge[1])
        if (rootA == rootB) return false // cycle
        parent[rootA] = rootB
    }
    return true
}

fun main() {
    eq(
        validTree(5, arrayOf(intArrayOf(0, 1), intArrayOf(0, 2), intArrayOf(0, 3), intArrayOf(1, 4))),
        true,
    )
    eq(
        validTree(
            5,
            arrayOf(
                intArrayOf(0, 1), intArrayOf(1, 2), intArrayOf(2, 3),
                intArrayOf(1, 3), intArrayOf(1, 4),
            ),
        ),
        false,
        "cycle",
    )
    eq(validTree(1, arrayOf()), true)
    eq(validTree(2, arrayOf()), false, "disconnected")
    eq(validTree(4, arrayOf(intArrayOf(0, 1), intArrayOf(2, 3), intArrayOf(1, 2))), true)
    println("261 ok")
}
