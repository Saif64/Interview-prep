@file:JvmName("RegularExpressionMatching")
// 10. Regular Expression Matching — Hard
// https://leetcode.com/problems/regular-expression-matching/
// Pattern: 2-D DP
// Time O(m * n) | Space O(m * n)
//
// Idea: dp[i][j] = "does s[0..i) match p[0..j)?". '.' matches any single character;
// 'x*' is the hard case and has exactly two readings:
//   - zero occurrences: drop the whole "x*" pair  -> dp[i][j-2]
//   - one more occurrence: if x matches s[i-1]    -> dp[i-1][j]
// The empty-string row also matters: "a*b*" matches "" and must be seeded correctly.

package neetcode.dp2d

import neetcode.lib.eq

fun isMatch(s: String, p: String): Boolean {
    val m = s.length
    val n = p.length
    val dp = Array(m + 1) { BooleanArray(n + 1) }
    dp[0][0] = true

    for (j in 1..n) {
        if (p[j - 1] == '*') dp[0][j] = dp[0][j - 2]
    }

    for (i in 1..m) {
        for (j in 1..n) {
            if (p[j - 1] == '*') {
                val zero = dp[i][j - 2]
                val charMatches = p[j - 2] == '.' || p[j - 2] == s[i - 1]
                dp[i][j] = zero || (charMatches && dp[i - 1][j])
            } else if (p[j - 1] == '.' || p[j - 1] == s[i - 1]) {
                dp[i][j] = dp[i - 1][j - 1]
            }
        }
    }
    return dp[m][n]
}

fun main() {
    eq(isMatch("aa", "a"), false)
    eq(isMatch("aa", "a*"), true)
    eq(isMatch("ab", ".*"), true)
    eq(isMatch("aab", "c*a*b"), true)
    eq(isMatch("mississippi", "mis*is*p*."), false)
    eq(isMatch("", "a*b*"), true, "star can match nothing")
    eq(isMatch("", ""), true)
    eq(isMatch("a", ""), false)
    println("10 ok")
}
