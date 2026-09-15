@file:JvmName("SearchInRotatedSortedArray")
// 33. Search in Rotated Sorted Array — Medium
// https://leetcode.com/problems/search-in-rotated-sorted-array/
// Pattern: Binary Search
// Time O(log n) | Space O(1)
//
// Idea: after a rotation at least one half of any slice is still sorted. Work out which half
// that is, check whether the target falls inside its known range, and discard the other half.

package neetcode.binarysearch

import neetcode.lib.eq

fun searchRotated(nums: IntArray, target: Int): Int {
    var lo = 0
    var hi = nums.size - 1
    while (lo <= hi) {
        val mid = lo + (hi - lo) / 2
        if (nums[mid] == target) return mid

        if (nums[lo] <= nums[mid]) {
            // left half is sorted
            if (target >= nums[lo] && target < nums[mid]) hi = mid - 1 else lo = mid + 1
        } else {
            // right half is sorted
            if (target > nums[mid] && target <= nums[hi]) lo = mid + 1 else hi = mid - 1
        }
    }
    return -1
}

fun main() {
    eq(searchRotated(intArrayOf(4, 5, 6, 7, 0, 1, 2), 0), 4)
    eq(searchRotated(intArrayOf(4, 5, 6, 7, 0, 1, 2), 3), -1)
    eq(searchRotated(intArrayOf(1), 0), -1)
    eq(searchRotated(intArrayOf(1, 3), 3), 1)
    eq(searchRotated(intArrayOf(3, 1), 1), 1, "rotation point right next to lo")
    println("33 ok")
}
