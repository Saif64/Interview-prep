@file:JvmName("Subsets")
// 78. Subsets — Medium
// https://leetcode.com/problems/subsets/
// Pattern: Backtracking
// Time O(n * 2^n) | Space O(n)
//
// Idea: every element is either in or out — a binary choice per element, 2^n leaves.
// Unlike permutations there is no "complete" condition: every node of the tree is a valid
// answer, which is why the snapshot happens on entry rather than at a base case.

package neetcode.backtracking

import neetcode.lib.bagOfLists
import neetcode.lib.eq

fun subsets(nums: IntArray): List<List<Int>> {
    val out = ArrayList<List<Int>>()
    val current = ArrayList<Int>()

    fun build(start: Int) {
        out.add(ArrayList(current))
        for (i in start until nums.size) {
            current.add(nums[i])
            build(i + 1)
            current.removeAt(current.size - 1)
        }
    }

    build(0)
    return out
}

fun main() {
    eq(
        bagOfLists(subsets(intArrayOf(1, 2, 3))),
        bagOfLists(
            listOf(
                emptyList(), listOf(1), listOf(2), listOf(1, 2),
                listOf(3), listOf(1, 3), listOf(2, 3), listOf(1, 2, 3),
            )
        ),
    )
    eq(bagOfLists(subsets(intArrayOf(0))), bagOfLists(listOf(emptyList(), listOf(0))))
    eq(subsets(intArrayOf(1, 2, 3, 4, 5)).size, 32)
    eq(subsets(intArrayOf()), listOf(emptyList()))
    println("78 ok")
}
