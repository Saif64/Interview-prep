@file:JvmName("FindMinimumInRotatedSortedArray")
// 153. Find Minimum in Rotated Sorted Array — Medium
// https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
// Pattern: Binary Search
// Time O(log n) | Space O(1)
//
// Idea: compare mid against the RIGHT end, not the left. If nums[mid] > nums[hi] the
// rotation point is strictly right of mid; otherwise mid could itself be the minimum, so
// hi = mid (not mid - 1). Comparing against lo instead breaks on a non-rotated array.

package neetcode.binarysearch

import neetcode.lib.eq

fun findMin(nums: IntArray): Int {
    var lo = 0
    var hi = nums.size - 1
    while (lo < hi) {
        val mid = lo + (hi - lo) / 2
        if (nums[mid] > nums[hi]) lo = mid + 1 else hi = mid
    }
    return nums[lo]
}

fun main() {
    eq(findMin(intArrayOf(3, 4, 5, 1, 2)), 1)
    eq(findMin(intArrayOf(4, 5, 6, 7, 0, 1, 2)), 0)
    eq(findMin(intArrayOf(11, 13, 15, 17)), 11, "not rotated at all")
    eq(findMin(intArrayOf(2, 1)), 1)
    eq(findMin(intArrayOf(1)), 1)
    println("153 ok")
}
