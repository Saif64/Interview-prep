@file:JvmName("SlidingWindowMaximum")
// 239. Sliding Window Maximum — Hard
// https://leetcode.com/problems/sliding-window-maximum/
// Pattern: Sliding Window (monotonic deque)
// Time O(n) | Space O(k)
//
// Idea: keep a deque of indices whose values decrease. A new value evicts every smaller
// value behind it — those can never be the max again while the new one is in the window.
// The front is therefore always the current maximum.

package neetcode.slidingwindow

import neetcode.lib.eq

fun maxSlidingWindow(nums: IntArray, k: Int): IntArray {
    val deque = ArrayDeque<Int>() // indices, values strictly decreasing
    val out = ArrayList<Int>()

    for (i in nums.indices) {
        while (deque.isNotEmpty() && nums[deque.last()] <= nums[i]) deque.removeLast()
        deque.addLast(i)
        if (deque.first() <= i - k) deque.removeFirst() // front slid out of the window
        if (i >= k - 1) out.add(nums[deque.first()])
    }
    return out.toIntArray()
}

fun main() {
    eq(maxSlidingWindow(intArrayOf(1, 3, -1, -3, 5, 3, 6, 7), 3), intArrayOf(3, 3, 5, 5, 6, 7))
    eq(maxSlidingWindow(intArrayOf(1), 1), intArrayOf(1))
    eq(maxSlidingWindow(intArrayOf(7, 2, 4), 2), intArrayOf(7, 4))
    eq(maxSlidingWindow(intArrayOf(1, -1), 1), intArrayOf(1, -1))
    println("239 ok")
}
