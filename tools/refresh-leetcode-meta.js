#!/usr/bin/env node
/**
 * Refreshes tools/leetcode-meta.json from LeetCode's public problem list.
 * Only needed when you solve a problem newer than the cached snapshot.
 *
 *   node tools/refresh-leetcode-meta.js
 *
 * Stored shape: { "two-sum": [1, "Two Sum", "Easy", 0], ... }
 *                                                   ^ 1 if LeetCode Premium
 */

const fs = require('node:fs');
const path = require('node:path');

const SOURCE = 'https://leetcode.com/api/problems/all/';
const LEVELS = ['', 'Easy', 'Medium', 'Hard'];

const main = async () => {
  const response = await fetch(SOURCE);
  if (!response.ok) throw new Error(`${SOURCE} responded ${response.status}`);

  const data = await response.json();
  const out = {};
  for (const pair of data.stat_status_pairs) {
    out[pair.stat.question__title_slug] = [
      pair.stat.frontend_question_id,
      pair.stat.question__title,
      LEVELS[pair.difficulty.level],
      pair.paid_only ? 1 : 0,
    ];
  }

  const target = path.join(__dirname, 'leetcode-meta.json');
  fs.writeFileSync(target, JSON.stringify(out, null, 1) + '\n');
  console.log(`wrote ${Object.keys(out).length} problems to ${path.relative(process.cwd(), target)}`);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
