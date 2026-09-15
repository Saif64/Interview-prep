@file:JvmName("CarFleet")
// 853. Car Fleet — Medium
// https://leetcode.com/problems/car-fleet/
// Pattern: Stack
// Time O(n log n) (the sort dominates) | Space O(n)
//
// Idea: sort by position descending and walk from the car closest to the target backwards.
// A car whose arrival time is <= the fleet ahead catches up and merges; otherwise it starts
// a new fleet. Counting fleets is then counting how often the running "slowest arrival
// ahead" gets replaced.

package neetcode.stack

import neetcode.lib.eq

fun carFleet(target: Int, position: IntArray, speed: IntArray): Int {
    val cars = position.indices
        .map { position[it] to (target - position[it]).toDouble() / speed[it] }
        .sortedByDescending { it.first } // closest to the target first

    var fleets = 0
    var slowestAhead = 0.0
    for ((_, time) in cars) {
        if (time > slowestAhead) {
            fleets++
            slowestAhead = time // cannot catch up, so it leads a new fleet
        }
    }
    return fleets
}

fun main() {
    eq(carFleet(12, intArrayOf(10, 8, 0, 5, 3), intArrayOf(2, 4, 1, 1, 3)), 3)
    eq(carFleet(10, intArrayOf(3), intArrayOf(3)), 1)
    eq(carFleet(100, intArrayOf(0, 2, 4), intArrayOf(4, 2, 1)), 1, "all merge into one")
    eq(carFleet(10, intArrayOf(6, 8), intArrayOf(3, 2)), 2)
    println("853 ok")
}
