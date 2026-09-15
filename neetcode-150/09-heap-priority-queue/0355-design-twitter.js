// 355. Design Twitter — Medium
// https://leetcode.com/problems/design-twitter/
// Pattern: Heap
// Time: getNewsFeed O(f log f) for f followees | Space O(tweets + follows)
//
// Idea: store each user's tweets newest-last with a global decreasing timestamp, then
// merge the followee lists like k sorted lists — a heap over "the newest unread tweet per
// followee" pops the ten most recent without scanning everything.
// A user always sees their own tweets, whether or not they follow themselves.

const { Heap } = require('../_lib');

class Twitter {
  constructor() {
    this.clock = 0;
    this.tweets = new Map(); // userId -> [[time, tweetId], ...] ascending by time
    this.following = new Map(); // userId -> Set of followeeIds
  }

  /**
   * @param {number} userId
   * @param {number} tweetId
   */
  postTweet(userId, tweetId) {
    if (!this.tweets.has(userId)) this.tweets.set(userId, []);
    this.tweets.get(userId).push([this.clock++, tweetId]);
  }

  /**
   * @param {number} userId
   * @return {number[]} up to 10 most recent tweet ids, newest first
   */
  getNewsFeed(userId) {
    const sources = new Set(this.following.get(userId) ?? []);
    sources.add(userId);

    // Seed with the newest tweet of each source: [time, tweetId, ownerTweets, nextIndex]
    const heap = new Heap((a, b) => b[0] - a[0]); // newest first
    for (const source of sources) {
      const list = this.tweets.get(source);
      if (!list?.length) continue;
      const i = list.length - 1;
      heap.push([list[i][0], list[i][1], list, i - 1]);
    }

    const feed = [];
    while (heap.size && feed.length < 10) {
      const [, tweetId, list, next] = heap.pop();
      feed.push(tweetId);
      if (next >= 0) heap.push([list[next][0], list[next][1], list, next - 1]);
    }
    return feed;
  }

  /**
   * @param {number} followerId
   * @param {number} followeeId
   */
  follow(followerId, followeeId) {
    if (!this.following.has(followerId)) this.following.set(followerId, new Set());
    this.following.get(followerId).add(followeeId);
  }

  /**
   * @param {number} followerId
   * @param {number} followeeId
   */
  unfollow(followerId, followeeId) {
    this.following.get(followerId)?.delete(followeeId);
  }
}

module.exports = { Twitter };

if (require.main === module) {
  const assert = require('node:assert');
  const t = new Twitter();
  t.postTweet(1, 5);
  assert.deepStrictEqual(t.getNewsFeed(1), [5]); // own tweets without following self
  t.follow(1, 2);
  t.postTweet(2, 6);
  assert.deepStrictEqual(t.getNewsFeed(1), [6, 5]);
  t.unfollow(1, 2);
  assert.deepStrictEqual(t.getNewsFeed(1), [5]);
  assert.deepStrictEqual(t.getNewsFeed(99), []); // unknown user

  const cap = new Twitter();
  for (let i = 1; i <= 15; i++) cap.postTweet(7, i);
  assert.deepStrictEqual(cap.getNewsFeed(7), [15, 14, 13, 12, 11, 10, 9, 8, 7, 6]); // capped at 10
  console.log('355 ok');
}
