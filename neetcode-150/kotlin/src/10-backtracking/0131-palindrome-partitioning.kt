@file:JvmName("PalindromePartitioning")
// 131. Palindrome Partitioning — Medium
// https://leetcode.com/problems/palindrome-partitioning/
// Pattern: Backtracking
// Time O(n * 2^n) | Space O(n)
//
// Idea: choose where the first cut goes. If the prefix is a palindrome, recurse on the rest.
// The palindrome check prunes the tree hard, which is why this stays tractable.

package neetcode.backtracking

import neetcode.lib.bagOfLists
import neetcode.lib.eq

private fun isPalindrome(s: String, from: Int, to: Int): Boolean {
    var left = from
    var right = to
    while (left < right) {
        if (s[left++] != s[right--]) return false
    }
    return true
}

fun partition(s: String): List<List<String>> {
    val out = ArrayList<List<String>>()
    val current = ArrayList<String>()

    fun build(start: Int) {
        if (start == s.length) {
            out.add(ArrayList(current))
            return
        }
        for (end in start until s.length) {
            if (!isPalindrome(s, start, end)) continue
            current.add(s.substring(start, end + 1))
            build(end + 1)
            current.removeAt(current.size - 1)
        }
    }

    build(0)
    return out
}

fun main() {
    eq(
        bagOfLists(partition("aab")),
        bagOfLists(listOf(listOf("a", "a", "b"), listOf("aa", "b"))),
    )
    eq(partition("a"), listOf(listOf("a")))
    eq(partition("aaa").size, 4)
    eq(partition("ab"), listOf(listOf("a", "b")), "only the all-singles cut works")
    println("131 ok")
}
