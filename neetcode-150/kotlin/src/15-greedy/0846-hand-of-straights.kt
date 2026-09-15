@file:JvmName("HandOfStraights")
// 846. Hand of Straights — Medium
// https://leetcode.com/problems/hand-of-straights/
// Pattern: Greedy
// Time O(n log n) | Space O(n)
//
// Idea: the smallest remaining card has no smaller partner, so it MUST start a group. That
// forces the whole group, and repeating the argument settles the hand with no search.

package neetcode.greedy

import neetcode.lib.eq

fun isNStraightHand(hand: IntArray, groupSize: Int): Boolean {
    if (hand.size % groupSize != 0) return false

    val counts = HashMap<Int, Int>()
    for (card in hand) counts[card] = (counts[card] ?: 0) + 1

    for (card in counts.keys.sorted()) {
        val needed = counts[card]!!
        if (needed == 0) continue
        for (next in card until card + groupSize) {
            val available = counts[next] ?: 0
            if (available < needed) return false
            counts[next] = available - needed
        }
    }
    return true
}

fun main() {
    eq(isNStraightHand(intArrayOf(1, 2, 3, 6, 2, 3, 4, 7, 8), 3), true)
    eq(isNStraightHand(intArrayOf(1, 2, 3, 4, 5), 4), false, "not divisible")
    eq(isNStraightHand(intArrayOf(1, 1, 2, 2, 3, 3), 3), true)
    eq(isNStraightHand(intArrayOf(1, 2, 4, 5), 2), true)
    eq(isNStraightHand(intArrayOf(1, 2, 3, 4), 1), true, "groups of one always work")
    println("846 ok")
}
