@file:JvmName("TaskScheduler")
// 621. Task Scheduler — Medium
// https://leetcode.com/problems/task-scheduler/
// Pattern: Heap / Greedy math
// Time O(n) | Space O(1)  (26 counters)
//
// Idea: the most frequent task dictates the schedule. Lay out (maxCount - 1) blocks of length
// (n + 1), then append every task tied for the maximum. Other tasks fill the idle slots for
// free — and if there are more tasks than slots, there is no idling at all, so the answer is
// simply tasks.size. Hence the maxOf.

package neetcode.heap

import neetcode.lib.eq

fun leastInterval(tasks: CharArray, n: Int): Int {
    val counts = IntArray(26)
    for (task in tasks) counts[task - 'A']++

    val maxCount = counts.max()
    val tiedForMax = counts.count { it == maxCount }

    return maxOf(tasks.size, (maxCount - 1) * (n + 1) + tiedForMax)
}

fun main() {
    eq(leastInterval("AAABBB".toCharArray(), 2), 8)
    eq(leastInterval("AAABBB".toCharArray(), 0), 6, "no cooldown")
    // 6 A's force 5 gaps of 2, and the other tasks cannot fill them all.
    eq(leastInterval("AAAAAABCDEFG".toCharArray(), 2), 16)
    // Same idea, enough filler that idling disappears -> just tasks.size.
    eq(leastInterval("AAAABCDEFG".toCharArray(), 2), 10)
    eq(leastInterval("A".toCharArray(), 5), 1)
    eq(leastInterval("ABCDAB".toCharArray(), 1), 6)
    println("621 ok")
}
