@file:JvmName("MultiplyStrings")
// 43. Multiply Strings — Medium
// https://leetcode.com/problems/multiply-strings/
// Pattern: Math & Geometry
// Time O(m * n) | Space O(m + n)
//
// Idea: long multiplication by hand, because the inputs are too big for a native number and
// BigInteger is off the table. The key index fact: digit i of one number times digit j of the
// other lands in positions i + j and i + j + 1 of the result.
// Two guards: "0" times anything is "0", and leading zeros must be stripped at the end.

package neetcode.mathgeometry

import neetcode.lib.eq

fun multiply(num1: String, num2: String): String {
    if (num1 == "0" || num2 == "0") return "0"

    val m = num1.length
    val n = num2.length
    val result = IntArray(m + n)

    for (i in m - 1 downTo 0) {
        for (j in n - 1 downTo 0) {
            val product = (num1[i] - '0') * (num2[j] - '0')
            val total = product + result[i + j + 1]
            result[i + j + 1] = total % 10
            result[i + j] += total / 10
        }
    }

    val digits = result.joinToString("").trimStart('0')
    return digits.ifEmpty { "0" }
}

fun main() {
    eq(multiply("2", "3"), "6")
    eq(multiply("123", "456"), "56088")
    eq(multiply("0", "52"), "0")
    eq(multiply("9", "9"), "81")
    eq(multiply("999", "999"), "998001")
    // Beyond Long.MAX_VALUE territory, which is the reason this problem exists.
    eq(multiply("123456789", "987654321"), "121932631112635269")
    println("43 ok")
}
