@file:JvmName("ValidPalindrome")
// 125. Valid Palindrome — Easy
// https://leetcode.com/problems/valid-palindrome/
// Pattern: Two Pointers
// Time O(n) | Space O(1)
//
// Idea: walk inward, skipping anything non-alphanumeric. Building a cleaned copy first is
// simpler to write but costs O(n) space — mention the trade-off, then do it in place.

package neetcode.twopointers

import neetcode.lib.eq

fun isPalindrome(s: String): Boolean {
    var left = 0
    var right = s.length - 1
    while (left < right) {
        while (left < right && !s[left].isLetterOrDigit()) left++
        while (left < right && !s[right].isLetterOrDigit()) right--
        if (s[left].lowercaseChar() != s[right].lowercaseChar()) return false
        left++
        right--
    }
    return true
}

fun main() {
    eq(isPalindrome("A man, a plan, a canal: Panama"), true)
    eq(isPalindrome("race a car"), false)
    eq(isPalindrome(" "), true)
    eq(isPalindrome("0P"), false, "'0' and 'P' are adjacent in ASCII — a classic trap")
    println("125 ok")
}
