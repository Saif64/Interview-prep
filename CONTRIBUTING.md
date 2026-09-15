# Contributing

Contributions are welcome — new solutions, ports to other languages, and improvements to the
guides. The guides benefit most from real interview experience, so if something here does not
match what you actually saw in a loop, say so.

## Setup

```bash
git clone https://github.com/Saif64/Interview-prep.git
cd Interview-prep

node tools/test.js          # JavaScript suite — needs only Node 18+
node tools/test-kotlin.js   # Kotlin suite — needs kotlinc
```

There are no dependencies and there will not be any.

For the Kotlin suite, install the compiler with [SDKMAN](https://sdkman.io):

```bash
sdk install kotlin
```

If `kotlinc` is missing, `tools/test-kotlin.js` skips with a note rather than failing, so you
can still work on the JavaScript side without it.

## The one rule

**A solution must run and pass its own assertions.** CI enforces it on both languages.

Everything else below is convention, and convention is negotiable. That rule is not.

## Where things go

```
neetcode-150/kotlin/src/01-arrays-and-hashing/0217-contains-duplicate.kt
neetcode-150/javascript/01-arrays-and-hashing/0217-contains-duplicate.js
guides/                      the interview side — process, resume, negotiation, patterns
Data structures/ algorithms/ from-scratch implementations
```

Name solution files `NNNN-problem-slug` with a zero-padded four-digit LeetCode id.

After adding or removing a file, regenerate the indexes:

```bash
node tools/build-index.js
```

`SOLUTIONS.md` and `neetcode-150/README.md` are **generated** — edit the generator, never the
Markdown.

## The file format

Four things, in order:

1. **Header** — number, title, difficulty, URL, pattern, complexity.
2. **The idea** — a few lines on *why* this works. Name the trap, or the naive approach this
   beats. This is the most valuable part of the file; write it for someone who just failed the
   problem.
3. **The solution.**
4. **Assertions in a `main`** — the LeetCode examples plus **at least one edge case**: empty
   input, a single element, all duplicates, all-negative, whatever actually breaks a naive
   version.

### Kotlin

```kotlin
@file:JvmName("ContainsDuplicate")
// 217. Contains Duplicate — Easy
// https://leetcode.com/problems/contains-duplicate/
// Pattern: Arrays & Hashing
// Time O(n) | Space O(n)
//
// Idea: a Set drops duplicates, so a size mismatch means there was at least one.
// If the interviewer asks for O(1) space, sort first and compare neighbours — O(n log n).

package neetcode.arrayshashing

import neetcode.lib.eq

fun containsDuplicate(nums: IntArray): Boolean = nums.toHashSet().size != nums.size

fun main() {
    eq(containsDuplicate(intArrayOf(1, 2, 3, 1)), true)
    eq(containsDuplicate(intArrayOf(1, 2, 3, 4)), false)
    eq(containsDuplicate(intArrayOf()), false)
    println("217 ok")
}
```

The `@file:JvmName` is what lets the filename keep its problem number while the compiled
class gets a sensible name — the test runner uses it to find each `main`. Give every file a
unique one.

Helpers (`ListNode`, `TreeNode`, `eq`, `that`, `treeOf`, `listOfNodes`, `bag`, `bagOfLists`)
live in [`neetcode-150/kotlin/src/00-lib/Lib.kt`](neetcode-150/kotlin/src/00-lib/Lib.kt).
Prefer `eq` over `check` — it prints both sides when it fails.

Kotlin has no built-in heap; use `java.util.PriorityQueue`.

### JavaScript

```js
// 217. Contains Duplicate — Easy
// https://leetcode.com/problems/contains-duplicate/
// Pattern: Arrays & Hashing
// Time O(n) | Space O(n)
//
// Idea: a Set drops duplicates, so a size mismatch means there was at least one.

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = (nums) => new Set(nums).size !== nums.length;

module.exports = { containsDuplicate };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(containsDuplicate([1, 2, 3, 1]), true);
  assert.strictEqual(containsDuplicate([]), false);
  console.log('217 ok');
}
```

Helpers live in [`neetcode-150/javascript/_lib.js`](neetcode-150/javascript/_lib.js).

## What makes a good explanation

The comment should answer *"why didn't the obvious thing work?"*

> **Not this:** "Use a sliding window and track the max count."
>
> **This:** "`maxCount` is deliberately never decreased: the answer only grows, so a stale
> high value can never produce a longer-than-real result."

If you had to stare at something for ten minutes before it clicked, write down what made it
click. That sentence is worth more than the code.

## Other languages

Python, Java, Go, Swift and Rust ports are all open. Add a sibling directory:

```
neetcode-150/python/01-arrays-and-hashing/0217-contains-duplicate.py
```

Keep the same header, and keep the "runs its own checks when executed directly" property using
whatever the language's idiom is (`if __name__ == "__main__"`, a `main` function, and so on).
Add a runner under `tools/` that follows the shape of the existing two.

Open an issue first if you are planning a whole pattern folder, so two people don't do the
same one.

## Contributing to the guides

The [guides](guides) are the part of this repo that matters most and the part most likely to
be wrong or out of date. Useful contributions:

- A round format you encountered that is not described here
- A negotiation outcome and what actually moved the number
- Corrections where the advice does not match current reality
- A language or platform section (the Android/Kotlin guide has no equivalent for iOS, web, or
  data roles yet)

Write from experience rather than from other blog posts, and keep the voice plain.

## Style

- Descriptive names over short ones: `maxCount`, not `mc`.
- Comment the *why*, never the *what*. `i++ // increment i` is noise.
- Match the surrounding file. There is no linter and there does not need to be one.

## Pull requests

- One logical change per PR. A pattern folder of ports is one logical change; five unrelated
  fixes is not.
- Run the test suites and `node tools/build-index.js` before pushing.
- Say what you changed and why. A sentence is plenty.

Not sure about something? Open an issue and ask. That is always fine.
