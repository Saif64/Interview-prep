@file:JvmName("MeetingRooms")
// 252. Meeting Rooms — Easy (LeetCode Premium)
// https://leetcode.com/problems/meeting-rooms/
// Pattern: Intervals
// Time O(n log n) | Space O(1)
//
// Idea: sort by start; a conflict exists only if some meeting starts strictly before the
// previous one ends. Back-to-back meetings ([0,5] then [5,10]) do not conflict, so the
// comparison must be strict.

package neetcode.intervals

import neetcode.lib.eq

fun canAttendMeetings(intervals: Array<IntArray>): Boolean {
    val sorted = intervals.sortedBy { it[0] }
    for (i in 1 until sorted.size) {
        if (sorted[i][0] < sorted[i - 1][1]) return false
    }
    return true
}

fun main() {
    eq(
        canAttendMeetings(arrayOf(intArrayOf(0, 30), intArrayOf(5, 10), intArrayOf(15, 20))),
        false,
    )
    eq(canAttendMeetings(arrayOf(intArrayOf(7, 10), intArrayOf(2, 4))), true)
    eq(canAttendMeetings(arrayOf()), true)
    eq(
        canAttendMeetings(arrayOf(intArrayOf(0, 5), intArrayOf(5, 10))),
        true,
        "back to back is fine",
    )
    println("252 ok")
}
