@file:JvmName("CloneGraph")
// 133. Clone Graph — Medium
// https://leetcode.com/problems/clone-graph/
// Pattern: Graphs
// Time O(V + E) | Space O(V)
//
// Idea: DFS with a map from original node to its clone. The map does two jobs at once — it
// stores the result and it is the visited set, which is what stops a cycle from recursing
// forever. Create the clone and record it BEFORE recursing into neighbours.

package neetcode.graphs

import neetcode.lib.eq
import neetcode.lib.that

class GraphNode(@JvmField var `val`: Int = 0) {
    @JvmField val neighbors = ArrayList<GraphNode>()
}

fun cloneGraph(node: GraphNode?): GraphNode? {
    val clones = HashMap<GraphNode, GraphNode>()

    fun dfs(original: GraphNode): GraphNode {
        clones[original]?.let { return it }
        val clone = GraphNode(original.`val`)
        clones[original] = clone // record before recursing, or a cycle loops forever
        for (neighbor in original.neighbors) clone.neighbors.add(dfs(neighbor))
        return clone
    }

    return node?.let { dfs(it) }
}

fun main() {
    // adjacency[i] lists the 1-indexed neighbours of node i + 1
    fun build(adjacency: List<List<Int>>): GraphNode? {
        if (adjacency.isEmpty()) return null
        val nodes = adjacency.indices.map { GraphNode(it + 1) }
        adjacency.forEachIndexed { i, neighbors ->
            neighbors.forEach { nodes[i].neighbors.add(nodes[it - 1]) }
        }
        return nodes[0]
    }

    fun dump(start: GraphNode?): List<Pair<Int, List<Int>>> {
        if (start == null) return emptyList()
        val seen = HashMap<Int, List<Int>>()
        val stack = ArrayDeque<GraphNode>()
        stack.addLast(start)
        while (stack.isNotEmpty()) {
            val n = stack.removeLast()
            if (n.`val` in seen) continue
            seen[n.`val`] = n.neighbors.map { it.`val` }.sorted()
            n.neighbors.forEach { stack.addLast(it) }
        }
        return seen.entries.sortedBy { it.key }.map { it.key to it.value }
    }

    val cases = listOf(
        listOf(listOf(2, 4), listOf(1, 3), listOf(2, 4), listOf(1, 3)),
        listOf(emptyList()),
        emptyList(),
        listOf(listOf(2), listOf(1)),
    )
    for (adjacency in cases) {
        val original = build(adjacency)
        val copy = cloneGraph(original)
        eq(dump(copy), dump(original))
        if (original != null) that(copy !== original, "genuinely a copy")
    }
    println("133 ok")
}
