@file:JvmName("CopyListWithRandomPointer")
// 138. Copy List with Random Pointer — Medium
// https://leetcode.com/problems/copy-list-with-random-pointer/
// Pattern: Linked List + Hash Map
// Time O(n) | Space O(n)
//
// Idea: two passes. The first creates every clone and records original -> clone, so the
// second can wire `next` and `random` by lookup. One pass fails because `random` can point at
// a node you have not created yet — the map removes the ordering problem.
// Follow-up worth mentioning: interleaving clones into the original list gets it to O(1).

package neetcode.linkedlist

import neetcode.lib.eq
import neetcode.lib.that

class RandomNode(@JvmField var `val`: Int = 0) {
    @JvmField var next: RandomNode? = null
    @JvmField var random: RandomNode? = null
}

fun copyRandomList(head: RandomNode?): RandomNode? {
    // IdentityHashMap, because RandomNode uses reference equality anyway and two distinct
    // nodes may legitimately hold the same value.
    val clones = HashMap<RandomNode, RandomNode>()

    var node = head
    while (node != null) {
        clones[node] = RandomNode(node.`val`)
        node = node.next
    }
    node = head
    while (node != null) {
        val clone = clones[node]!!
        clone.next = node.next?.let { clones[it] }
        clone.random = node.random?.let { clones[it] }
        node = node.next
    }
    return head?.let { clones[it] }
}

fun main() {
    // spec entries are (value, randomIndex or null)
    fun build(spec: List<Pair<Int, Int?>>): RandomNode? {
        val nodes = spec.map { RandomNode(it.first) }
        nodes.forEachIndexed { i, n ->
            n.next = nodes.getOrNull(i + 1)
            n.random = spec[i].second?.let { nodes[it] }
        }
        return nodes.firstOrNull()
    }

    fun dump(head: RandomNode?): List<Pair<Int, Int?>> {
        val order = HashMap<RandomNode, Int>()
        var n = head
        var i = 0
        while (n != null) { order[n] = i++; n = n.next }
        val out = ArrayList<Pair<Int, Int?>>()
        n = head
        while (n != null) { out.add(n.`val` to n.random?.let { order[it] }); n = n.next }
        return out
    }

    val specs = listOf(
        listOf(7 to null, 13 to 0, 11 to 4, 10 to 2, 1 to 0),
        listOf(1 to 1, 2 to 1),
        listOf(3 to null, 3 to 0, 3 to null),
        emptyList(),
    )
    for (spec in specs) {
        val original = build(spec)
        val copy = copyRandomList(original)
        eq(dump(copy), spec)
        var a = original
        var b = copy
        while (a != null) {
            that(a !== b, "must be a deep copy, not the same nodes")
            a = a.next
            b = b!!.next
        }
    }
    println("138 ok")
}
