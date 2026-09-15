@file:JvmName("Permutations")
// 46. Permutations — Medium
// https://leetcode.com/problems/permutations/
// Pattern: Backtracking
// Time O(n * n!) | Space O(n)
//
// Idea: pick an unused element at each depth, recurse, then un-pick.
// The `used` array is the cheapest way to track availability; swapping elements in place is
// the alternative and needs no extra array.

package neetcode.backtracking

import neetcode.lib.eq
import neetcode.lib.that

fun permute(nums: IntArray): List<List<Int>> {
    val out = ArrayList<List<Int>>()
    val current = ArrayList<Int>()
    val used = BooleanArray(nums.size)

    fun build() {
        if (current.size == nums.size) {
            out.add(ArrayList(current))
            return
        }
        for (i in nums.indices) {
            if (used[i]) continue
            used[i] = true
            current.add(nums[i])
            build()
            current.removeAt(current.size - 1)
            used[i] = false
        }
    }

    build()
    return out
}

fun main() {
    eq(permute(intArrayOf(1, 2, 3)).size, 6)
    eq(permute(intArrayOf(1)), listOf(listOf(1)))
    eq(permute(intArrayOf(1, 2, 3, 4)).size, 24)

    val all = permute(intArrayOf(1, 2, 3)).map { it.joinToString("") }
    eq(all.toSet().size, 6, "every permutation is distinct")
    that("321" in all)
    println("46 ok")
}
