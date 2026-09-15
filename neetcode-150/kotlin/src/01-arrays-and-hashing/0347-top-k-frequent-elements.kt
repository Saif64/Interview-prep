@file:JvmName("TopKFrequentElements")
// 347. Top K Frequent Elements — Medium
// https://leetcode.com/problems/top-k-frequent-elements/
// Pattern: Arrays & Hashing
// Time O(n) | Space O(n)
//
// Idea: bucket sort by frequency. A frequency can never exceed n, so an array of n + 1
// buckets indexed by count beats the obvious heap solution's O(n log k).

package neetcode.arrayshashing

import neetcode.lib.bag
import neetcode.lib.eq

fun topKFrequent(nums: IntArray, k: Int): IntArray {
    val counts = HashMap<Int, Int>()
    for (n in nums) counts[n] = (counts[n] ?: 0) + 1

    val buckets = Array(nums.size + 1) { mutableListOf<Int>() }
    for ((num, count) in counts) buckets[count].add(num)

    val out = ArrayList<Int>(k)
    for (count in buckets.indices.reversed()) {
        if (out.size == k) break
        for (num in buckets[count]) {
            out.add(num)
            if (out.size == k) break
        }
    }
    return out.toIntArray()
}

fun main() {
    eq(bag(topKFrequent(intArrayOf(1, 1, 1, 2, 2, 3), 2).toList()), listOf(1, 2))
    eq(topKFrequent(intArrayOf(1), 1), intArrayOf(1))
    eq(bag(topKFrequent(intArrayOf(4, 4, 4, 5, 5, 6), 3).toList()), listOf(4, 5, 6))
    println("347 ok")
}
