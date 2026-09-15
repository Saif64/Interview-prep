@file:JvmName("MedianOfTwoSortedArrays")
// 4. Median of Two Sorted Arrays — Hard
// https://leetcode.com/problems/median-of-two-sorted-arrays/
// Pattern: Binary Search
// Time O(log(min(m, n))) | Space O(1)
//
// Idea: binary search the PARTITION point, not a value. Cut the shorter array so that the
// left halves of both arrays together hold exactly half the elements; the cut is correct
// when maxLeftA <= minRightB and maxLeftB <= minRightA.
// Infinities stand in for "nothing on that side", so the edge cases need no special casing.

package neetcode.binarysearch

import neetcode.lib.eq
import neetcode.lib.that

fun findMedianSortedArrays(nums1: IntArray, nums2: IntArray): Double {
    val (a, b) = if (nums1.size <= nums2.size) nums1 to nums2 else nums2 to nums1
    val total = a.size + b.size
    val half = total / 2

    var lo = 0
    var hi = a.size
    while (lo <= hi) {
        val cutA = lo + (hi - lo) / 2
        val cutB = half - cutA

        val maxLeftA = if (cutA > 0) a[cutA - 1] else Int.MIN_VALUE
        val minRightA = if (cutA < a.size) a[cutA] else Int.MAX_VALUE
        val maxLeftB = if (cutB > 0) b[cutB - 1] else Int.MIN_VALUE
        val minRightB = if (cutB < b.size) b[cutB] else Int.MAX_VALUE

        if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
            return if (total % 2 == 1) {
                minOf(minRightA, minRightB).toDouble()
            } else {
                (maxOf(maxLeftA, maxLeftB).toDouble() + minOf(minRightA, minRightB)) / 2.0
            }
        }
        if (maxLeftA > minRightB) hi = cutA - 1 else lo = cutA + 1
    }
    return 0.0
}

fun main() {
    eq(findMedianSortedArrays(intArrayOf(1, 3), intArrayOf(2)), 2.0)
    eq(findMedianSortedArrays(intArrayOf(1, 2), intArrayOf(3, 4)), 2.5)
    eq(findMedianSortedArrays(intArrayOf(), intArrayOf(1)), 1.0, "one side empty")
    eq(findMedianSortedArrays(intArrayOf(2), intArrayOf()), 2.0)
    eq(findMedianSortedArrays(intArrayOf(1, 2, 3, 4, 5), intArrayOf(6, 7, 8)), 4.5)

    // Cross-check against a brute-force merge on random inputs.
    val rng = java.util.Random(42)
    repeat(500) {
        fun randomSorted(n: Int) = IntArray(n) { rng.nextInt(20) }.sortedArray()
        val x = randomSorted(rng.nextInt(6))
        val y = randomSorted(rng.nextInt(6) + if (x.isEmpty()) 1 else 0)
        if (x.isEmpty() && y.isEmpty()) return@repeat
        val merged = (x + y).sortedArray()
        val mid = merged.size / 2
        val expected =
            if (merged.size % 2 == 1) merged[mid].toDouble()
            else (merged[mid - 1].toDouble() + merged[mid]) / 2.0
        that(
            findMedianSortedArrays(x, y) == expected,
            "median mismatch for ${x.toList()} | ${y.toList()}",
        )
    }
    println("4 ok")
}
