// 567. Permutation in String — Medium
// https://leetcode.com/problems/permutation-in-string/
// Pattern: Sliding Window
// Time O(n) | Space O(1)
//
// Idea: a permutation is just a letter-count match, so slide a fixed-size window over s2
// and compare counts. `matches` tracks how many of the 26 counters already agree, which
// turns the per-step comparison from O(26) into O(1).

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const checkInclusion = (s1, s2) => {
  if (s1.length > s2.length) return false;

  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);
  for (let i = 0; i < s1.length; i++) {
    need[s1.charCodeAt(i) - 97]++;
    window[s2.charCodeAt(i) - 97]++;
  }

  let matches = 0;
  for (let i = 0; i < 26; i++) if (need[i] === window[i]) matches++;

  for (let right = s1.length; right < s2.length; right++) {
    if (matches === 26) return true;

    const add = s2.charCodeAt(right) - 97;
    window[add]++;
    if (window[add] === need[add]) matches++;
    else if (window[add] === need[add] + 1) matches--;

    const remove = s2.charCodeAt(right - s1.length) - 97;
    window[remove]--;
    if (window[remove] === need[remove]) matches++;
    else if (window[remove] === need[remove] - 1) matches--;
  }
  return matches === 26;
};

module.exports = { checkInclusion };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(checkInclusion('ab', 'eidbaooo'), true);
  assert.strictEqual(checkInclusion('ab', 'eidboaoo'), false);
  assert.strictEqual(checkInclusion('adc', 'dcda'), true);
  assert.strictEqual(checkInclusion('abc', 'ab'), false);
  assert.strictEqual(checkInclusion('a', 'a'), true); // window never slides
  console.log('567 ok');
}
