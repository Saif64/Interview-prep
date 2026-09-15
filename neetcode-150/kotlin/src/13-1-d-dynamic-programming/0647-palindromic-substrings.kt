@file:JvmName("PalindromicSubstrings")
// 647. Palindromic Substrings — Medium
// https://leetcode.com/problems/palindromic-substrings/
// Pattern: 1-D DP / expand around centre
// Time O(n^2) | Space O(1)
//
// Idea: problem 5 with a counter instead of a maximum. Each successful expansion step is one
// more palindromic substring.

package neetcode.dp1d

import neetcode.lib.eq

fun countSubstrings(s: String): Int {
    var count = 0

    fun expand(from: Int, to: Int) {
        var left = from
        var right = to
        while (left >= 0 && right < s.length && s[left] == s[right]) {
            count++
            left--
            right++
        }
    }

    for (i in s.indices) {
        expand(i, i)
        expand(i, i + 1)
    }
    return count
}

fun main() {
    eq(countSubstrings("abc"), 3)
    eq(countSubstrings("aaa"), 6)
    eq(countSubstrings(""), 0)
    eq(countSubstrings("a"), 1)
    eq(countSubstrings("aba"), 4, "a, b, a, aba")
    println("647 ok")
}
