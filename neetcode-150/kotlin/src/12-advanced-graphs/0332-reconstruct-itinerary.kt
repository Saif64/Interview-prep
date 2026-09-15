@file:JvmName("ReconstructItinerary")
// 332. Reconstruct Itinerary — Hard
// https://leetcode.com/problems/reconstruct-itinerary/
// Pattern: Advanced Graphs (Hierholzer's algorithm)
// Time O(E log E) | Space O(E)
//
// Idea: use every ticket exactly once — an Eulerian path. Plain greedy "always take the
// smallest airport" gets stuck in dead ends, so Hierholzer's trick is to only add an airport
// to the route once it has no tickets left, then reverse at the end. Sorting each destination
// list descending lets removeLast() take the lexicographically smallest in O(1).

package neetcode.advancedgraphs

import neetcode.lib.eq

fun findItinerary(tickets: List<List<String>>): List<String> {
    val destinations = HashMap<String, MutableList<String>>()
    for ((from, to) in tickets.map { it[0] to it[1] }) {
        destinations.getOrPut(from) { mutableListOf() }.add(to)
    }
    for (list in destinations.values) list.sortDescending() // removeLast() => smallest

    val route = ArrayList<String>()
    val stack = ArrayDeque<String>()
    stack.addLast("JFK")
    while (stack.isNotEmpty()) {
        val airport = stack.last()
        val next = destinations[airport]
        if (!next.isNullOrEmpty()) {
            stack.addLast(next.removeAt(next.size - 1))
        } else {
            route.add(stack.removeLast()) // stuck here: this airport belongs at the end
        }
    }
    return route.reversed()
}

fun main() {
    eq(
        findItinerary(
            listOf(
                listOf("MUC", "LHR"), listOf("JFK", "MUC"),
                listOf("SFO", "SJC"), listOf("LHR", "SFO"),
            )
        ),
        listOf("JFK", "MUC", "LHR", "SFO", "SJC"),
    )
    // The greedy choice (ATL first) would strand the traveller; Hierholzer's handles it.
    eq(
        findItinerary(
            listOf(
                listOf("JFK", "SFO"), listOf("JFK", "ATL"), listOf("SFO", "ATL"),
                listOf("ATL", "JFK"), listOf("ATL", "SFO"),
            )
        ),
        listOf("JFK", "ATL", "JFK", "SFO", "ATL", "SFO"),
    )
    eq(
        findItinerary(listOf(listOf("JFK", "KUL"), listOf("JFK", "NRT"), listOf("NRT", "JFK"))),
        listOf("JFK", "NRT", "JFK", "KUL"),
    )
    eq(findItinerary(listOf(listOf("JFK", "AAA"))), listOf("JFK", "AAA"))
    println("332 ok")
}
