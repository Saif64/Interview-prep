@file:JvmName("WordDictionaryMain")
// 211. Design Add and Search Words Data Structure — Medium
// https://leetcode.com/problems/design-add-and-search-words-data-structure/
// Pattern: Tries
// Time: add O(len); search O(len) with no wildcards, O(26^w * len) worst case | Space O(n)
//
// Idea: a trie plus backtracking. A '.' means "try every child", so search becomes a DFS over
// the trie rather than a straight walk.

package neetcode.tries

import neetcode.lib.eq

class WordDictionary {
    private val root = TrieNode()

    fun addWord(word: String) {
        var node = root
        for (ch in word) node = node.children.getOrPut(ch) { TrieNode() }
        node.isWord = true
    }

    fun search(word: String): Boolean {
        fun dfs(index: Int, node: TrieNode): Boolean {
            if (index == word.length) return node.isWord
            val ch = word[index]
            if (ch == '.') return node.children.values.any { dfs(index + 1, it) }
            val child = node.children[ch] ?: return false
            return dfs(index + 1, child)
        }
        return dfs(0, root)
    }
}

fun main() {
    val d = WordDictionary()
    d.addWord("bad")
    d.addWord("dad")
    d.addWord("mad")
    eq(d.search("pad"), false)
    eq(d.search("bad"), true)
    eq(d.search(".ad"), true)
    eq(d.search("b.."), true)
    eq(d.search("..."), true)
    eq(d.search("...."), false, "wrong length")
    eq(d.search(".."), false)
    println("211 ok")
}
