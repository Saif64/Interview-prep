@file:JvmName("DistinctSubsequences")
// 115. Distinct Subsequences — Hard
// https://leetcode.com/problems/distinct-subsequences/
// Pattern: 2-D DP
// Time O(m * n) | Space O(n)
//
// Idea: dp[j] = number of ways to form t's first j characters from the part of s seen so far.
// When characters match you may either use this s character (dp[j-1] before the update) or
// skip it (dp[j]); when they do not match, only skipping is available.
// Iterating j DOWNWARD keeps dp[j-1] at its previous-row value, which the recurrence needs.

package neetcode.dp2d

import neetcode.lib.eq

fun numDistinct(s: String, t: String): Int {
    val dp = LongArray(t.length + 1)
    dp[0] = 1 // one way to form the empty target: take nothing

    for (ch in s) {
        for (j in t.length downTo 1) {
            if (t[j - 1] == ch) dp[j] += dp[j - 1]
        }
    }
    return dp[t.length].toInt()
}

fun main() {
    eq(numDistinct("rabbbit", "rabbit"), 3)
    eq(numDistinct("babgbag", "bag"), 5)
    eq(numDistinct("abc", ""), 1)
    eq(numDistinct("", "a"), 0)
    eq(numDistinct("aaa", "aa"), 3, "choose 2 of 3")
    println("115 ok")
}
