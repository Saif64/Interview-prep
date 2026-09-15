@file:JvmName("ThreeSum")
// 15. 3Sum — Medium
// https://leetcode.com/problems/3sum/
// Pattern: Two Pointers
// Time O(n^2) | Space O(1) extra (ignoring output and sort)
//
// Idea: sort, then fix the first number and run Two Sum II on the rest.
// Deduping is the part people get wrong: skip a repeated anchor, and after recording a
// triplet skip repeated values on both pointers.

package neetcode.twopointers

import neetcode.lib.bagOfLists
import neetcode.lib.eq

fun threeSum(nums: IntArray): List<List<Int>> {
    val sorted = nums.sortedArray()
    val out = ArrayList<List<Int>>()

    for (i in 0 until sorted.size - 2) {
        if (sorted[i] > 0) break // everything after is positive, sum cannot reach 0
        if (i > 0 && sorted[i] == sorted[i - 1]) continue // duplicate anchor

        var left = i + 1
        var right = sorted.size - 1
        while (left < right) {
            val sum = sorted[i] + sorted[left] + sorted[right]
            when {
                sum < 0 -> left++
                sum > 0 -> right--
                else -> {
                    out.add(listOf(sorted[i], sorted[left], sorted[right]))
                    left++
                    right--
                    while (left < right && sorted[left] == sorted[left - 1]) left++
                    while (left < right && sorted[right] == sorted[right + 1]) right--
                }
            }
        }
    }
    return out
}

fun main() {
    eq(
        bagOfLists(threeSum(intArrayOf(-1, 0, 1, 2, -1, -4))),
        bagOfLists(listOf(listOf(-1, -1, 2), listOf(-1, 0, 1))),
    )
    eq(threeSum(intArrayOf(0, 1, 1)), emptyList())
    eq(threeSum(intArrayOf(0, 0, 0)), listOf(listOf(0, 0, 0)))
    eq(threeSum(intArrayOf(0, 0, 0, 0)), listOf(listOf(0, 0, 0)), "dedupe survives extra zeros")
    println("15 ok")
}
