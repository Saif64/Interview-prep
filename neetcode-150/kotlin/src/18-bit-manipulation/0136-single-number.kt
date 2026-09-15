@file:JvmName("SingleNumber")
// 136. Single Number — Easy
// https://leetcode.com/problems/single-number/
// Pattern: Bit Manipulation
// Time O(n) | Space O(1)
//
// Idea: XOR cancels equal values (x xor x == 0) and ignores zero (x xor 0 == x), so XOR-ing
// everything leaves exactly the unpaired number. Order does not matter — XOR is commutative
// and associative, which is what makes this work on an unsorted array in one pass.

package neetcode.bits

import neetcode.lib.eq

fun singleNumber(nums: IntArray): Int = nums.fold(0) { acc, n -> acc xor n }

fun main() {
    eq(singleNumber(intArrayOf(2, 2, 1)), 1)
    eq(singleNumber(intArrayOf(4, 1, 2, 1, 2)), 4)
    eq(singleNumber(intArrayOf(1)), 1)
    eq(singleNumber(intArrayOf(-1, -1, -3)), -3, "negatives XOR fine")
    println("136 ok")
}
