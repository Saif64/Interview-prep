@file:JvmName("ContainerWithMostWater")
// 11. Container With Most Water — Medium
// https://leetcode.com/problems/container-with-most-water/
// Pattern: Two Pointers
// Time O(n) | Space O(1)
//
// Idea: start at the widest pair and always move the shorter wall inward.
// Moving the taller wall can only shrink the width while the height stays capped by the
// shorter wall, so it can never improve the area — that is why the greedy step is safe.

package neetcode.twopointers

import neetcode.lib.eq

fun maxArea(height: IntArray): Int {
    var left = 0
    var right = height.size - 1
    var best = 0
    while (left < right) {
        best = maxOf(best, (right - left) * minOf(height[left], height[right]))
        if (height[left] < height[right]) left++ else right--
    }
    return best
}

fun main() {
    eq(maxArea(intArrayOf(1, 8, 6, 2, 5, 4, 8, 3, 7)), 49)
    eq(maxArea(intArrayOf(1, 1)), 1)
    eq(maxArea(intArrayOf(1, 2, 1)), 2)
    println("11 ok")
}
