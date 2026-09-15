// 72. Edit Distance — Medium
// https://leetcode.com/problems/edit-distance/
// Pattern: 2-D DP
// Time O(m * n) | Space O(n)
//
// Idea: Levenshtein distance. Matching characters cost nothing and move diagonally;
// otherwise pay 1 and take the cheapest of insert (left), delete (up), replace (diagonal).
// Base cases are the giveaway: turning a prefix into the empty string costs its length.

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance = (word1, word2) => {
  let previous = Array.from({ length: word2.length + 1 }, (_, j) => j);

  for (let i = 1; i <= word1.length; i++) {
    const current = new Array(word2.length + 1).fill(0);
    current[0] = i;
    for (let j = 1; j <= word2.length; j++) {
      current[j] =
        word1[i - 1] === word2[j - 1]
          ? previous[j - 1]
          : 1 + Math.min(previous[j - 1], previous[j], current[j - 1]);
    }
    previous = current;
  }
  return previous[word2.length];
};

module.exports = { minDistance };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(minDistance('horse', 'ros'), 3);
  assert.strictEqual(minDistance('intention', 'execution'), 5);
  assert.strictEqual(minDistance('', 'abc'), 3);
  assert.strictEqual(minDistance('abc', ''), 3);
  assert.strictEqual(minDistance('same', 'same'), 0);
  console.log('72 ok');
}
