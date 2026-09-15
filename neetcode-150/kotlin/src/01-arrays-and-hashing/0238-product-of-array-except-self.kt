@file:JvmName("ProductOfArrayExceptSelf")
// 238. Product of Array Except Self — Medium
// https://leetcode.com/problems/product-of-array-except-self/
// Pattern: Arrays & Hashing
// Time O(n) | Space O(1) extra (the output array does not count)
//
// Idea: the answer at i is (everything left of i) * (everything right of i).
// Two sweeps carry those running products, so division is never needed — which matters
// because the problem forbids it and because a single zero would break the division trick.

package neetcode.arrayshashing

import neetcode.lib.eq

fun productExceptSelf(nums: IntArray): IntArray {
    val out = IntArray(nums.size) { 1 }

    var prefix = 1
    for (i in nums.indices) {
        out[i] = prefix
        prefix *= nums[i]
    }

    var suffix = 1
    for (i in nums.indices.reversed()) {
        out[i] *= suffix
        suffix *= nums[i]
    }
    return out
}

fun main() {
    eq(productExceptSelf(intArrayOf(1, 2, 3, 4)), intArrayOf(24, 12, 8, 6))
    eq(productExceptSelf(intArrayOf(-1, 1, 0, -3, 3)), intArrayOf(0, 0, 9, 0, 0))
    eq(productExceptSelf(intArrayOf(0, 0)), intArrayOf(0, 0), "two zeros")
    println("238 ok")
}
