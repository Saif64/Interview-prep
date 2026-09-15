@file:JvmName("ValidParenthesisString")
// 678. Valid Parenthesis String — Medium
// https://leetcode.com/problems/valid-parenthesis-string/
// Pattern: Greedy
// Time O(n) | Space O(1)
//
// Idea: '*' is three characters at once, so track a RANGE of possible open counts instead of a
// single number. `low` assumes every '*' is ')', `high` assumes every '*' is '('.
// If `high` ever drops below zero there are unmatched ')' no matter what; clamping `low` at
// zero reflects that an over-closing guess was simply the wrong guess.
// Valid exactly when low reaches 0 — some assignment balances out.

package neetcode.greedy

import neetcode.lib.eq

fun checkValidString(s: String): Boolean {
    var low = 0 // minimum possible open brackets
    var high = 0 // maximum possible open brackets

    for (ch in s) {
        when (ch) {
            '(' -> { low++; high++ }
            ')' -> { low--; high-- }
            else -> { low--; high++ } // '*' as ')' or '('
        }
        if (high < 0) return false
        low = maxOf(low, 0)
    }
    return low == 0
}

fun main() {
    eq(checkValidString("()"), true)
    eq(checkValidString("(*)"), true)
    eq(checkValidString("(*))"), true)
    eq(checkValidString(")("), false)
    eq(checkValidString("("), false)
    eq(checkValidString("***"), true, "all can be empty")
    eq(checkValidString("(((**"), false)
    println("678 ok")
}
