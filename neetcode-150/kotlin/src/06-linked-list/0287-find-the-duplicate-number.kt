@file:JvmName("FindTheDuplicateNumber")
// 287. Find the Duplicate Number — Medium
// https://leetcode.com/problems/find-the-duplicate-number/
// Pattern: Linked List (Floyd's cycle detection on an implicit list)
// Time O(n) | Space O(1), and the input is never modified
//
// Idea: treat i -> nums[i] as a linked list. Values are in [1, n] over n + 1 slots, so some
// index is pointed at twice — that is a cycle entrance, and the duplicate. Phase one finds a
// meeting point inside the cycle; phase two walks from the start and from the meeting point
// at the same speed, and they meet exactly at the entrance.

package neetcode.linkedlist

import neetcode.lib.eq

fun findDuplicate(nums: IntArray): Int {
    var slow = 0
    var fast = 0
    do {
        slow = nums[slow]
        fast = nums[nums[fast]]
    } while (slow != fast)

    var finder = 0
    while (finder != slow) {
        finder = nums[finder]
        slow = nums[slow]
    }
    return finder
}

fun main() {
    eq(findDuplicate(intArrayOf(1, 3, 4, 2, 2)), 2)
    eq(findDuplicate(intArrayOf(3, 1, 3, 4, 2)), 3)
    eq(findDuplicate(intArrayOf(1, 1)), 1)
    eq(findDuplicate(intArrayOf(2, 2, 2, 2, 2)), 2, "many copies")
    eq(findDuplicate(intArrayOf(1, 4, 4, 2, 4)), 4)
    println("287 ok")
}
