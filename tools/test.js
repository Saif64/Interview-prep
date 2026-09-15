#!/usr/bin/env node
// Runs the self-check block at the bottom of every NeetCode 150 solution.
// No test framework: each solution is executable on its own, and this just runs them all.
//
//   node tools/test.js            # everything
//   node tools/test.js trees      # only paths containing "trees"

const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const SOLUTIONS = path.join(ROOT, 'neetcode-150');
const filter = process.argv[2];

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.name.endsWith('.js') ? [full] : [];
  });

const files = walk(SOLUTIONS)
  .filter((f) => !path.basename(f).startsWith('_') || f.endsWith('_lib.test.js'))
  .filter((f) => !filter || f.includes(filter))
  .sort();

let passed = 0;
const failures = [];

for (const file of files) {
  const label = path.relative(ROOT, file);
  try {
    execFileSync(process.execPath, [file], { stdio: 'pipe', timeout: 30000 });
    passed++;
  } catch (error) {
    failures.push([label, (error.stderr?.toString() || error.message).trim().split('\n').slice(0, 6).join('\n')]);
  }
}

for (const [label, message] of failures) {
  console.error(`\nFAIL ${label}\n${message}`);
}

console.log(`\n${passed}/${files.length} passed${failures.length ? `, ${failures.length} failed` : ''}`);
process.exit(failures.length ? 1 : 0);
