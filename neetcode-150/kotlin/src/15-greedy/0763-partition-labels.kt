@file:JvmName("PartitionLabels")
// 763. Partition Labels — Medium
// https://leetcode.com/problems/partition-labels/
// Pattern: Greedy
// Time O(n) | Space O(1)  (26 entries)
//
// Idea: a partition cannot end before the last occurrence of every character inside it.
// Precompute each character's last index, then sweep, extending the current partition's end
// as needed. Reaching that end means the partition is closed.

package neetcode.greedy

import neetcode.lib.eq

fun partitionLabels(s: String): List<Int> {
    val lastIndex = HashMap<Char, Int>()
    s.forEachIndexed { i, ch -> lastIndex[ch] = i }

    val out = ArrayList<Int>()
    var start = 0
    var end = 0
    for (i in s.indices) {
        end = maxOf(end, lastIndex[s[i]]!!)
        if (i == end) {
            out.add(end - start + 1)
            start = i + 1
        }
    }
    return out
}

fun main() {
    eq(partitionLabels("ababcbacadefegdehijhklij"), listOf(9, 7, 8))
    eq(partitionLabels("eccbbbbdec"), listOf(10), "one indivisible block")
    eq(partitionLabels("a"), listOf(1))
    eq(partitionLabels("abc"), listOf(1, 1, 1))
    eq(partitionLabels(""), emptyList())
    println("763 ok")
}
