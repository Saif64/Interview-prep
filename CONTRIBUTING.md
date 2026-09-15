# Contributing

Contributions are welcome — new solutions, better explanations, ports to other languages,
or just a typo fix.

## Setup

```bash
git clone https://github.com/Saif64/Interview-prep.git
cd Interview-prep
node tools/test.js     # should print "151/151 passed"
```

Node 18 or newer. There are no dependencies and there will not be any.

## The one rule

**A solution must run and pass its own assertions.** CI enforces it:

```bash
node neetcode-150/01-arrays-and-hashing/0001-two-sum.js   # prints "1 ok"
```

Everything else below is convention, and convention is negotiable. That rule is not.

## Adding a solution

Put it in the pattern folder it belongs to, named `NNNN-problem-slug.js` with a
zero-padded four-digit LeetCode id:

```
neetcode-150/01-arrays-and-hashing/0217-contains-duplicate.js
```

Then regenerate the indexes:

```bash
node tools/build-index.js
```

`SOLUTIONS.md` and `neetcode-150/README.md` are **generated** — edit the generator, never
the Markdown.

## The file format

```js
// 217. Contains Duplicate — Easy
// https://leetcode.com/problems/contains-duplicate/
// Pattern: Arrays & Hashing
// Time O(n) | Space O(n)
//
// Idea: a Set drops duplicates, so a size mismatch means there was at least one.
// If the interviewer asks for O(1) space, sort first and compare neighbours — O(n log n).

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = (nums) => new Set(nums).size !== nums.length;

module.exports = { containsDuplicate };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(containsDuplicate([1, 2, 3, 1]), true);
  assert.strictEqual(containsDuplicate([1, 2, 3, 4]), false);
  assert.strictEqual(containsDuplicate([]), false);
  console.log('217 ok');
}
```

Four things, in order:

1. **Header** — number, title, difficulty, URL, pattern, complexity.
2. **The idea** — a few lines on *why* this works. Name the trap, or the naive approach this
   beats. This is the most valuable part of the file; write it for someone who just failed
   the problem.
3. **The solution** — `module.exports` it so other solutions can reuse it.
4. **Assertions** under `require.main === module` — the LeetCode examples plus **at least
   one edge case**: empty input, a single element, all-duplicates, all-negative, whatever
   actually breaks a naive version.

Shared helpers (`ListNode`, `TreeNode`, `Heap`, `toList`, `toTree`) live in
[`neetcode-150/_lib.js`](neetcode-150/_lib.js). Use them rather than redefining.

## What makes a good explanation

The comment should answer *"why didn't the obvious thing work?"*

> **Not this:** "Use a sliding window and track the max count."
>
> **This:** "`maxCount` is deliberately never decreased: the answer only grows, so a stale
> high value can never produce a longer-than-real result."

If you had to stare at something for ten minutes before it clicked, write down what made it
click. That sentence is worth more than the code.

## Other languages

The 150 are JavaScript only, so ports are genuinely useful. Keep the same folder and file
name, change the extension:

```
neetcode-150/01-arrays-and-hashing/0217-contains-duplicate.py
```

Keep the same header and the same "runs its own checks when executed directly" property,
using whatever the language's idiom is (`if __name__ == "__main__"`, a `main` function, and
so on). Open an issue first if you are planning a whole pattern folder, so two people don't
do the same one.

## Style

- Descriptive names over short ones: `maxCount`, not `mc`.
- Comment the *why*, never the *what*. `i++ // increment i` is noise.
- Match the surrounding file. There is no linter and there does not need to be one.

## Pull requests

- One logical change per PR. A pattern folder of ports is one logical change; five unrelated
  fixes is not.
- Run `node tools/test.js` and `node tools/build-index.js` before pushing.
- Say what you changed and why. A sentence is plenty.

Not sure about something? Open an issue and ask. That is always fine.
