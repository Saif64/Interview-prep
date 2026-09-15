@file:JvmName("CombinationSum")
// 39. Combination Sum — Medium
// https://leetcode.com/problems/combination-sum/
// Pattern: Backtracking
// Time O(2^(target/min)) | Space O(target/min)
//
// Idea: at each step either use the current candidate again (numbers may repeat) or move past
// it forever. Passing `start` rather than restarting from 0 is what stops [2,3] and [3,2] both
// appearing.

package neetcode.backtracking

import neetcode.lib.bagOfLists
import neetcode.lib.eq

fun combinationSum(candidates: IntArray, target: Int): List<List<Int>> {
    val out = ArrayList<List<Int>>()
    val current = ArrayList<Int>()

    fun build(start: Int, remaining: Int) {
        if (remaining == 0) {
            out.add(ArrayList(current))
            return
        }
        if (remaining < 0) return
        for (i in start until candidates.size) {
            current.add(candidates[i])
            build(i, remaining - candidates[i]) // i, not i + 1: reuse is allowed
            current.removeAt(current.size - 1)
        }
    }

    build(0, target)
    return out
}

fun main() {
    eq(
        bagOfLists(combinationSum(intArrayOf(2, 3, 6, 7), 7)),
        bagOfLists(listOf(listOf(2, 2, 3), listOf(7))),
    )
    eq(
        bagOfLists(combinationSum(intArrayOf(2, 3, 5), 8)),
        bagOfLists(listOf(listOf(2, 2, 2, 2), listOf(2, 3, 3), listOf(3, 5))),
    )
    eq(combinationSum(intArrayOf(2), 1), emptyList())
    eq(combinationSum(intArrayOf(7), 7), listOf(listOf(7)))
    println("39 ok")
}
