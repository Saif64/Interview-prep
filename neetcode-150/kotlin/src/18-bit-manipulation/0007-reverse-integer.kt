@file:JvmName("ReverseInteger")
// 7. Reverse Integer — Medium
// https://leetcode.com/problems/reverse-integer/
// Pattern: Bit Manipulation / Math
// Time O(log n) | Space O(1)
//
// Idea: pop digits with %10 and push them onto a reversed accumulator.
// The actual problem is the 32-bit overflow rule: return 0 if the result falls outside
// [-2^31, 2^31 - 1]. Accumulating in a Long means the check can happen after the fact; in a
// language without a wider type you would have to test BEFORE each multiply.

package neetcode.bits

import neetcode.lib.eq

fun reverse(x: Int): Int {
    var n = Math.abs(x.toLong())
    var result = 0L
    while (n > 0) {
        result = result * 10 + n % 10
        n /= 10
    }
    if (x < 0) result = -result
    return if (result < Int.MIN_VALUE || result > Int.MAX_VALUE) 0 else result.toInt()
}

fun main() {
    eq(reverse(123), 321)
    eq(reverse(-123), -321)
    eq(reverse(120), 21, "trailing zero disappears")
    eq(reverse(0), 0)
    eq(reverse(1534236469), 0, "overflows")
    eq(reverse(Int.MIN_VALUE), 0, "abs would overflow Int, hence the Long")
    println("7 ok")
}
