@file:JvmName("CountingBits")
// 338. Counting Bits — Easy
// https://leetcode.com/problems/counting-bits/
// Pattern: Bit Manipulation + DP
// Time O(n) | Space O(1) extra
//
// Idea: bits(i) = bits(i shr 1) + (i and 1). Dropping the lowest bit gives a number already
// computed, so each answer is O(1) — that is what beats the naive O(n log n) of counting every
// number's bits from scratch.

package neetcode.bits

import neetcode.lib.eq

fun countBits(n: Int): IntArray {
    val dp = IntArray(n + 1)
    for (i in 1..n) dp[i] = dp[i shr 1] + (i and 1)
    return dp
}

fun main() {
    eq(countBits(2), intArrayOf(0, 1, 1))
    eq(countBits(5), intArrayOf(0, 1, 1, 2, 1, 2))
    eq(countBits(0), intArrayOf(0))

    // Cross-check against the straightforward count.
    val out = countBits(200)
    for (i in 0..200) eq(out[i], Integer.bitCount(i), "bits of $i")
    println("338 ok")
}
