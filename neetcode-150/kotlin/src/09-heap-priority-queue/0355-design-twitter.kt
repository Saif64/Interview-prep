@file:JvmName("TwitterMain")
// 355. Design Twitter — Medium
// https://leetcode.com/problems/design-twitter/
// Pattern: Heap
// Time: getNewsFeed O(f log f) for f followees | Space O(tweets + follows)
//
// Idea: store each user's tweets newest-last with a global increasing timestamp, then merge
// the followee lists like k sorted lists — a heap over "the newest unread tweet per followee"
// pops the ten most recent without scanning everything.
// A user always sees their own tweets, whether or not they follow themselves.

package neetcode.heap

import neetcode.lib.eq
import java.util.PriorityQueue

class Twitter {
    private var clock = 0
    private val tweets = HashMap<Int, MutableList<Pair<Int, Int>>>() // user -> [(time, tweetId)]
    private val following = HashMap<Int, MutableSet<Int>>()

    fun postTweet(userId: Int, tweetId: Int) {
        tweets.getOrPut(userId) { mutableListOf() }.add(clock++ to tweetId)
    }

    fun getNewsFeed(userId: Int): List<Int> {
        val sources = HashSet(following[userId] ?: emptySet())
        sources.add(userId)

        // (time, tweetId, that user's tweet list, index of the next older tweet)
        val heap = PriorityQueue<Triple<Pair<Int, Int>, List<Pair<Int, Int>>, Int>>(
            compareByDescending { it.first.first } // newest first
        )
        for (source in sources) {
            val list = tweets[source] ?: continue
            if (list.isEmpty()) continue
            val i = list.size - 1
            heap.add(Triple(list[i], list, i - 1))
        }

        val feed = ArrayList<Int>(10)
        while (heap.isNotEmpty() && feed.size < 10) {
            val (entry, list, next) = heap.poll()
            feed.add(entry.second)
            if (next >= 0) heap.add(Triple(list[next], list, next - 1))
        }
        return feed
    }

    fun follow(followerId: Int, followeeId: Int) {
        following.getOrPut(followerId) { mutableSetOf() }.add(followeeId)
    }

    fun unfollow(followerId: Int, followeeId: Int) {
        following[followerId]?.remove(followeeId)
    }
}

fun main() {
    val t = Twitter()
    t.postTweet(1, 5)
    eq(t.getNewsFeed(1), listOf(5), "own tweets without following self")
    t.follow(1, 2)
    t.postTweet(2, 6)
    eq(t.getNewsFeed(1), listOf(6, 5))
    t.unfollow(1, 2)
    eq(t.getNewsFeed(1), listOf(5))
    eq(t.getNewsFeed(99), emptyList(), "unknown user")

    val cap = Twitter()
    for (i in 1..15) cap.postTweet(7, i)
    eq(cap.getNewsFeed(7), listOf(15, 14, 13, 12, 11, 10, 9, 8, 7, 6), "capped at 10")
    println("355 ok")
}
