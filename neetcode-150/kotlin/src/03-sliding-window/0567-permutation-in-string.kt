@file:JvmName("PermutationInString")
// 567. Permutation in String — Medium
// https://leetcode.com/problems/permutation-in-string/
// Pattern: Sliding Window
// Time O(n) | Space O(1)
//
// Idea: a permutation is just a letter-count match, so slide a fixed-size window over s2 and
// compare counts. `matches` tracks how many of the 26 counters already agree, turning the
// per-step comparison from O(26) into O(1).

package neetcode.slidingwindow

import neetcode.lib.eq

fun checkInclusion(s1: String, s2: String): Boolean {
    if (s1.length > s2.length) return false

    val need = IntArray(26)
    val window = IntArray(26)
    for (i in s1.indices) {
        need[s1[i] - 'a']++
        window[s2[i] - 'a']++
    }

    var matches = (0 until 26).count { need[it] == window[it] }

    for (right in s1.length until s2.length) {
        if (matches == 26) return true

        val add = s2[right] - 'a'
        window[add]++
        if (window[add] == need[add]) matches++ else if (window[add] == need[add] + 1) matches--

        val remove = s2[right - s1.length] - 'a'
        window[remove]--
        if (window[remove] == need[remove]) matches++
        else if (window[remove] == need[remove] - 1) matches--
    }
    return matches == 26
}

fun main() {
    eq(checkInclusion("ab", "eidbaooo"), true)
    eq(checkInclusion("ab", "eidboaoo"), false)
    eq(checkInclusion("adc", "dcda"), true)
    eq(checkInclusion("abc", "ab"), false)
    eq(checkInclusion("a", "a"), true, "window never slides")
    println("567 ok")
}
