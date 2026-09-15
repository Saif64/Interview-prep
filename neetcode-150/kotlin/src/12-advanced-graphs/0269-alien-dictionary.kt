@file:JvmName("AlienDictionary")
// 269. Alien Dictionary — Hard (LeetCode Premium)
// https://leetcode.com/problems/alien-dictionary/
// Pattern: Advanced Graphs (topological sort)
// Time O(total characters) | Space O(1) — at most 26 nodes
//
// Idea: adjacent words reveal one ordering fact each — the first position where they differ.
// Build those as edges and topologically sort. Two traps:
//   - only the FIRST differing character is informative; later ones say nothing;
//   - ["abc", "ab"] is invalid input: a prefix must come first, so it means no valid order.

package neetcode.advancedgraphs

import neetcode.lib.eq
import neetcode.lib.that

fun alienOrder(words: List<String>): String {
    val dependents = HashMap<Char, MutableSet<Char>>()
    val indegree = HashMap<Char, Int>()
    for (word in words) {
        for (ch in word) {
            dependents.getOrPut(ch) { mutableSetOf() }
            indegree.putIfAbsent(ch, 0)
        }
    }

    for (i in 0 until words.size - 1) {
        val a = words[i]
        val b = words[i + 1]
        if (a.length > b.length && a.startsWith(b)) return "" // invalid: prefix sorted after
        for (j in 0 until minOf(a.length, b.length)) {
            if (a[j] == b[j]) continue
            if (dependents[a[j]]!!.add(b[j])) indegree[b[j]] = indegree[b[j]]!! + 1
            break // only the first difference carries information
        }
    }

    val queue = ArrayDeque(indegree.filterValues { it == 0 }.keys)
    val order = StringBuilder()
    while (queue.isNotEmpty()) {
        val ch = queue.removeFirst()
        order.append(ch)
        for (next in dependents[ch]!!) {
            indegree[next] = indegree[next]!! - 1
            if (indegree[next] == 0) queue.addLast(next)
        }
    }
    return if (order.length == indegree.size) order.toString() else "" // short => cycle
}

fun main() {
    // Verify an ordering is consistent rather than pinning one of several valid answers.
    fun consistent(words: List<String>, order: String): Boolean {
        if (order.isEmpty()) return false
        val rank = order.withIndex().associate { (i, ch) -> ch to i }
        for (i in 0 until words.size - 1) {
            val a = words[i]
            val b = words[i + 1]
            var decided = false
            for (j in 0 until minOf(a.length, b.length)) {
                if (a[j] == b[j]) continue
                if (rank[a[j]]!! > rank[b[j]]!!) return false
                decided = true
                break
            }
            if (!decided && a.length > b.length) return false
        }
        return true
    }

    val words = listOf("wrt", "wrf", "er", "ett", "rftt")
    that(consistent(words, alienOrder(words)), "ordering must respect every pair")
    eq(alienOrder(listOf("z", "x", "z")), "", "cycle")
    eq(alienOrder(listOf("abc", "ab")), "", "prefix ordering violation")
    eq(alienOrder(listOf("z", "x")), "zx")
    eq(alienOrder(listOf("a")), "a")
    println("269 ok")
}
