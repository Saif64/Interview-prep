@file:JvmName("CourseSchedule")
// 207. Course Schedule — Medium
// https://leetcode.com/problems/course-schedule/
// Pattern: Graphs (topological sort)
// Time O(V + E) | Space O(V + E)
//
// Idea: "can every course be taken?" is "is this dependency graph acyclic?".
// Kahn's algorithm: repeatedly remove a node with no remaining prerequisites. If some nodes
// can never be removed, they are stuck in a cycle.

package neetcode.graphs

import neetcode.lib.eq

fun canFinish(numCourses: Int, prerequisites: Array<IntArray>): Boolean {
    val dependents = Array(numCourses) { mutableListOf<Int>() }
    val indegree = IntArray(numCourses)

    for ((course, prereq) in prerequisites.map { it[0] to it[1] }) {
        dependents[prereq].add(course)
        indegree[course]++
    }

    val queue = ArrayDeque((0 until numCourses).filter { indegree[it] == 0 })
    var taken = 0
    while (queue.isNotEmpty()) {
        val course = queue.removeLast()
        taken++
        for (next in dependents[course]) {
            if (--indegree[next] == 0) queue.addLast(next)
        }
    }
    return taken == numCourses
}

fun main() {
    eq(canFinish(2, arrayOf(intArrayOf(1, 0))), true)
    eq(canFinish(2, arrayOf(intArrayOf(1, 0), intArrayOf(0, 1))), false, "cycle")
    eq(canFinish(1, arrayOf()), true)
    eq(
        canFinish(3, arrayOf(intArrayOf(0, 1), intArrayOf(1, 2), intArrayOf(2, 0))),
        false,
    )
    eq(
        canFinish(
            5,
            arrayOf(intArrayOf(1, 0), intArrayOf(2, 0), intArrayOf(3, 1), intArrayOf(4, 2)),
        ),
        true,
        "a tree",
    )
    println("207 ok")
}
