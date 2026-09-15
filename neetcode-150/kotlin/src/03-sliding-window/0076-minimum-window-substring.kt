@file:JvmName("MinimumWindowSubstring")
// 76. Minimum Window Substring — Hard
// https://leetcode.com/problems/minimum-window-substring/
// Pattern: Sliding Window
// Time O(n + m) | Space O(alphabet)
//
// Idea: expand right until the window covers t, then shrink from the left while it still
// does. `have`/`required` counts how many distinct characters are fully satisfied, so
// checking "is the window valid?" stays O(1) instead of rescanning the map each step.

package neetcode.slidingwindow

import neetcode.lib.eq

fun minWindow(s: String, t: String): String {
    if (t.isEmpty() || s.length < t.length) return ""

    val need = HashMap<Char, Int>()
    for (ch in t) need[ch] = (need[ch] ?: 0) + 1

    val window = HashMap<Char, Int>()
    var have = 0
    val required = need.size
    var bestStart = 0
    var bestLength = Int.MAX_VALUE
    var left = 0

    for (right in s.indices) {
        val ch = s[right]
        window[ch] = (window[ch] ?: 0) + 1
        if (need.containsKey(ch) && window[ch] == need[ch]) have++

        while (have == required) {
            if (right - left + 1 < bestLength) {
                bestLength = right - left + 1
                bestStart = left
            }
            val leftCh = s[left]
            window[leftCh] = window[leftCh]!! - 1
            if (need.containsKey(leftCh) && window[leftCh]!! < need[leftCh]!!) have--
            left++
        }
    }
    return if (bestLength == Int.MAX_VALUE) "" else s.substring(bestStart, bestStart + bestLength)
}

fun main() {
    eq(minWindow("ADOBECODEBANC", "ABC"), "BANC")
    eq(minWindow("a", "a"), "a")
    eq(minWindow("a", "aa"), "", "duplicates in t must be counted, not deduped")
    eq(minWindow("", "a"), "")
    println("76 ok")
}
