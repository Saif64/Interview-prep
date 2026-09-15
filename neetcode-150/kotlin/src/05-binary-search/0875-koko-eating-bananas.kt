@file:JvmName("KokoEatingBananas")
// 875. Koko Eating Bananas — Medium
// https://leetcode.com/problems/koko-eating-bananas/
// Pattern: Binary Search (on the answer)
// Time O(n log maxPile) | Space O(1)
//
// Idea: the array is not what you search — the SPEED is. "Can Koko finish at speed k?" is
// monotonic (true for every larger k), so binary search for the smallest true.
// This "binary search the answer" shape shows up constantly once you recognise it.

package neetcode.binarysearch

import neetcode.lib.eq

fun minEatingSpeed(piles: IntArray, h: Int): Int {
    // Ceiling division without floating point: (pile + speed - 1) / speed.
    fun hoursAt(speed: Int): Long = piles.sumOf { ((it + speed - 1) / speed).toLong() }

    var lo = 1
    var hi = piles.max()
    while (lo < hi) {
        val mid = lo + (hi - lo) / 2
        if (hoursAt(mid) <= h) hi = mid else lo = mid + 1
    }
    return lo
}

fun main() {
    eq(minEatingSpeed(intArrayOf(3, 6, 7, 11), 8), 4)
    eq(minEatingSpeed(intArrayOf(30, 11, 23, 4, 20), 5), 30, "one pile per hour")
    eq(minEatingSpeed(intArrayOf(30, 11, 23, 4, 20), 6), 23)
    eq(minEatingSpeed(intArrayOf(312884470), 968709470), 1, "huge h -> slowest speed")
    println("875 ok")
}
