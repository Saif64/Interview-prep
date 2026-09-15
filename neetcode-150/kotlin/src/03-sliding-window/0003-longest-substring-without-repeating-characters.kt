@file:JvmName("LongestSubstringWithoutRepeating")
// 3. Longest Substring Without Repeating Characters — Medium
// https://leetcode.com/problems/longest-substring-without-repeating-characters/
// Pattern: Sliding Window
// Time O(n) | Space O(min(n, alphabet))
//
// Idea: grow the window on the right; when a character repeats, jump the left edge past its
// previous occurrence. Storing the last index (not just "seen") makes the shrink O(1)
// instead of a one-step-at-a-time walk.

package neetcode.slidingwindow

import neetcode.lib.eq

fun lengthOfLongestSubstring(s: String): Int {
    val lastSeen = HashMap<Char, Int>()
    var left = 0
    var best = 0
    for (right in s.indices) {
        val previous = lastSeen[s[right]]
        if (previous != null && previous >= left) left = previous + 1
        lastSeen[s[right]] = right
        best = maxOf(best, right - left + 1)
    }
    return best
}

fun main() {
    eq(lengthOfLongestSubstring("abcabcbb"), 3)
    eq(lengthOfLongestSubstring("bbbbb"), 1)
    eq(lengthOfLongestSubstring("pwwkew"), 3)
    eq(lengthOfLongestSubstring(""), 0)
    eq(lengthOfLongestSubstring("abba"), 2, "left must never move backwards")
    println("3 ok")
}
