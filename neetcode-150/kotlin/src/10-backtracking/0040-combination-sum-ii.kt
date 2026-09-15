@file:JvmName("CombinationSumII")
// 40. Combination Sum II — Medium
// https://leetcode.com/problems/combination-sum-ii/
// Pattern: Backtracking
// Time O(2^n) | Space O(n)
//
// Idea: each number may be used once, but the input contains duplicates, so the same multiset
// can be reached by different paths. Sort first, then skip a candidate that equals its
// predecessor AT THE SAME recursion level (`i > start`). Skipping whenever it equals the
// predecessor would wrongly forbid legitimately repeated values like [1,1,6].

package neetcode.backtracking

import neetcode.lib.bagOfLists
import neetcode.lib.eq

fun combinationSum2(candidates: IntArray, target: Int): List<List<Int>> {
    val sorted = candidates.sortedArray()
    val out = ArrayList<List<Int>>()
    val current = ArrayList<Int>()

    fun build(start: Int, remaining: Int) {
        if (remaining == 0) {
            out.add(ArrayList(current))
            return
        }
        for (i in start until sorted.size) {
            if (sorted[i] > remaining) break // sorted: everything after is worse
            if (i > start && sorted[i] == sorted[i - 1]) continue // duplicate branch
            current.add(sorted[i])
            build(i + 1, remaining - sorted[i])
            current.removeAt(current.size - 1)
        }
    }

    build(0, target)
    return out
}

fun main() {
    eq(
        bagOfLists(combinationSum2(intArrayOf(10, 1, 2, 7, 6, 1, 5), 8)),
        bagOfLists(listOf(listOf(1, 1, 6), listOf(1, 2, 5), listOf(1, 7), listOf(2, 6))),
    )
    eq(
        bagOfLists(combinationSum2(intArrayOf(2, 5, 2, 1, 2), 5)),
        bagOfLists(listOf(listOf(1, 2, 2), listOf(5))),
    )
    eq(combinationSum2(intArrayOf(1), 2), emptyList())
    println("40 ok")
}
