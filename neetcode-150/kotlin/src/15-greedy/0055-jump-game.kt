@file:JvmName("JumpGame")
// 55. Jump Game — Medium
// https://leetcode.com/problems/jump-game/
// Pattern: Greedy
// Time O(n) | Space O(1)
//
// Idea: track the furthest index reachable so far. If the loop ever stands on an index beyond
// that reach, there is a gap nothing can cross.
// The DP solution is O(n^2); the greedy one is the expected answer.

package neetcode.greedy

import neetcode.lib.eq

fun canJump(nums: IntArray): Boolean {
    var reach = 0
    for (i in nums.indices) {
        if (i > reach) return false
        reach = maxOf(reach, i + nums[i])
    }
    return true
}

fun main() {
    eq(canJump(intArrayOf(2, 3, 1, 1, 4)), true)
    eq(canJump(intArrayOf(3, 2, 1, 0, 4)), false)
    eq(canJump(intArrayOf(0)), true, "already at the end")
    eq(canJump(intArrayOf(1, 0)), true)
    eq(canJump(intArrayOf(0, 1)), false)
    println("55 ok")
}
