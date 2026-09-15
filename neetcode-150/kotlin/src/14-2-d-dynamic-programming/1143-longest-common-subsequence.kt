@file:JvmName("LongestCommonSubsequence")
// 1143. Longest Common Subsequence — Medium
// https://leetcode.com/problems/longest-common-subsequence/
// Pattern: 2-D DP
// Time O(m * n) | Space O(min(m, n))
//
// Idea: the archetypal grid DP. Matching characters extend the diagonal by one; otherwise
// take the better of dropping one character from either string.
// Subsequence, not substring — the characters need not be adjacent.

package neetcode.dp2d

import neetcode.lib.eq

fun longestCommonSubsequence(text1: String, text2: String): Int {
    val (a, b) = if (text1.length >= text2.length) text1 to text2 else text2 to text1
    var previous = IntArray(b.length + 1)

    for (i in 1..a.length) {
        val current = IntArray(b.length + 1)
        for (j in 1..b.length) {
            current[j] =
                if (a[i - 1] == b[j - 1]) previous[j - 1] + 1
                else maxOf(previous[j], current[j - 1])
        }
        previous = current
    }
    return previous[b.length]
}

fun main() {
    eq(longestCommonSubsequence("abcde", "ace"), 3)
    eq(longestCommonSubsequence("abc", "abc"), 3)
    eq(longestCommonSubsequence("abc", "def"), 0)
    eq(longestCommonSubsequence("", "abc"), 0)
    eq(longestCommonSubsequence("bsbininm", "jmjkbkjkv"), 1)
    println("1143 ok")
}
