@file:JvmName("DailyTemperatures")
// 739. Daily Temperatures — Medium
// https://leetcode.com/problems/daily-temperatures/
// Pattern: Stack (monotonic)
// Time O(n) | Space O(n)
//
// Idea: the canonical "next greater element". Hold indices of days still waiting for a
// warmer day; a warmer day resolves all of them at once. Each index is pushed and popped
// once, so the nested loop is still linear overall.

package neetcode.stack

import neetcode.lib.eq

fun dailyTemperatures(temperatures: IntArray): IntArray {
    val out = IntArray(temperatures.size)
    val stack = ArrayDeque<Int>() // indices, temperatures decreasing

    for (i in temperatures.indices) {
        while (stack.isNotEmpty() && temperatures[stack.last()] < temperatures[i]) {
            val day = stack.removeLast()
            out[day] = i - day
        }
        stack.addLast(i)
    }
    return out // whatever is left never warmed up, and stays 0
}

fun main() {
    eq(
        dailyTemperatures(intArrayOf(73, 74, 75, 71, 69, 72, 76, 73)),
        intArrayOf(1, 1, 4, 2, 1, 1, 0, 0),
    )
    eq(dailyTemperatures(intArrayOf(30, 40, 50, 60)), intArrayOf(1, 1, 1, 0))
    eq(dailyTemperatures(intArrayOf(30, 30, 30)), intArrayOf(0, 0, 0), "ties are not warmer")
    println("739 ok")
}
