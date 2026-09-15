@file:JvmName("RedundantConnection")
// 684. Redundant Connection — Medium
// https://leetcode.com/problems/redundant-connection/
// Pattern: Graphs (union-find)
// Time O(E * α(V)) ~ O(E) | Space O(V)
//
// Idea: process edges in order and union them. The first edge whose endpoints are already
// connected is the one that closes a cycle — and since the problem asks for the LAST such
// edge in the input, processing in order and returning immediately gives exactly that.

package neetcode.graphs

import neetcode.lib.eq

fun findRedundantConnection(edges: Array<IntArray>): IntArray {
    val parent = IntArray(edges.size + 1) { it }
    fun find(start: Int): Int {
        var x = start
        while (parent[x] != x) {
            parent[x] = parent[parent[x]]
            x = parent[x]
        }
        return x
    }

    for (edge in edges) {
        val rootA = find(edge[0])
        val rootB = find(edge[1])
        if (rootA == rootB) return edge
        parent[rootA] = rootB
    }
    return intArrayOf()
}

fun main() {
    eq(
        findRedundantConnection(arrayOf(intArrayOf(1, 2), intArrayOf(1, 3), intArrayOf(2, 3))),
        intArrayOf(2, 3),
    )
    eq(
        findRedundantConnection(
            arrayOf(
                intArrayOf(1, 2), intArrayOf(2, 3), intArrayOf(3, 4),
                intArrayOf(1, 4), intArrayOf(1, 5),
            )
        ),
        intArrayOf(1, 4),
    )
    eq(
        findRedundantConnection(arrayOf(intArrayOf(1, 2), intArrayOf(2, 3), intArrayOf(1, 3))),
        intArrayOf(1, 3),
    )
    println("684 ok")
}
