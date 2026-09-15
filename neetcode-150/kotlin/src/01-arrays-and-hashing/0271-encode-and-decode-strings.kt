@file:JvmName("EncodeAndDecodeStrings")
// 271. Encode and Decode Strings — Medium (LeetCode Premium; also Lintcode 659)
// https://leetcode.com/problems/encode-and-decode-strings/
// Pattern: Arrays & Hashing
// Time O(n) both ways | Space O(n)
//
// Idea: length-prefix each string ("5#hello"). Any separator you pick could appear inside
// the payload, so the length — not the delimiter — is what makes decoding unambiguous.

package neetcode.arrayshashing

import neetcode.lib.eq

fun encode(strs: List<String>): String =
    strs.joinToString("") { "${it.length}#$it" }

fun decode(str: String): List<String> {
    val out = ArrayList<String>()
    var i = 0
    while (i < str.length) {
        var j = i
        while (str[j] != '#') j++
        val length = str.substring(i, j).toInt()
        out.add(str.substring(j + 1, j + 1 + length))
        i = j + 1 + length
    }
    return out
}

fun main() {
    fun roundTrip(items: List<String>) = eq(decode(encode(items)), items)
    roundTrip(listOf("lint", "code", "love", "you"))
    roundTrip(listOf("", ""))
    roundTrip(listOf("we", "say", ":", "yes"))
    roundTrip(listOf("4#tricky", "#", "12#")) // payloads that look like the encoding itself
    roundTrip(emptyList())
    println("271 ok")
}
