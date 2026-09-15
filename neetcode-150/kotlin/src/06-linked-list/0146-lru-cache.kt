@file:JvmName("LRUCacheMain")
// 146. LRU Cache — Medium
// https://leetcode.com/problems/lru-cache/
// Pattern: Linked List + Hash Map
// Time O(1) per operation | Space O(capacity)
//
// Idea: the textbook answer is a hash map plus a doubly linked list — which is exactly what
// LinkedHashMap is. With accessOrder = true it reorders on every get, and overriding
// removeEldestEntry gives the eviction for free.
// Know the manual doubly-linked-list version too; an interviewer may specifically ask you to
// build it rather than reach for the JDK.

package neetcode.linkedlist

import neetcode.lib.eq

class LRUCache(private val capacity: Int) {
    private val map = object : LinkedHashMap<Int, Int>(capacity, 0.75f, true) {
        override fun removeEldestEntry(eldest: MutableMap.MutableEntry<Int, Int>?): Boolean =
            size > capacity
    }

    fun get(key: Int): Int = map[key] ?: -1

    fun put(key: Int, value: Int) {
        map[key] = value
    }
}

fun main() {
    val c = LRUCache(2)
    c.put(1, 1)
    c.put(2, 2)
    eq(c.get(1), 1)
    c.put(3, 3) // evicts key 2 (1 was just used)
    eq(c.get(2), -1)
    c.put(4, 4) // evicts key 1
    eq(c.get(1), -1)
    eq(c.get(3), 3)
    eq(c.get(4), 4)

    val one = LRUCache(1)
    one.put(1, 1)
    one.put(2, 2)
    eq(one.get(1), -1)

    val update = LRUCache(2)
    update.put(1, 1)
    update.put(2, 2)
    update.put(1, 10) // update must also refresh recency
    update.put(3, 3)
    eq(update.get(2), -1)
    eq(update.get(1), 10)
    println("146 ok")
}
