@file:JvmName("TrappingRainWater")
// 42. Trapping Rain Water — Hard
// https://leetcode.com/problems/trapping-rain-water/
// Pattern: Two Pointers
// Time O(n) | Space O(1)
//
// Idea: water above a bar = min(tallest left, tallest right) - its height.
// Walking inward from both ends, whichever side is currently shorter is the side whose
// answer is already decided, so it can be resolved and stepped past.

package neetcode.twopointers

import neetcode.lib.eq

fun trap(height: IntArray): Int {
    if (height.size < 3) return 0
    var left = 0
    var right = height.size - 1
    var maxLeft = height[left]
    var maxRight = height[right]
    var water = 0

    while (left < right) {
        if (maxLeft <= maxRight) {
            left++
            maxLeft = maxOf(maxLeft, height[left])
            water += maxLeft - height[left]
        } else {
            right--
            maxRight = maxOf(maxRight, height[right])
            water += maxRight - height[right]
        }
    }
    return water
}

fun main() {
    eq(trap(intArrayOf(0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1)), 6)
    eq(trap(intArrayOf(4, 2, 0, 3, 2, 5)), 9)
    eq(trap(intArrayOf()), 0)
    eq(trap(intArrayOf(3, 2, 1)), 0, "monotonic traps nothing")
    println("42 ok")
}
