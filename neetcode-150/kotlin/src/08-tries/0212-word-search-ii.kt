@file:JvmName("WordSearchII")
// 212. Word Search II — Hard
// https://leetcode.com/problems/word-search-ii/
// Pattern: Tries + Backtracking
// Time O(rows * cols * 4^maxWordLength) worst case | Space O(total characters in words)
//
// Idea: running Word Search (79) once per word is far too slow. Instead put every word in a
// trie and walk the board once — the trie prunes a path the moment no word shares that
// prefix. Two details that matter a lot in practice:
//   - mark a cell as visited during the DFS and restore it afterwards;
//   - clear `node.word` once a word is found, so duplicates are not reported twice.

package neetcode.tries

import neetcode.lib.bag
import neetcode.lib.eq

fun findWords(board: Array<CharArray>, words: Array<String>): List<String> {
    val root = TrieNode()
    for (word in words) {
        var node = root
        for (ch in word) node = node.children.getOrPut(ch) { TrieNode() }
        node.word = word
    }

    val rows = board.size
    val cols = if (rows == 0) 0 else board[0].size
    val found = ArrayList<String>()

    fun dfs(r: Int, c: Int, node: TrieNode) {
        if (r < 0 || c < 0 || r >= rows || c >= cols) return
        val ch = board[r][c]
        val next = node.children[ch] ?: return

        next.word?.let {
            found.add(it)
            next.word = null // report each word once
        }

        board[r][c] = '#' // visited
        dfs(r + 1, c, next)
        dfs(r - 1, c, next)
        dfs(r, c + 1, next)
        dfs(r, c - 1, next)
        board[r][c] = ch // restore
    }

    for (r in 0 until rows) for (c in 0 until cols) dfs(r, c, root)
    return found
}

fun main() {
    val board = arrayOf(
        "oaan".toCharArray(),
        "etae".toCharArray(),
        "ihkr".toCharArray(),
        "iflv".toCharArray(),
    )
    eq(
        bag(findWords(board, arrayOf("oath", "pea", "eat", "rain"))),
        bag(listOf("oath", "eat")),
    )
    eq(
        findWords(arrayOf("ab".toCharArray(), "cd".toCharArray()), arrayOf("abcb")),
        emptyList(),
        "no cell reuse",
    )
    eq(findWords(arrayOf("a".toCharArray()), arrayOf("a")), listOf("a"))

    // The board must be left exactly as it was found.
    val pristine = arrayOf("ab".toCharArray(), "cd".toCharArray())
    findWords(pristine, arrayOf("abcd"))
    eq(pristine.map { it.concatToString() }, listOf("ab", "cd"))
    println("212 ok")
}
