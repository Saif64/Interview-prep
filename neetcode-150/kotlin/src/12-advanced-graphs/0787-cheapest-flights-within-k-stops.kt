@file:JvmName("CheapestFlightsWithinKStops")
// 787. Cheapest Flights Within K Stops — Medium
// https://leetcode.com/problems/cheapest-flights-within-k-stops/
// Pattern: Advanced Graphs (Bellman-Ford)
// Time O(k * E) | Space O(V)
//
// Idea: plain Dijkstra is WRONG here — the cheapest route may use too many stops, and the one
// it discards might be the only legal one. Bellman-Ford relaxes all edges k + 1 times, so
// after round i the costs are exactly "best price using at most i flights".
// Relaxing from a SNAPSHOT of the previous round is essential; updating in place would let
// one round chain several flights together.

package neetcode.advancedgraphs

import neetcode.lib.eq

fun findCheapestPrice(n: Int, flights: Array<IntArray>, src: Int, dst: Int, k: Int): Int {
    var costs = IntArray(n) { Int.MAX_VALUE }
    costs[src] = 0

    repeat(k + 1) {
        val snapshot = costs.copyOf()
        for (flight in flights) {
            val (from, to, price) = Triple(flight[0], flight[1], flight[2])
            if (snapshot[from] == Int.MAX_VALUE) continue
            if (snapshot[from] + price < costs[to]) costs[to] = snapshot[from] + price
        }
    }
    return if (costs[dst] == Int.MAX_VALUE) -1 else costs[dst]
}

fun main() {
    eq(
        findCheapestPrice(
            4,
            arrayOf(
                intArrayOf(0, 1, 100), intArrayOf(1, 2, 100), intArrayOf(2, 0, 100),
                intArrayOf(1, 3, 600), intArrayOf(2, 3, 200),
            ),
            0, 3, 1,
        ),
        700,
    )
    val small = arrayOf(intArrayOf(0, 1, 100), intArrayOf(1, 2, 100), intArrayOf(0, 2, 500))
    eq(findCheapestPrice(3, small, 0, 2, 1), 200)
    eq(
        findCheapestPrice(3, small, 0, 2, 0),
        500,
        "no stops allowed: the two-hop bargain is illegal",
    )
    eq(findCheapestPrice(2, arrayOf(intArrayOf(0, 1, 10)), 1, 0, 5), -1, "no route back")
    eq(findCheapestPrice(1, arrayOf(), 0, 0, 0), 0)
    println("787 ok")
}
