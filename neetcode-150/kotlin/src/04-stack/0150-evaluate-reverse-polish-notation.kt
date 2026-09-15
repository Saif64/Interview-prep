@file:JvmName("EvaluateReversePolishNotation")
// 150. Evaluate Reverse Polish Notation — Medium
// https://leetcode.com/problems/evaluate-reverse-polish-notation/
// Pattern: Stack
// Time O(n) | Space O(n)
//
// Idea: push numbers; on an operator pop two and push the result. Order matters for the
// non-commutative ones — the FIRST pop is the right operand.
// Kotlin's Int division already truncates toward zero, which is what the problem wants.

package neetcode.stack

import neetcode.lib.eq

fun evalRPN(tokens: Array<String>): Int {
    val stack = ArrayDeque<Int>()
    for (token in tokens) {
        when (token) {
            "+", "-", "*", "/" -> {
                val right = stack.removeLast()
                val left = stack.removeLast()
                stack.addLast(
                    when (token) {
                        "+" -> left + right
                        "-" -> left - right
                        "*" -> left * right
                        else -> left / right
                    }
                )
            }
            else -> stack.addLast(token.toInt())
        }
    }
    return stack.last()
}

fun main() {
    eq(evalRPN(arrayOf("2", "1", "+", "3", "*")), 9)
    eq(evalRPN(arrayOf("4", "13", "5", "/", "+")), 6)
    eq(
        evalRPN(arrayOf("10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+")),
        22,
    )
    eq(evalRPN(arrayOf("7", "-3", "/")), -2, "truncate toward zero, not -3")
    println("150 ok")
}
