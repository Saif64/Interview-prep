@file:JvmName("PlusOne")
// 66. Plus One — Easy
// https://leetcode.com/problems/plus-one/
// Pattern: Math & Geometry
// Time O(n) | Space O(1) — except for the all-nines case
//
// Idea: walk from the least significant digit. Anything below 9 just increments and the work
// is done; a 9 becomes 0 and carries. Falling out of the loop means every digit was a 9, and
// the result is 1 followed by zeros — one digit longer than the input.

package neetcode.mathgeometry

import neetcode.lib.eq

fun plusOne(digits: IntArray): IntArray {
    for (i in digits.indices.reversed()) {
        if (digits[i] < 9) {
            digits[i]++
            return digits
        }
        digits[i] = 0
    }
    return intArrayOf(1, *digits.toTypedArray().toIntArray())
}

fun main() {
    eq(plusOne(intArrayOf(1, 2, 3)), intArrayOf(1, 2, 4))
    eq(plusOne(intArrayOf(4, 3, 2, 1)), intArrayOf(4, 3, 2, 2))
    eq(plusOne(intArrayOf(9)), intArrayOf(1, 0))
    eq(plusOne(intArrayOf(9, 9, 9)), intArrayOf(1, 0, 0, 0))
    eq(plusOne(intArrayOf(1, 9)), intArrayOf(2, 0))
    println("66 ok")
}
