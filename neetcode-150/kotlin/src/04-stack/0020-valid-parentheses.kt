@file:JvmName("ValidParentheses")
// 20. Valid Parentheses — Easy
// https://leetcode.com/problems/valid-parentheses/
// Pattern: Stack
// Time O(n) | Space O(n)
//
// Idea: push openers, and on a closer check it matches the most recent opener.
// Two failure modes people forget: a closer with an empty stack, and leftovers at the end.

package neetcode.stack

import neetcode.lib.eq

private val PAIRS = mapOf(')' to '(', ']' to '[', '}' to '{')

fun isValid(s: String): Boolean {
    val stack = ArrayDeque<Char>()
    for (ch in s) {
        val opener = PAIRS[ch]
        if (opener != null) {
            if (stack.removeLastOrNull() != opener) return false
        } else {
            stack.addLast(ch)
        }
    }
    return stack.isEmpty()
}

fun main() {
    eq(isValid("()"), true)
    eq(isValid("()[]{}"), true)
    eq(isValid("(]"), false)
    eq(isValid("("), false, "unclosed opener")
    eq(isValid(")"), false, "closer with nothing to match")
    eq(isValid(""), true)
    println("20 ok")
}
