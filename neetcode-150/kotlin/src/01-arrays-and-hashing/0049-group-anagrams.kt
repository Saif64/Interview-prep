@file:JvmName("GroupAnagrams")
// 49. Group Anagrams — Medium
// https://leetcode.com/problems/group-anagrams/
// Pattern: Arrays & Hashing
// Time O(n * k) | Space O(n * k)   (n strings of length up to k)
//
// Idea: anagrams share a letter-count signature. Counting is O(k); sorting each string
// would also work but costs O(k log k).
//
// groupBy does the whole thing in one expression — this is the kind of place Kotlin's
// stdlib genuinely beats writing the loop by hand.

package neetcode.arrayshashing

import neetcode.lib.bagOfLists
import neetcode.lib.eq

fun groupAnagrams(strs: Array<String>): List<List<String>> =
    strs.groupBy { word ->
        val counts = IntArray(26)
        for (ch in word) counts[ch - 'a']++
        counts.joinToString(",")
    }.values.toList()

fun main() {
    eq(
        bagOfLists(groupAnagrams(arrayOf("eat", "tea", "tan", "ate", "nat", "bat"))),
        bagOfLists(listOf(listOf("bat"), listOf("nat", "tan"), listOf("ate", "eat", "tea"))),
    )
    eq(groupAnagrams(arrayOf("")), listOf(listOf("")))
    eq(groupAnagrams(arrayOf("a")), listOf(listOf("a")))
    println("49 ok")
}
