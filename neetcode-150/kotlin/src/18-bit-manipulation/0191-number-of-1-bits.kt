@file:JvmName("NumberOf1Bits")
// 191. Number of 1 Bits — Easy
// https://leetcode.com/problems/number-of-1-bits/
// Pattern: Bit Manipulation
// Time O(number of set bits) | Space O(1)
//
// Idea: `n and (n - 1)` clears the lowest set bit. Looping until zero therefore runs once per
// set bit rather than 32 times — Brian Kernighan's trick, and genuinely useful to know.

package neetcode.bits

import neetcode.lib.eq

fun hammingWeight(value: Int): Int {
    var n = value
    var count = 0
    while (n != 0) {
        n = n and (n - 1)
        count++
    }
    return count
}

fun main() {
    eq(hammingWeight(11), 3, "1011")
    eq(hammingWeight(128), 1)
    eq(hammingWeight(0), 0)
    eq(hammingWeight(2147483647), 31, "all 31 low bits set")
    eq(hammingWeight(-1), 32, "all 32 bits set in two's complement")
    println("191 ok")
}
