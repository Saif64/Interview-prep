@file:JvmName("ContainsDuplicate")
// 217. Contains Duplicate — Easy
// https://leetcode.com/problems/contains-duplicate/
// Pattern: Arrays & Hashing
// Time O(n) | Space O(n)
//
// Idea: a Set drops duplicates, so a size mismatch means there was at least one.
// If the interviewer asks for O(1) space, sort first and compare neighbours — O(n log n).

package neetcode.arrayshashing

import neetcode.lib.eq

fun containsDuplicate(nums: IntArray): Boolean = nums.toHashSet().size != nums.size

fun main() {
    eq(containsDuplicate(intArrayOf(1, 2, 3, 1)), true)
    eq(containsDuplicate(intArrayOf(1, 2, 3, 4)), false)
    eq(containsDuplicate(intArrayOf()), false)
    println("217 ok")
}
