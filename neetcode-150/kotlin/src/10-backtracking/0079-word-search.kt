@file:JvmName("WordSearch")
// 79. Word Search — Medium
// https://leetcode.com/problems/word-search/
// Pattern: Backtracking
// Time O(rows * cols * 4^len) | Space O(len)
//
// Idea: DFS from every cell, matching one character per depth. A cell cannot be reused within
// a single path, so mark it before recursing and restore it after — mutating the board in
// place avoids allocating a visited grid, but the restore is mandatory or later starting
// cells see a corrupted board.

package neetcode.backtracking

import neetcode.lib.eq

fun exist(board: Array<CharArray>, word: String): Boolean {
    val rows = board.size
    val cols = if (rows == 0) 0 else board[0].size
    if (word.length > rows * cols) return false

    fun dfs(r: Int, c: Int, index: Int): Boolean {
        if (index == word.length) return true
        if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] != word[index]) return false

        val ch = board[r][c]
        board[r][c] = '#'
        val found = dfs(r + 1, c, index + 1) || dfs(r - 1, c, index + 1) ||
            dfs(r, c + 1, index + 1) || dfs(r, c - 1, index + 1)
        board[r][c] = ch
        return found
    }

    for (r in 0 until rows) for (c in 0 until cols) if (dfs(r, c, 0)) return true
    return false
}

fun main() {
    fun board() = arrayOf("ABCE".toCharArray(), "SFCS".toCharArray(), "ADEE".toCharArray())

    eq(exist(board(), "ABCCED"), true)
    eq(exist(board(), "SEE"), true)
    eq(exist(board(), "ABCB"), false, "would need to reuse B")
    eq(exist(arrayOf("a".toCharArray()), "a"), true)
    eq(exist(arrayOf("a".toCharArray()), "ab"), false)

    val pristine = board()
    exist(pristine, "ABCCED")
    eq(pristine.map { it.concatToString() }, listOf("ABCE", "SFCS", "ADEE"), "board restored")
    println("79 ok")
}
