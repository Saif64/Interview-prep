@file:JvmName("NetworkDelayTime")
// 743. Network Delay Time — Medium
// https://leetcode.com/problems/network-delay-time/
// Pattern: Advanced Graphs (Dijkstra)
// Time O(E log V) | Space O(V + E)
//
// Idea: textbook Dijkstra. The signal reaches every node at its shortest-path distance, so
// the answer is the largest of those — and -1 if any node is unreachable.
// The pop-and-skip-if-seen pattern is what makes a heap without decrease-key correct.

package neetcode.advancedgraphs

import neetcode.lib.eq
import java.util.PriorityQueue

fun networkDelayTime(times: Array<IntArray>, n: Int, k: Int): Int {
    val adjacency = HashMap<Int, MutableList<Pair<Int, Int>>>()
    for (edge in times) {
        adjacency.getOrPut(edge[0]) { mutableListOf() }.add(edge[1] to edge[2])
    }

    val heap = PriorityQueue<Pair<Int, Int>>(compareBy { it.first }) // (distance, node)
    heap.add(0 to k)
    val seen = HashSet<Int>()
    var last = 0

    while (heap.isNotEmpty()) {
        val (distance, node) = heap.poll()
        if (!seen.add(node)) continue // a shorter route already settled this node
        last = distance
        for ((next, weight) in adjacency[node] ?: emptyList()) {
            if (next !in seen) heap.add((distance + weight) to next)
        }
    }
    return if (seen.size == n) last else -1
}

fun main() {
    eq(
        networkDelayTime(
            arrayOf(intArrayOf(2, 1, 1), intArrayOf(2, 3, 1), intArrayOf(3, 4, 1)), 4, 2
        ),
        2,
    )
    eq(networkDelayTime(arrayOf(intArrayOf(1, 2, 1)), 2, 1), 1)
    eq(networkDelayTime(arrayOf(intArrayOf(1, 2, 1)), 2, 2), -1, "node 1 unreachable")
    eq(networkDelayTime(arrayOf(), 1, 1), 0)
    eq(
        networkDelayTime(
            arrayOf(intArrayOf(1, 2, 100), intArrayOf(1, 3, 1), intArrayOf(3, 2, 1)), 3, 1
        ),
        2,
        "a long cheap path beats a short expensive one",
    )
    println("743 ok")
}
