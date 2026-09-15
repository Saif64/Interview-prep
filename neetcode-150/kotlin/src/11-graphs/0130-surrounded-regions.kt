@file:JvmName("SurroundedRegions")
// 130. Surrounded Regions — Medium
// https://leetcode.com/problems/surrounded-regions/
// Pattern: Graphs
// Time O(rows * cols) | Space O(rows * cols)
//
// Idea: invert the question. Instead of finding enclosed regions, find the ones that are NOT
// enclosed — every 'O' reachable from a border. Mark those safe, flip everything else to 'X',
// then restore. Attacking it directly means tracking "did this region touch an edge?" through
// the traversal, which is fiddlier and easier to get wrong.

package neetcode.graphs

import neetcode.lib.eq

fun solve(board: Array<CharArray>) {
    val rows = board.size
    val cols = if (rows == 0) 0 else board[0].size
    if (rows == 0 || cols == 0) return

    fun markSafe(startR: Int, startC: Int) {
        val stack = ArrayDeque<Pair<Int, Int>>()
        stack.addLast(startR to startC)
        while (stack.isNotEmpty()) {
            val (r, c) = stack.removeLast()
            if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] != 'O') continue
            board[r][c] = 'S'
            for ((dr, dc) in DIRECTIONS) stack.addLast((r + dr) to (c + dc))
        }
    }

    for (r in 0 until rows) {
        markSafe(r, 0)
        markSafe(r, cols - 1)
    }
    for (c in 0 until cols) {
        markSafe(0, c)
        markSafe(rows - 1, c)
    }

    for (r in 0 until rows) {
        for (c in 0 until cols) board[r][c] = if (board[r][c] == 'S') 'O' else 'X'
    }
}

fun main() {
    val b = arrayOf(
        "XXXX".toCharArray(),
        "XOOX".toCharArray(),
        "XXOX".toCharArray(),
        "XOXX".toCharArray(),
    )
    solve(b)
    eq(
        b.map { it.concatToString() },
        listOf("XXXX", "XXXX", "XXXX", "XOXX"), // the last O touches the bottom edge
    )

    val single = arrayOf("O".toCharArray())
    solve(single)
    eq(single.map { it.concatToString() }, listOf("O"))
    println("130 ok")
}
