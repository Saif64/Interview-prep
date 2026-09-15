@file:JvmName("TwoSum")
// 1. Two Sum — Easy
// https://leetcode.com/problems/two-sum/
// Pattern: Arrays & Hashing
// Time O(n) | Space O(n)
//
// Idea: one pass. For each number, ask the map whether its complement was already seen.
// The brute-force O(n^2) double loop is the thing an interviewer expects you to improve on.

package neetcode.arrayshashing

import neetcode.lib.eq

fun twoSum(nums: IntArray, target: Int): IntArray {
    val seen = HashMap<Int, Int>() // value -> index
    for (i in nums.indices) {
        seen[target - nums[i]]?.let { return intArrayOf(it, i) }
        seen[nums[i]] = i
    }
    return intArrayOf()
}

fun main() {
    eq(twoSum(intArrayOf(2, 7, 11, 15), 9), intArrayOf(0, 1))
    eq(twoSum(intArrayOf(3, 2, 4), 6), intArrayOf(1, 2))
    eq(twoSum(intArrayOf(3, 3), 6), intArrayOf(0, 1))
    eq(twoSum(intArrayOf(1, 2), 99), intArrayOf(), "no pair exists")
    println("1 ok")
}
