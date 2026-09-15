@file:JvmName("BinarySearch")
// 704. Binary Search — Easy
// https://leetcode.com/problems/binary-search/
// Pattern: Binary Search
// Time O(log n) | Space O(1)
//
// The template every other problem in this folder is a variation of. Two details worth being
// deliberate about: `lo <= hi` with `hi = size - 1` (an inclusive range), and computing mid
// as lo + (hi - lo) / 2 rather than (lo + hi) / 2, which can overflow on large indices.

package neetcode.binarysearch

import neetcode.lib.eq

fun binarySearch(nums: IntArray, target: Int): Int {
    var lo = 0
    var hi = nums.size - 1
    while (lo <= hi) {
        val mid = lo + (hi - lo) / 2
        when {
            nums[mid] == target -> return mid
            nums[mid] < target -> lo = mid + 1
            else -> hi = mid - 1
        }
    }
    return -1
}

fun main() {
    eq(binarySearch(intArrayOf(-1, 0, 3, 5, 9, 12), 9), 4)
    eq(binarySearch(intArrayOf(-1, 0, 3, 5, 9, 12), 2), -1)
    eq(binarySearch(intArrayOf(), 1), -1)
    eq(binarySearch(intArrayOf(5), 5), 0)
    println("704 ok")
}
