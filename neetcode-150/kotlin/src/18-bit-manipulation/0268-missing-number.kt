@file:JvmName("MissingNumber")
// 268. Missing Number — Easy
// https://leetcode.com/problems/missing-number/
// Pattern: Bit Manipulation
// Time O(n) | Space O(1)
//
// Idea: XOR every index 0..n together with every value. Each present number cancels with its
// index, leaving only the missing one.
// The Gauss-sum solution (n(n+1)/2 minus the actual sum) is equally valid and often the first
// one mentioned — XOR has the edge that it cannot overflow.

package neetcode.bits

import neetcode.lib.eq

fun missingNumber(nums: IntArray): Int {
    var result = nums.size
    for (i in nums.indices) result = result xor i xor nums[i]
    return result
}

fun main() {
    eq(missingNumber(intArrayOf(3, 0, 1)), 2)
    eq(missingNumber(intArrayOf(0, 1)), 2, "missing the largest")
    eq(missingNumber(intArrayOf(9, 6, 4, 2, 3, 5, 7, 0, 1)), 8)
    eq(missingNumber(intArrayOf(1)), 0, "missing zero")
    eq(missingNumber(intArrayOf(0)), 1)
    println("268 ok")
}
