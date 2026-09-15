@file:JvmName("JumpGameII")
// 45. Jump Game II — Medium
// https://leetcode.com/problems/jump-game-ii/
// Pattern: Greedy
// Time O(n) | Space O(1)
//
// Idea: an implicit BFS. Sweep the current "level" (everything reachable with the jumps spent
// so far) while computing the furthest index the next level can reach. Hitting the end of the
// level means one more jump was required.

package neetcode.greedy

import neetcode.lib.eq

fun jump(nums: IntArray): Int {
    var jumps = 0
    var currentEnd = 0
    var furthest = 0

    for (i in 0 until nums.size - 1) {
        furthest = maxOf(furthest, i + nums[i])
        if (i == currentEnd) {
            jumps++
            currentEnd = furthest
        }
    }
    return jumps
}

fun main() {
    eq(jump(intArrayOf(2, 3, 1, 1, 4)), 2)
    eq(jump(intArrayOf(2, 3, 0, 1, 4)), 2)
    eq(jump(intArrayOf(0)), 0, "already there")
    eq(jump(intArrayOf(1, 2)), 1)
    eq(jump(intArrayOf(1, 1, 1, 1)), 3)
    println("45 ok")
}
