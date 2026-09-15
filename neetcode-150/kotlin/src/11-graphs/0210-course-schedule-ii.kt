@file:JvmName("CourseScheduleII")
// 210. Course Schedule II — Medium
// https://leetcode.com/problems/course-schedule-ii/
// Pattern: Graphs (topological sort)
// Time O(V + E) | Space O(V + E)
//
// Idea: identical to 207, but record the removal order — that order IS a valid topological
// sort. A cycle shows up as an order shorter than numCourses, and the problem wants [] then.
// Many valid orders can exist; any one is accepted.

package neetcode.graphs

import neetcode.lib.eq
import neetcode.lib.that

fun findOrder(numCourses: Int, prerequisites: Array<IntArray>): IntArray {
    val dependents = Array(numCourses) { mutableListOf<Int>() }
    val indegree = IntArray(numCourses)

    for ((course, prereq) in prerequisites.map { it[0] to it[1] }) {
        dependents[prereq].add(course)
        indegree[course]++
    }

    val queue = ArrayDeque((0 until numCourses).filter { indegree[it] == 0 })
    val order = ArrayList<Int>(numCourses)
    while (queue.isNotEmpty()) {
        val course = queue.removeLast()
        order.add(course)
        for (next in dependents[course]) {
            if (--indegree[next] == 0) queue.addLast(next)
        }
    }
    return if (order.size == numCourses) order.toIntArray() else intArrayOf()
}

fun main() {
    eq(findOrder(2, arrayOf(intArrayOf(1, 0))), intArrayOf(0, 1))
    eq(findOrder(1, arrayOf()), intArrayOf(0))
    eq(findOrder(2, arrayOf(intArrayOf(1, 0), intArrayOf(0, 1))), intArrayOf(), "cycle")

    // Any order is fine as long as every prerequisite comes first.
    val prereqs = arrayOf(intArrayOf(1, 0), intArrayOf(2, 0), intArrayOf(3, 1), intArrayOf(3, 2))
    val order = findOrder(4, prereqs)
    eq(order.size, 4)
    val position = HashMap<Int, Int>()
    order.forEachIndexed { i, course -> position[course] = i }
    for ((course, prereq) in prereqs.map { it[0] to it[1] }) {
        that(position[prereq]!! < position[course]!!, "prerequisite $prereq must precede $course")
    }
    println("210 ok")
}
