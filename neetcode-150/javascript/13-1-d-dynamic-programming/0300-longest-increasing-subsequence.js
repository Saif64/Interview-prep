// 300. Longest Increasing Subsequence — Medium
// https://leetcode.com/problems/longest-increasing-subsequence/
// Pattern: 1-D DP + Binary Search (patience sorting)
// Time O(n log n) | Space O(n)
//
// Idea: `tails[k]` holds the smallest possible tail of an increasing subsequence of length
// k + 1. Each number either extends the longest run or replaces the first tail >= itself,
// keeping future options as open as possible. The answer is tails.length.
// Note `tails` is NOT itself a valid subsequence — only its length is meaningful.
// The O(n^2) DP (dp[i] = best run ending at i) is the version to explain first.

/**
 * @param {number[]} nums
 * @return {number}
 */
const lengthOfLIS = (nums) => {
  const tails = [];
  for (const n of nums) {
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < n) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = n; // appends when lo === tails.length
  }
  return tails.length;
};

module.exports = { lengthOfLIS };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]), 4);
  assert.strictEqual(lengthOfLIS([0, 1, 0, 3, 2, 3]), 4);
  assert.strictEqual(lengthOfLIS([7, 7, 7, 7]), 1); // strictly increasing only
  assert.strictEqual(lengthOfLIS([]), 0);
  assert.strictEqual(lengthOfLIS([4, 3, 2, 1]), 1);

  // Cross-check against the straightforward O(n^2) DP on random input.
  const naive = (nums) => {
    if (!nums.length) return 0;
    const dp = new Array(nums.length).fill(1);
    for (let i = 1; i < nums.length; i++) {
      for (let j = 0; j < i; j++) if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
    return Math.max(...dp);
  };
  for (let t = 0; t < 300; t++) {
    const arr = Array.from({ length: Math.floor(Math.random() * 25) }, () =>
      Math.floor(Math.random() * 20)
    );
    assert.strictEqual(lengthOfLIS(arr), naive(arr), String(arr));
  }
  console.log('300 ok');
}
