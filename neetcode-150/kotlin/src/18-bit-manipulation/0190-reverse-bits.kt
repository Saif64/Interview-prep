@file:JvmName("ReverseBits")
// 190. Reverse Bits — Easy
// https://leetcode.com/problems/reverse-bits/
// Pattern: Bit Manipulation
// Time O(1) — always 32 iterations | Space O(1)
//
// Idea: shift bits off the bottom of the input and onto the bottom of a result that is itself
// shifting left. Exactly 32 rounds, including leading zeros.
// `ushr` is the unsigned right shift — plain `shr` sign-extends, which would loop forever on
// a negative input.

package neetcode.bits

import neetcode.lib.eq

fun reverseBits(value: Int): Int {
    var n = value
    var result = 0
    repeat(32) {
        result = (result shl 1) or (n and 1)
        n = n ushr 1
    }
    return result
}

fun main() {
    // LeetCode states these problems in unsigned terms, but Kotlin's Int is signed — so
    // compare as UInt where the top bit ends up set, rather than writing the signed value.
    eq(reverseBits(43261596), 964176192)
    eq(reverseBits(-3).toUInt(), 3221225471u, "4294967293 unsigned reversed")
    eq(reverseBits(0), 0)
    eq(reverseBits(1).toUInt(), 2147483648u, "the top bit ends up set")

    // Reversing twice is the identity.
    for (x in listOf(0, 1, 12345, -1, Int.MAX_VALUE, Int.MIN_VALUE)) {
        eq(reverseBits(reverseBits(x)), x, "double reverse of $x")
    }
    println("190 ok")
}
