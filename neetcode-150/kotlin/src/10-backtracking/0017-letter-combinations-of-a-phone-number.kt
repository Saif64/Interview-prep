@file:JvmName("LetterCombinationsOfAPhoneNumber")
// 17. Letter Combinations of a Phone Number — Medium
// https://leetcode.com/problems/letter-combinations-of-a-phone-number/
// Pattern: Backtracking
// Time O(4^n * n) | Space O(n) recursion depth
//
// Idea: a cartesian product written as a DFS. One digit per level, one branch per letter.
// The empty input returning [] rather than [""] is the edge case graders check.

package neetcode.backtracking

import neetcode.lib.bag
import neetcode.lib.eq

private val KEYS = mapOf(
    '2' to "abc", '3' to "def", '4' to "ghi", '5' to "jkl",
    '6' to "mno", '7' to "pqrs", '8' to "tuv", '9' to "wxyz",
)

fun letterCombinations(digits: String): List<String> {
    if (digits.isEmpty()) return emptyList()
    val out = ArrayList<String>()

    fun build(index: Int, current: String) {
        if (index == digits.length) {
            out.add(current)
            return
        }
        for (ch in KEYS[digits[index]]!!) build(index + 1, current + ch)
    }

    build(0, "")
    return out
}

fun main() {
    eq(
        bag(letterCombinations("23")),
        bag(listOf("ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf")),
    )
    eq(letterCombinations(""), emptyList())
    eq(bag(letterCombinations("2")), bag(listOf("a", "b", "c")))
    eq(letterCombinations("79").size, 16, "two 4-letter keys")
    println("17 ok")
}
