@file:JvmName("InterleavingString")
// 97. Interleaving String — Medium
// https://leetcode.com/problems/interleaving-string/
// Pattern: 2-D DP
// Time O(m * n) | Space O(n)
//
// Idea: dp[i][j] = "can s1's first i characters and s2's first j characters interleave into
// s3's first i + j?". Each step consumes one character from s1 or from s2.
// Greedy fails: when both candidates match, only one branch may lead to a solution, and DP
// explores both without the exponential blowup.

package neetcode.dp2d

import neetcode.lib.eq

fun isInterleave(s1: String, s2: String, s3: String): Boolean {
    if (s1.length + s2.length != s3.length) return false

    var previous = BooleanArray(s2.length + 1)
    previous[0] = true
    for (j in 1..s2.length) previous[j] = previous[j - 1] && s2[j - 1] == s3[j - 1]

    for (i in 1..s1.length) {
        val current = BooleanArray(s2.length + 1)
        current[0] = previous[0] && s1[i - 1] == s3[i - 1]
        for (j in 1..s2.length) {
            current[j] =
                (previous[j] && s1[i - 1] == s3[i + j - 1]) ||
                    (current[j - 1] && s2[j - 1] == s3[i + j - 1])
        }
        previous = current
    }
    return previous[s2.length]
}

fun main() {
    eq(isInterleave("aabcc", "dbbca", "aadbbcbcac"), true)
    eq(isInterleave("aabcc", "dbbca", "aadbbbaccc"), false)
    eq(isInterleave("", "", ""), true)
    eq(isInterleave("a", "", "a"), true)
    eq(isInterleave("a", "b", "ab"), true)
    eq(isInterleave("abc", "def", "abcdefg"), false, "length mismatch")
    println("97 ok")
}
