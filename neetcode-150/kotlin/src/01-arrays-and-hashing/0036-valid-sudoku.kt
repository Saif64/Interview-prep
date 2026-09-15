@file:JvmName("ValidSudoku")
// 36. Valid Sudoku — Medium
// https://leetcode.com/problems/valid-sudoku/
// Pattern: Arrays & Hashing
// Time O(1) (the board is always 9x9) | Space O(1)
//
// Idea: one pass, three sets of sets. The only trick is the box index: (row/3)*3 + col/3.

package neetcode.arrayshashing

import neetcode.lib.eq

fun isValidSudoku(board: Array<CharArray>): Boolean {
    val rows = Array(9) { HashSet<Char>() }
    val cols = Array(9) { HashSet<Char>() }
    val boxes = Array(9) { HashSet<Char>() }

    for (r in 0 until 9) {
        for (c in 0 until 9) {
            val value = board[r][c]
            if (value == '.') continue
            val b = (r / 3) * 3 + c / 3
            // add() returns false when the value was already present.
            if (!rows[r].add(value) || !cols[c].add(value) || !boxes[b].add(value)) return false
        }
    }
    return true
}

fun main() {
    val valid = arrayOf(
        "53..7....".toCharArray(),
        "6..195...".toCharArray(),
        ".98....6.".toCharArray(),
        "8...6...3".toCharArray(),
        "4..8.3..1".toCharArray(),
        "7...2...6".toCharArray(),
        ".6....28.".toCharArray(),
        "...419..5".toCharArray(),
        "....8..79".toCharArray(),
    )
    eq(isValidSudoku(valid), true)

    val dupInBox = valid.map { it.copyOf() }.toTypedArray()
    dupInBox[0][0] = '8' // the top-left box now holds two 8s
    eq(isValidSudoku(dupInBox), false, "duplicate within a box")
    println("36 ok")
}
