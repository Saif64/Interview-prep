@file:JvmName("WordBreak")
// 139. Word Break — Medium
// https://leetcode.com/problems/word-break/
// Pattern: 1-D DP
// Time O(n^2 * maxWordLength) | Space O(n)
//
// Idea: dp[i] = "can s[0..i) be built from the dictionary?". dp[i] is true when some word ends
// at i and dp[start-of-that-word] is true. Plain recursion re-explores the same suffixes
// exponentially — the memo is the whole point.

package neetcode.dp1d

import neetcode.lib.eq

fun wordBreak(s: String, wordDict: List<String>): Boolean {
    val words = wordDict.toHashSet()
    val dp = BooleanArray(s.length + 1)
    dp[0] = true // the empty prefix is always buildable

    for (end in 1..s.length) {
        for (start in 0 until end) {
            if (dp[start] && s.substring(start, end) in words) {
                dp[end] = true
                break
            }
        }
    }
    return dp[s.length]
}

fun main() {
    eq(wordBreak("leetcode", listOf("leet", "code")), true)
    eq(wordBreak("applepenapple", listOf("apple", "pen")), true, "reuse allowed")
    eq(wordBreak("catsandog", listOf("cats", "dog", "sand", "and", "cat")), false)
    eq(wordBreak("", listOf("a")), true)
    eq(wordBreak("a", emptyList()), false)
    eq(wordBreak("aaaaaaa", listOf("aaaa", "aaa")), true, "greedy longest-first would fail")
    println("139 ok")
}
