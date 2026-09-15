@file:JvmName("MinStackMain")
// 155. Min Stack — Medium
// https://leetcode.com/problems/min-stack/
// Pattern: Stack
// Time O(1) per operation | Space O(n)
//
// Idea: a parallel stack storing "the minimum as of this push". Popping the main stack pops
// the mirror too, so the minimum is restored automatically — no rescanning.

package neetcode.stack

import neetcode.lib.eq

class MinStack {
    private val stack = ArrayDeque<Int>()
    private val mins = ArrayDeque<Int>()

    fun push(value: Int) {
        stack.addLast(value)
        mins.addLast(if (mins.isEmpty()) value else minOf(value, mins.last()))
    }

    fun pop() {
        stack.removeLast()
        mins.removeLast()
    }

    fun top(): Int = stack.last()

    fun getMin(): Int = mins.last()
}

fun main() {
    val s = MinStack()
    s.push(-2)
    s.push(0)
    s.push(-3)
    eq(s.getMin(), -3)
    s.pop()
    eq(s.top(), 0)
    eq(s.getMin(), -2, "the old minimum comes back")
    s.push(-2)
    eq(s.getMin(), -2)
    s.pop()
    eq(s.getMin(), -2, "duplicate minima must not be lost")
    println("155 ok")
}
