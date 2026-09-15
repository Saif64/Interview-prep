@file:JvmName("MeetingRoomsII")
// 253. Meeting Rooms II — Medium (LeetCode Premium)
// https://leetcode.com/problems/meeting-rooms-ii/
// Pattern: Intervals (sweep line)
// Time O(n log n) | Space O(n)
//
// Idea: rooms needed = the largest number of meetings running at once. Separate the starts and
// the ends, sort each, and sweep with two pointers: a start before the earliest end needs a
// new room, otherwise a room frees up.
// A min-heap of end times is the equivalent, more commonly cited solution.

package neetcode.intervals

import neetcode.lib.eq

fun minMeetingRooms(intervals: Array<IntArray>): Int {
    val starts = intervals.map { it[0] }.sorted()
    val ends = intervals.map { it[1] }.sorted()

    var rooms = 0
    var most = 0
    var endPointer = 0

    for (start in starts) {
        while (endPointer < ends.size && ends[endPointer] <= start) {
            rooms--
            endPointer++
        }
        rooms++
        most = maxOf(most, rooms)
    }
    return most
}

fun main() {
    eq(
        minMeetingRooms(arrayOf(intArrayOf(0, 30), intArrayOf(5, 10), intArrayOf(15, 20))),
        2,
    )
    eq(minMeetingRooms(arrayOf(intArrayOf(7, 10), intArrayOf(2, 4))), 1)
    eq(minMeetingRooms(arrayOf()), 0)
    eq(
        minMeetingRooms(arrayOf(intArrayOf(0, 5), intArrayOf(5, 10), intArrayOf(10, 15))),
        1,
        "back to back",
    )
    eq(
        minMeetingRooms(arrayOf(intArrayOf(1, 5), intArrayOf(2, 6), intArrayOf(3, 7))),
        3,
        "all overlap",
    )
    println("253 ok")
}
