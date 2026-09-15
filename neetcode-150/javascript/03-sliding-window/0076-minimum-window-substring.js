// 76. Minimum Window Substring — Hard
// https://leetcode.com/problems/minimum-window-substring/
// Pattern: Sliding Window
// Time O(n + m) | Space O(alphabet)
//
// Idea: expand right until the window covers t, then shrink from the left while it still
// does. `have`/`need` counts how many distinct characters are fully satisfied, so checking
// "is the window valid?" stays O(1) instead of rescanning the map every step.

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = (s, t) => {
  if (!t.length || s.length < t.length) return '';

  const need = new Map();
  for (const ch of t) need.set(ch, (need.get(ch) ?? 0) + 1);

  const window = new Map();
  let have = 0;
  const required = need.size;
  let best = [0, 0];
  let bestLength = Infinity;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    window.set(ch, (window.get(ch) ?? 0) + 1);
    if (need.has(ch) && window.get(ch) === need.get(ch)) have++;

    while (have === required) {
      if (right - left + 1 < bestLength) {
        bestLength = right - left + 1;
        best = [left, right];
      }
      const leftCh = s[left];
      window.set(leftCh, window.get(leftCh) - 1);
      if (need.has(leftCh) && window.get(leftCh) < need.get(leftCh)) have--;
      left++;
    }
  }
  return bestLength === Infinity ? '' : s.slice(best[0], best[1] + 1);
};

module.exports = { minWindow };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(minWindow('ADOBECODEBANC', 'ABC'), 'BANC');
  assert.strictEqual(minWindow('a', 'a'), 'a');
  assert.strictEqual(minWindow('a', 'aa'), ''); // duplicates in t must be counted, not deduped
  assert.strictEqual(minWindow('', 'a'), '');
  console.log('76 ok');
}
