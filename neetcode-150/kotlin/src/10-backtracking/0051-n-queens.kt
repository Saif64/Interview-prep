@file:JvmName("NQueens")
// 51. N-Queens — Hard
// https://leetcode.com/problems/n-queens/
// Pattern: Backtracking
// Time O(n!) | Space O(n)
//
// Idea: place one queen per row, so rows never conflict by construction. Three sets track the
// remaining conflicts, and the diagonal keys are the trick worth memorising:
//   "\" diagonal -> row - col   (constant along it)
//   "/" diagonal -> row + col

package neetcode.backtracking

import neetcode.lib.eq

fun solveNQueens(n: Int): List<List<String>> {
    val out = ArrayList<List<String>>()
    val cols = HashSet<Int>()
    val diag = HashSet<Int>() // row - col
    val antiDiag = HashSet<Int>() // row + col
    val placement = ArrayList<Int>() // placement[row] = col

    fun build(row: Int) {
        if (row == n) {
            out.add(placement.map { col -> ".".repeat(col) + "Q" + ".".repeat(n - col - 1) })
            return
        }
        for (col in 0 until n) {
            if (col in cols || (row - col) in diag || (row + col) in antiDiag) continue
            cols.add(col)
            diag.add(row - col)
            antiDiag.add(row + col)
            placement.add(col)

            build(row + 1)

            placement.removeAt(placement.size - 1)
            cols.remove(col)
            diag.remove(row - col)
            antiDiag.remove(row + col)
        }
    }

    build(0)
    return out
}

fun main() {
    eq(solveNQueens(1), listOf(listOf("Q")))
    eq(solveNQueens(2), emptyList(), "impossible")
    eq(solveNQueens(3), emptyList())
    eq(solveNQueens(4).size, 2)
    eq(solveNQueens(8).size, 92, "the classic count")

    for (board in solveNQueens(5)) {
        eq(board.size, 5)
        for (row in board) {
            eq(row.length, 5)
            eq(row.count { it == 'Q' }, 1, "exactly one queen per row")
        }
    }
    println("51 ok")
}
