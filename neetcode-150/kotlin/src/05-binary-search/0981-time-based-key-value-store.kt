@file:JvmName("TimeMapMain")
// 981. Time Based Key-Value Store — Medium
// https://leetcode.com/problems/time-based-key-value-store/
// Pattern: Binary Search
// Time: set O(1), get O(log n) | Space O(n)
//
// Idea: per key, an append-only list of (timestamp, value). The problem guarantees
// timestamps arrive increasing, so the list is already sorted and `get` is a binary search
// for the largest timestamp <= the query — the "floor" flavour of binary search.

package neetcode.binarysearch

import neetcode.lib.eq

class TimeMap {
    private val store = HashMap<String, MutableList<Pair<Int, String>>>()

    fun set(key: String, value: String, timestamp: Int) {
        store.getOrPut(key) { mutableListOf() }.add(timestamp to value)
    }

    fun get(key: String, timestamp: Int): String {
        val entries = store[key] ?: return ""
        var lo = 0
        var hi = entries.size - 1
        var best = ""
        while (lo <= hi) {
            val mid = lo + (hi - lo) / 2
            if (entries[mid].first <= timestamp) {
                best = entries[mid].second // candidate; keep looking for a later one
                lo = mid + 1
            } else {
                hi = mid - 1
            }
        }
        return best
    }
}

fun main() {
    val t = TimeMap()
    t.set("foo", "bar", 1)
    eq(t.get("foo", 1), "bar")
    eq(t.get("foo", 3), "bar", "falls back to the latest <= 3")
    t.set("foo", "bar2", 4)
    eq(t.get("foo", 4), "bar2")
    eq(t.get("foo", 5), "bar2")
    eq(t.get("foo", 0), "", "nothing set that early")
    eq(t.get("missing", 1), "")
    println("981 ok")
}
