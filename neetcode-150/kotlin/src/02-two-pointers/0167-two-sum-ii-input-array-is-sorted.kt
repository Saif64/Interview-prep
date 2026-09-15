@file:JvmName("TwoSumII")
// 167. Two Sum II - Input Array Is Sorted — Medium
// https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
// Pattern: Two Pointers
// Time O(n) | Space O(1)
//
// Idea: sortedness replaces the hash map. Sum too small -> only a bigger left can help;
// too large -> only a smaller right can. The answer is 1-indexed.

package neetcode.twopointers

import neetcode.lib.eq

fun twoSumSorted(numbers: IntArray, target: Int): IntArray {
    var left = 0
    var right = numbers.size - 1
    while (left < right) {
        val sum = numbers[left] + numbers[right]
        when {
            sum == target -> return intArrayOf(left + 1, right + 1)
            sum < target -> left++
            else -> right--
        }
    }
    return intArrayOf()
}

fun main() {
    eq(twoSumSorted(intArrayOf(2, 7, 11, 15), 9), intArrayOf(1, 2))
    eq(twoSumSorted(intArrayOf(2, 3, 4), 6), intArrayOf(1, 3))
    eq(twoSumSorted(intArrayOf(-1, 0), -1), intArrayOf(1, 2))
    println("167 ok")
}
