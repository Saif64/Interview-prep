@file:JvmName("DecodeWays")
// 91. Decode Ways — Medium
// https://leetcode.com/problems/decode-ways/
// Pattern: 1-D DP
// Time O(n) | Space O(1)
//
// Idea: Fibonacci with validity rules. ways(i) = ways(i-1) if s[i] is 1..9, plus ways(i-2) if
// s[i-1..i] is 10..26. The zeros make this fiddly: '0' cannot stand alone and only "10" and
// "20" are decodable pairs, so "30" and "01" have zero ways.

package neetcode.dp1d

import neetcode.lib.eq

fun numDecodings(s: String): Int {
    if (s.isEmpty() || s[0] == '0') return 0

    var twoBack = 1 // empty prefix
    var oneBack = 1 // first character, already known valid

    for (i in 1 until s.length) {
        var current = 0
        if (s[i] != '0') current += oneBack
        val pair = s.substring(i - 1, i + 1).toInt()
        if (pair in 10..26) current += twoBack
        if (current == 0) return 0 // dead end, e.g. "30"
        twoBack = oneBack
        oneBack = current
    }
    return oneBack
}

fun main() {
    eq(numDecodings("12"), 2, "\"AB\" or \"L\"")
    eq(numDecodings("226"), 3)
    eq(numDecodings("06"), 0, "leading zero")
    eq(numDecodings("0"), 0)
    eq(numDecodings("10"), 1)
    eq(numDecodings("100"), 0, "\"00\" is undecodable")
    eq(numDecodings("27"), 1, "out of range as a pair")
    eq(numDecodings("11106"), 2)
    println("91 ok")
}
