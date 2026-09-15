@file:JvmName("EditDistance")
// 72. Edit Distance — Medium
// https://leetcode.com/problems/edit-distance/
// Pattern: 2-D DP
// Time O(m * n) | Space O(n)
//
// Idea: Levenshtein distance. Matching characters cost nothing and move diagonally; otherwise
// pay 1 and take the cheapest of insert (left), delete (up), replace (diagonal).
// Base cases are the giveaway: turning a prefix into the empty string costs its length.

package neetcode.dp2d

import neetcode.lib.eq

fun minDistance(word1: String, word2: String): Int {
    var previous = IntArray(word2.length + 1) { it }

    for (i in 1..word1.length) {
        val current = IntArray(word2.length + 1)
        current[0] = i
        for (j in 1..word2.length) {
            current[j] =
                if (word1[i - 1] == word2[j - 1]) previous[j - 1]
                else 1 + minOf(previous[j - 1], previous[j], current[j - 1])
        }
        previous = current
    }
    return previous[word2.length]
}

fun main() {
    eq(minDistance("horse", "ros"), 3)
    eq(minDistance("intention", "execution"), 5)
    eq(minDistance("", "abc"), 3)
    eq(minDistance("abc", ""), 3)
    eq(minDistance("same", "same"), 0)
    println("72 ok")
}
