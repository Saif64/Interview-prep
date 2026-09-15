@file:JvmName("SumOfTwoIntegers")
// 371. Sum of Two Integers — Medium
// https://leetcode.com/problems/sum-of-two-integers/
// Pattern: Bit Manipulation
// Time O(1) — bounded by the word size | Space O(1)
//
// Idea: addition without '+'. XOR is addition with every carry ignored; AND-then-shift is
// exactly those carries. Repeat until nothing carries.
// This terminates because each round pushes the carry one bit higher.

package neetcode.bits

import neetcode.lib.eq

fun getSum(first: Int, second: Int): Int {
    var a = first
    var b = second
    while (b != 0) {
        val carry = (a and b) shl 1
        a = a xor b
        b = carry
    }
    return a
}

fun main() {
    eq(getSum(1, 2), 3)
    eq(getSum(2, 3), 5)
    eq(getSum(0, 0), 0)
    eq(getSum(-1, 1), 0, "two's complement handles negatives")
    eq(getSum(-2, -3), -5)

    val rng = java.util.Random(3)
    repeat(500) {
        val a = rng.nextInt(20000) - 10000
        val b = rng.nextInt(20000) - 10000
        eq(getSum(a, b), a + b, "$a + $b")
    }
    println("371 ok")
}
