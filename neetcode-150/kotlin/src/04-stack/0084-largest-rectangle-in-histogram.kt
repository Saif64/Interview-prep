@file:JvmName("LargestRectangleInHistogram")
// 84. Largest Rectangle in Histogram — Hard
// https://leetcode.com/problems/largest-rectangle-in-histogram/
// Pattern: Stack (monotonic)
// Time O(n) | Space O(n)
//
// Idea: keep a stack of increasing bars. When a shorter bar arrives, every taller bar on the
// stack has just found its right boundary, so pop and settle it. The popped bar's left
// boundary is whatever sits underneath it — which is why the stack stores the start index,
// not just the height.

package neetcode.stack

import neetcode.lib.eq

fun largestRectangleArea(heights: IntArray): Int {
    val stack = ArrayDeque<Pair<Int, Int>>() // (startIndex, height), heights increasing
    var best = 0

    for (i in heights.indices) {
        var start = i
        while (stack.isNotEmpty() && stack.last().second > heights[i]) {
            val (index, height) = stack.removeLast()
            best = maxOf(best, height * (i - index))
            start = index // current bar extends back over everything it was taller than
        }
        stack.addLast(start to heights[i])
    }

    for ((index, height) in stack) best = maxOf(best, height * (heights.size - index))
    return best
}

fun main() {
    eq(largestRectangleArea(intArrayOf(2, 1, 5, 6, 2, 3)), 10)
    eq(largestRectangleArea(intArrayOf(2, 4)), 4)
    eq(largestRectangleArea(intArrayOf()), 0)
    eq(largestRectangleArea(intArrayOf(1, 1, 1, 1)), 4, "flat: whole width wins")
    eq(largestRectangleArea(intArrayOf(5, 4, 3, 2, 1)), 9)
    println("84 ok")
}
