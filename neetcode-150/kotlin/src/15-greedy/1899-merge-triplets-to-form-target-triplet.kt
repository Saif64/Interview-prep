@file:JvmName("MergeTripletsToFormTarget")
// 1899. Merge Triplets to Form Target Triplet — Medium
// https://leetcode.com/problems/merge-triplets-to-form-target-triplet/
// Pattern: Greedy
// Time O(n) | Space O(1)
//
// Idea: merging takes the element-wise maximum, which can never decrease a value. So any
// triplet exceeding the target in ANY position is permanently disqualified — using it would
// overshoot forever. Among the survivors, check that each of the three positions is matched
// exactly by at least one of them.

package neetcode.greedy

import neetcode.lib.eq

fun mergeTriplets(triplets: Array<IntArray>, target: IntArray): Boolean {
    val matched = BooleanArray(3)

    for (triplet in triplets) {
        if ((0..2).any { triplet[it] > target[it] }) continue // would overshoot
        for (i in 0..2) if (triplet[i] == target[i]) matched[i] = true
    }
    return matched.all { it }
}

fun main() {
    eq(
        mergeTriplets(
            arrayOf(intArrayOf(2, 5, 3), intArrayOf(1, 8, 4), intArrayOf(1, 7, 5)),
            intArrayOf(2, 7, 5),
        ),
        true,
    )
    eq(
        mergeTriplets(arrayOf(intArrayOf(3, 4, 5), intArrayOf(4, 5, 6)), intArrayOf(3, 2, 5)),
        false,
    )
    eq(
        mergeTriplets(
            arrayOf(
                intArrayOf(2, 5, 3), intArrayOf(2, 3, 4),
                intArrayOf(1, 2, 5), intArrayOf(5, 2, 3),
            ),
            intArrayOf(5, 5, 5),
        ),
        true,
    )
    eq(mergeTriplets(arrayOf(intArrayOf(1, 1, 1)), intArrayOf(1, 1, 1)), true)
    eq(
        mergeTriplets(arrayOf(intArrayOf(9, 1, 1)), intArrayOf(1, 1, 1)),
        false,
        "only candidate overshoots",
    )
    println("1899 ok")
}
