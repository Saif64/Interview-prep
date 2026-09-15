@file:JvmName("LongestPalindromicSubstring")
// 5. Longest Palindromic Substring — Medium
// https://leetcode.com/problems/longest-palindromic-substring/
// Pattern: 1-D DP / expand around centre
// Time O(n^2) | Space O(1)
//
// Idea: every palindrome has a centre, and there are 2n - 1 of them (n characters plus n - 1
// gaps). Expand outward from each. Handling the even case via the gap centres is the part
// people miss.
// Manacher's algorithm does this in O(n) — worth naming, rarely worth writing.

package neetcode.dp1d

import neetcode.lib.eq
import neetcode.lib.that

fun longestPalindrome(s: String): String {
    var start = 0
    var length = 0

    fun expand(from: Int, to: Int) {
        var left = from
        var right = to
        while (left >= 0 && right < s.length && s[left] == s[right]) {
            left--
            right++
        }
        if (right - left - 1 > length) {
            length = right - left - 1
            start = left + 1
        }
    }

    for (i in s.indices) {
        expand(i, i) // odd length
        expand(i, i + 1) // even length
    }
    return s.substring(start, start + length)
}

fun main() {
    that(longestPalindrome("babad") in listOf("bab", "aba"))
    eq(longestPalindrome("cbbd"), "bb", "even-length centre")
    eq(longestPalindrome("a"), "a")
    eq(longestPalindrome(""), "")
    eq(longestPalindrome("ac").length, 1)
    eq(longestPalindrome("aaaa"), "aaaa")
    println("5 ok")
}
