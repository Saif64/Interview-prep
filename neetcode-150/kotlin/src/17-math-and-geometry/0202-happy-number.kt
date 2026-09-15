@file:JvmName("HappyNumber")
// 202. Happy Number — Easy
// https://leetcode.com/problems/happy-number/
// Pattern: Math & Geometry
// Time O(log n) per step | Space O(1)
//
// Idea: repeatedly summing squared digits either reaches 1 or falls into a cycle — so this is
// cycle detection in disguise. Floyd's tortoise and hare gives O(1) space; a HashSet of seen
// values is the O(n) alternative and is fine to reach for first.

package neetcode.mathgeometry

import neetcode.lib.eq

private fun squareDigits(value: Int): Int {
    var n = value
    var sum = 0
    while (n > 0) {
        val digit = n % 10
        sum += digit * digit
        n /= 10
    }
    return sum
}

fun isHappy(n: Int): Boolean {
    var slow = n
    var fast = squareDigits(n)
    while (fast != 1 && slow != fast) {
        slow = squareDigits(slow)
        fast = squareDigits(squareDigits(fast))
    }
    return fast == 1
}

fun main() {
    eq(isHappy(19), true)
    eq(isHappy(2), false)
    eq(isHappy(1), true)
    eq(isHappy(7), true)
    eq(isHappy(4), false, "the canonical unhappy cycle")
    println("202 ok")
}
