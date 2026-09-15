@file:JvmName("LongestRepeatingCharacterReplacement")
// 424. Longest Repeating Character Replacement — Medium
// https://leetcode.com/problems/longest-repeating-character-replacement/
// Pattern: Sliding Window
// Time O(n) | Space O(1)  (26 counters)
//
// Idea: a window is legal when (length - count of its most common character) <= k, i.e. the
// characters you would have to overwrite fit in the budget.
// `maxCount` is deliberately never decreased: the answer only grows, so a stale high value
// can never produce a longer-than-real result.

package neetcode.slidingwindow

import neetcode.lib.eq

fun characterReplacement(s: String, k: Int): Int {
    val counts = IntArray(26)
    var left = 0
    var maxCount = 0
    var best = 0

    for (right in s.indices) {
        counts[s[right] - 'A']++
        maxCount = maxOf(maxCount, counts[s[right] - 'A'])
        while (right - left + 1 - maxCount > k) {
            counts[s[left] - 'A']--
            left++
        }
        best = maxOf(best, right - left + 1)
    }
    return best
}

fun main() {
    eq(characterReplacement("ABAB", 2), 4)
    eq(characterReplacement("AABABBA", 1), 4)
    eq(characterReplacement("AAAA", 0), 4)
    eq(characterReplacement("", 2), 0)
    println("424 ok")
}
