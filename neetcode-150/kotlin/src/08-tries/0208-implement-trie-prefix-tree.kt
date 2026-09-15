@file:JvmName("ImplementTrie")
// 208. Implement Trie (Prefix Tree) — Medium
// https://leetcode.com/problems/implement-trie-prefix-tree/
// Pattern: Tries
// Time O(len) per operation | Space O(total characters inserted)
//
// Idea: a tree where each edge is a character. `isWord` marks the end of a real word, which
// is the only difference between `search` ("apple" was inserted) and `startsWith` ("app" is
// a prefix of something). A HashSet answers search in O(1) but cannot answer prefix queries
// without scanning everything — that is why the trie earns its keep.

package neetcode.tries

import neetcode.lib.eq

class TrieNode {
    @JvmField val children = HashMap<Char, TrieNode>()
    @JvmField var isWord = false
    /** Used by problem 212, which stores the whole word at its terminal node. */
    @JvmField var word: String? = null
}

class Trie {
    private val root = TrieNode()

    fun insert(word: String) {
        var node = root
        for (ch in word) node = node.children.getOrPut(ch) { TrieNode() }
        node.isWord = true
    }

    private fun find(prefix: String): TrieNode? {
        var node = root
        for (ch in prefix) node = node.children[ch] ?: return null
        return node
    }

    fun search(word: String): Boolean = find(word)?.isWord ?: false

    fun startsWith(prefix: String): Boolean = find(prefix) != null
}

fun main() {
    val t = Trie()
    t.insert("apple")
    eq(t.search("apple"), true)
    eq(t.search("app"), false, "a prefix is not a word")
    eq(t.startsWith("app"), true)
    t.insert("app")
    eq(t.search("app"), true)
    eq(t.startsWith("apx"), false)
    eq(t.search(""), false)
    t.insert("")
    eq(t.search(""), true, "the root itself can be a word")
    println("208 ok")
}
