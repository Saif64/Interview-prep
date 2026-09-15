@file:JvmName("WordLadder")
// 127. Word Ladder — Hard
// https://leetcode.com/problems/word-ladder/
// Pattern: Graphs (BFS)
// Time O(n * L^2) for n words of length L | Space O(n * L)
//
// Idea: words are nodes, one-letter changes are edges, and "shortest transformation" is plain
// BFS. Comparing every pair of words to build edges is O(n^2 * L); instead bucket words by
// wildcard patterns ("h*t"), so neighbours are a map lookup.

package neetcode.graphs

import neetcode.lib.eq

fun ladderLength(beginWord: String, endWord: String, wordList: List<String>): Int {
    if (endWord !in wordList.toHashSet()) return 0

    val buckets = HashMap<String, MutableList<String>>() // "h*t" -> [hot, hat, ...]
    for (word in listOf(beginWord) + wordList) {
        for (i in word.indices) {
            val pattern = word.substring(0, i) + '*' + word.substring(i + 1)
            buckets.getOrPut(pattern) { mutableListOf() }.add(word)
        }
    }

    val seen = hashSetOf(beginWord)
    var queue = listOf(beginWord)
    var steps = 1

    while (queue.isNotEmpty()) {
        val next = ArrayList<String>()
        for (word in queue) {
            if (word == endWord) return steps
            for (i in word.indices) {
                val pattern = word.substring(0, i) + '*' + word.substring(i + 1)
                for (neighbor in buckets[pattern] ?: emptyList()) {
                    if (seen.add(neighbor)) next.add(neighbor)
                }
            }
        }
        queue = next
        steps++
    }
    return 0
}

fun main() {
    eq(ladderLength("hit", "cog", listOf("hot", "dot", "dog", "lot", "log", "cog")), 5)
    eq(
        ladderLength("hit", "cog", listOf("hot", "dot", "dog", "lot", "log")),
        0,
        "end word missing",
    )
    eq(ladderLength("a", "c", listOf("a", "b", "c")), 2)
    eq(ladderLength("hot", "dog", listOf("hot", "dog")), 0, "no single-letter bridge")
    println("127 ok")
}
