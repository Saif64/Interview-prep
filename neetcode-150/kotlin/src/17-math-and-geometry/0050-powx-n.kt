@file:JvmName("PowXN")
// 50. Pow(x, n) — Medium
// https://leetcode.com/problems/powx-n/
// Pattern: Math & Geometry
// Time O(log n) | Space O(1)
//
// Idea: binary exponentiation. Square the base and halve the exponent; multiply into the
// result whenever the current bit is set. Multiplying n times is O(n) and times out.
// A negative exponent inverts the base — and n can be Int.MIN_VALUE, whose negation overflows
// Int, which is why the exponent is widened to Long first.

package neetcode.mathgeometry

import neetcode.lib.that
import kotlin.math.abs

fun myPow(x: Double, n: Int): Double {
    var base = x
    var exponent = n.toLong()
    if (exponent < 0) {
        base = 1 / base
        exponent = -exponent
    }

    var result = 1.0
    while (exponent > 0) {
        if (exponent % 2 == 1L) result *= base
        base *= base
        exponent /= 2
    }
    return result
}

fun main() {
    that(abs(myPow(2.0, 10) - 1024.0) < 1e-9)
    that(abs(myPow(2.1, 3) - 9.261) < 1e-9)
    that(abs(myPow(2.0, -2) - 0.25) < 1e-9)
    that(myPow(1.0, 0) == 1.0)
    that(myPow(5.0, 0) == 1.0)
    that(abs(myPow(2.0, Int.MIN_VALUE)) < 1e-9, "must not overflow or hang")
    println("50 ok")
}
