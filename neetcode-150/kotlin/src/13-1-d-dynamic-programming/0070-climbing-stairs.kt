@file:JvmName("ClimbingStairs")
// 70. Climbing Stairs — Easy
// https://leetcode.com/problems/climbing-stairs/
// Pattern: 1-D DP
// Time O(n) | Space O(1)
//
// Idea: to reach step n you came from n-1 or n-2, so ways(n) = ways(n-1) + ways(n-2).
// It is Fibonacci. Only the last two values are ever needed, so the whole table collapses to
// two variables — the standard "rolling" optimisation.

package neetcode.dp1d

import neetcode.lib.eq

fun climbStairs(n: Int): Int {
    var prev = 1
    var current = 1
    repeat(maxOf(0, n - 1)) {
        val next = prev + current
        prev = current
        current = next
    }
    return current
}

fun main() {
    eq(climbStairs(2), 2)
    eq(climbStairs(3), 3)
    eq(climbStairs(1), 1)
    eq(climbStairs(45), 1836311903, "the problem's upper bound")
    println("70 ok")
}
