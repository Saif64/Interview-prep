@file:JvmName("GenerateParentheses")
// 22. Generate Parentheses — Medium
// https://leetcode.com/problems/generate-parentheses/
// Pattern: Stack / Backtracking
// Time O(4^n / sqrt(n)) — the nth Catalan number | Space O(n) recursion depth
//
// Idea: build the string one character at a time under two rules — you may open while
// opens < n, and close while closes < opens. Those rules make every generated string valid,
// so nothing has to be filtered afterwards.

package neetcode.stack

import neetcode.lib.bag
import neetcode.lib.eq

fun generateParenthesis(n: Int): List<String> {
    val out = ArrayList<String>()

    fun build(current: String, open: Int, close: Int) {
        if (current.length == n * 2) {
            out.add(current)
            return
        }
        if (open < n) build("$current(", open + 1, close)
        if (close < open) build("$current)", open, close + 1)
    }

    build("", 0, 0)
    return out
}

fun main() {
    eq(generateParenthesis(1), listOf("()"))
    eq(
        bag(generateParenthesis(3)),
        bag(listOf("((()))", "(()())", "(())()", "()(())", "()()()")),
    )
    eq(generateParenthesis(4).size, 14, "Catalan(4)")
    println("22 ok")
}
