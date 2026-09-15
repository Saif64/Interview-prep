@file:JvmName("BurstBalloons")
// 312. Burst Balloons — Hard
// https://leetcode.com/problems/burst-balloons/
// Pattern: 2-D DP (interval DP)
// Time O(n^3) | Space O(n^2)
//
// Idea: the inversion that makes this solvable — ask which balloon is burst LAST in an
// interval, not first. If i is last, its neighbours are the interval's boundaries (still
// intact), so the subproblems on either side become independent.
// Padding with 1s at both ends removes all the edge handling.

package neetcode.dp2d

import neetcode.lib.eq

fun maxCoins(nums: IntArray): Int {
    val balloons = intArrayOf(1, *nums.toTypedArray().toIntArray(), 1)
    val n = balloons.size
    val dp = Array(n) { IntArray(n) }

    // left and right are exclusive boundaries never burst within this subproblem.
    for (length in 2 until n) {
        for (left in 0 until n - length) {
            val right = left + length
            for (last in left + 1 until right) {
                dp[left][right] = maxOf(
                    dp[left][right],
                    dp[left][last] +
                        balloons[left] * balloons[last] * balloons[right] +
                        dp[last][right],
                )
            }
        }
    }
    return dp[0][n - 1]
}

fun main() {
    eq(maxCoins(intArrayOf(3, 1, 5, 8)), 167)
    eq(maxCoins(intArrayOf(1, 5)), 10)
    eq(maxCoins(intArrayOf(5)), 5)
    eq(maxCoins(intArrayOf()), 0)
    eq(maxCoins(intArrayOf(7, 9, 8, 0, 7, 1, 3, 5, 5, 2, 3)), 1654)
    println("312 ok")
}
