@file:JvmName("ValidAnagram")
// 242. Valid Anagram — Easy
// https://leetcode.com/problems/valid-anagram/
// Pattern: Arrays & Hashing
// Time O(n) | Space O(1)  (at most 26 counters)
//
// Idea: count up for s, count down for t, then assert every counter landed on zero.
// Follow-up worth saying out loud: for full Unicode, swap the 26-slot array for a Map.

package neetcode.arrayshashing

import neetcode.lib.eq

fun isAnagram(s: String, t: String): Boolean {
    if (s.length != t.length) return false
    val counts = IntArray(26)
    for (i in s.indices) {
        counts[s[i] - 'a']++
        counts[t[i] - 'a']--
    }
    return counts.all { it == 0 }
}

fun main() {
    eq(isAnagram("anagram", "nagaram"), true)
    eq(isAnagram("rat", "car"), false)
    eq(isAnagram("a", "ab"), false, "different lengths")
    println("242 ok")
}
