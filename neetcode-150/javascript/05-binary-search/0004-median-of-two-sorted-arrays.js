// 4. Median of Two Sorted Arrays — Hard
// https://leetcode.com/problems/median-of-two-sorted-arrays/
// Pattern: Binary Search
// Time O(log(min(m, n))) | Space O(1)
//
// Idea: binary search the *partition point*, not a value. Cut the shorter array so that
// left halves of both arrays together hold exactly half the elements; the cut is correct
// when maxLeftA <= minRightB and maxLeftB <= minRightA.
// Infinities stand in for "nothing on that side" so the edge cases need no special casing.

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const findMedianSortedArrays = (nums1, nums2) => {
  const [a, b] = nums1.length <= nums2.length ? [nums1, nums2] : [nums2, nums1];
  const total = a.length + b.length;
  const half = Math.floor(total / 2);

  let lo = 0;
  let hi = a.length;
  while (lo <= hi) {
    const cutA = Math.floor((lo + hi) / 2);
    const cutB = half - cutA;

    const maxLeftA = cutA > 0 ? a[cutA - 1] : -Infinity;
    const minRightA = cutA < a.length ? a[cutA] : Infinity;
    const maxLeftB = cutB > 0 ? b[cutB - 1] : -Infinity;
    const minRightB = cutB < b.length ? b[cutB] : Infinity;

    if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
      if (total % 2) return Math.min(minRightA, minRightB);
      return (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2;
    }
    if (maxLeftA > minRightB) hi = cutA - 1;
    else lo = cutA + 1;
  }
  return 0;
};

module.exports = { findMedianSortedArrays };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(findMedianSortedArrays([1, 3], [2]), 2);
  assert.strictEqual(findMedianSortedArrays([1, 2], [3, 4]), 2.5);
  assert.strictEqual(findMedianSortedArrays([], [1]), 1); // one side empty
  assert.strictEqual(findMedianSortedArrays([2], []), 2);
  assert.strictEqual(findMedianSortedArrays([1, 2, 3, 4, 5], [6, 7, 8]), 4.5); // no interleaving

  // Cross-check against a brute-force merge on random inputs.
  const naive = (x, y) => {
    const m = [...x, ...y].sort((p, q) => p - q);
    const mid = m.length >> 1;
    return m.length % 2 ? m[mid] : (m[mid - 1] + m[mid]) / 2;
  };
  for (let t = 0; t < 500; t++) {
    const rand = (n) => Array.from({ length: n }, () => Math.floor(Math.random() * 20)).sort((p, q) => p - q);
    const x = rand(Math.floor(Math.random() * 6));
    const y = rand(Math.floor(Math.random() * 6) + (x.length ? 0 : 1));
    if (!x.length && !y.length) continue;
    assert.strictEqual(findMedianSortedArrays(x, y), naive(x, y), `${x} | ${y}`);
  }
  console.log('4 ok');
}
