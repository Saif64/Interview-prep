@file:JvmName("SubsetsII")
// 90. Subsets II — Medium
// https://leetcode.com/problems/subsets-ii/
// Pattern: Backtracking
// Time O(n * 2^n) | Space O(n)
//
// Idea: problem 78 plus the duplicate guard — sort, then at each level skip a value identical
// to the one just tried. "Sort + skip equal siblings" is the standard answer whenever the
// input may repeat; note the guard is `i > start`, not `i > 0`, so legitimately repeated
// values within one subset still survive.

package neetcode.backtracking

import neetcode.lib.bagOfLists
import neetcode.lib.eq

fun subsetsWithDup(nums: IntArray): List<List<Int>> {
    val sorted = nums.sortedArray()
    val out = ArrayList<List<Int>>()
    val current = ArrayList<Int>()

    fun build(start: Int) {
        out.add(ArrayList(current))
        for (i in start until sorted.size) {
            if (i > start && sorted[i] == sorted[i - 1]) continue
            current.add(sorted[i])
            build(i + 1)
            current.removeAt(current.size - 1)
        }
    }

    build(0)
    return out
}

fun main() {
    eq(
        bagOfLists(subsetsWithDup(intArrayOf(1, 2, 2))),
        bagOfLists(
            listOf(emptyList(), listOf(1), listOf(1, 2), listOf(1, 2, 2), listOf(2), listOf(2, 2))
        ),
    )
    eq(bagOfLists(subsetsWithDup(intArrayOf(0))), bagOfLists(listOf(emptyList(), listOf(0))))
    eq(subsetsWithDup(intArrayOf(1, 1, 1)).size, 4, "[], [1], [1,1], [1,1,1]")
    eq(subsetsWithDup(intArrayOf(4, 4, 4, 1, 4)).size, 10)
    println("90 ok")
}
