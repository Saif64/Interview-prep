@file:JvmName("GasStation")
// 134. Gas Station — Medium
// https://leetcode.com/problems/gas-station/
// Pattern: Greedy
// Time O(n) | Space O(1)
//
// Idea: two facts do all the work.
//   1. If total gas >= total cost, a solution exists (and it is unique).
//   2. If the tank goes negative between station `start` and station i, then no station in
//      between can be the answer either — so jump start to i + 1.
// Together they give a single pass instead of trying all n starts.

package neetcode.greedy

import neetcode.lib.eq

fun canCompleteCircuit(gas: IntArray, cost: IntArray): Int {
    var total = 0
    var tank = 0
    var start = 0

    for (i in gas.indices) {
        val diff = gas[i] - cost[i]
        total += diff
        tank += diff
        if (tank < 0) {
            start = i + 1
            tank = 0
        }
    }
    return if (total >= 0) start else -1
}

fun main() {
    eq(
        canCompleteCircuit(intArrayOf(1, 2, 3, 4, 5), intArrayOf(3, 4, 5, 1, 2)),
        3,
    )
    eq(canCompleteCircuit(intArrayOf(2, 3, 4), intArrayOf(3, 4, 3)), -1)
    eq(canCompleteCircuit(intArrayOf(5), intArrayOf(4)), 0)
    eq(canCompleteCircuit(intArrayOf(3, 3), intArrayOf(4, 1)), 1)
    println("134 ok")
}
