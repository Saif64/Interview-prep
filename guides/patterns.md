# The 18 Patterns

Almost every interview problem is one of a small number of shapes wearing a costume. If you
can name the shape in the first two minutes, the rest is implementation.

This is the recognition table. Each row: the tell in the problem statement, what the pattern
actually does, and a solution here to read.

---

## Quick lookup: what the problem says → what to reach for

| The problem mentions… | Reach for |
| :--- | :--- |
| "sorted array" | [Binary Search](#5-binary-search), [Two Pointers](#2-two-pointers) |
| "contiguous subarray / substring" | [Sliding Window](#3-sliding-window) |
| "all permutations / combinations / subsets" | [Backtracking](#10-backtracking) |
| "top K" / "K closest" / "median of a stream" | [Heap](#9-heap--priority-queue) |
| "next greater" / "previous smaller" | [Stack](#4-stack) (monotonic) |
| "shortest path in an unweighted graph" | [Graphs](#11-graphs) (BFS) |
| "shortest path with weights" | [Advanced Graphs](#12-advanced-graphs) (Dijkstra) |
| "is there an ordering / any cycles" | [Graphs](#11-graphs) (topological sort) |
| "are these connected" / "merge groups" | [Advanced Graphs](#12-advanced-graphs) (union-find) |
| "how many ways" / "minimum cost to" | [Dynamic Programming](#13-1-d-dynamic-programming) |
| "maximum / minimum, one pass, no going back" | [Greedy](#15-greedy) |
| "overlapping ranges / meeting rooms" | [Intervals](#16-intervals) |
| "prefix" / autocomplete / word dictionary | [Tries](#8-tries) |
| "without extra space" / "constant space" | [Bit Manipulation](#18-bit-manipulation), in-place pointers |
| "in-order gives sorted" | [Trees](#7-trees) (BST) |

---

## 1. Arrays & Hashing

**The tell:** counting, grouping, deduping, or "have I seen this before?"

**What it does:** trades O(n) memory for O(1) lookup, collapsing a nested loop into one pass.
This is the single most common optimisation in interviews — if you see a double loop
searching for a value, a hash map almost certainly removes the inner one.

**Watch for:** using a *signature* as the key rather than the value itself — letter counts
for anagrams, `(row, col, box)` for sudoku.

**Read:** [Two Sum](../neetcode-150/kotlin/src/01-arrays-and-hashing/0001-two-sum.kt) ·
[Group Anagrams](../neetcode-150/kotlin/src/01-arrays-and-hashing/0049-group-anagrams.kt) ·
[Longest Consecutive Sequence](../neetcode-150/kotlin/src/01-arrays-and-hashing/0128-longest-consecutive-sequence.kt)

## 2. Two Pointers

**The tell:** a sorted array, a palindrome, or "find a pair/triple that…".

**What it does:** sortedness means each comparison tells you which side to discard, so one
pass replaces the O(n²) pair scan.

**Watch for:** the deduplication logic in k-sum problems — that is where these are usually
lost, not in the main loop.

**Read:** [3Sum](../neetcode-150/kotlin/src/02-two-pointers/0015-3sum.kt) ·
[Container With Most Water](../neetcode-150/kotlin/src/02-two-pointers/0011-container-with-most-water.kt) ·
[Trapping Rain Water](../neetcode-150/kotlin/src/02-two-pointers/0042-trapping-rain-water.kt)

## 3. Sliding Window

**The tell:** "contiguous", "substring", "subarray of size k". Contiguity is the keyword —
if elements can be skipped, this is not it.

**What it does:** maintains a window and a summary of its contents, so extending or
shrinking by one costs O(1) instead of rescanning.

**Watch for:** fixed-size windows (slide) versus variable-size (grow right, shrink left
while invalid). Know which one you are writing before you start.

**Read:** [Longest Substring Without Repeating Characters](../neetcode-150/kotlin/src/03-sliding-window/0003-longest-substring-without-repeating-characters.kt) ·
[Minimum Window Substring](../neetcode-150/kotlin/src/03-sliding-window/0076-minimum-window-substring.kt) ·
[Sliding Window Maximum](../neetcode-150/kotlin/src/03-sliding-window/0239-sliding-window-maximum.kt)

## 4. Stack

**The tell:** nesting and matching (brackets, expressions), or "the next element greater
than this one".

**What it does:** remembers things whose fate is still undecided. A **monotonic** stack
keeps them in sorted order so that a new element resolves several at once — that is what
makes "next greater element" linear rather than quadratic.

**Read:** [Valid Parentheses](../neetcode-150/kotlin/src/04-stack/0020-valid-parentheses.kt) ·
[Daily Temperatures](../neetcode-150/kotlin/src/04-stack/0739-daily-temperatures.kt) ·
[Largest Rectangle in Histogram](../neetcode-150/kotlin/src/04-stack/0084-largest-rectangle-in-histogram.kt)

## 5. Binary Search

**The tell:** anything sorted — and, less obviously, **any question with a monotonic
yes/no answer**, even with no array in sight.

**What it does:** halves the search space per step.

**Watch for:** the "binary search the answer" variant. *"What is the smallest speed that
finishes in time?"* has no sorted input, but "can we finish at speed k?" is false, false,
false, true, true — so it is binary searchable. Once you see this, a whole class of
problems opens up.

**Read:** [Binary Search](../neetcode-150/kotlin/src/05-binary-search/0704-binary-search.kt) (the template) ·
[Koko Eating Bananas](../neetcode-150/kotlin/src/05-binary-search/0875-koko-eating-bananas.kt) (search the answer) ·
[Median of Two Sorted Arrays](../neetcode-150/kotlin/src/05-binary-search/0004-median-of-two-sorted-arrays.kt) (search the partition)

## 6. Linked List

**The tell:** it is a linked list. The patterns are few and reusable.

**The toolkit:** a **dummy head** removes every "what if it's the first node" branch; the
**slow/fast pointers** find the middle or detect a cycle; **reverse in place** is three
lines you should be able to write without thinking. Most hard linked-list problems are two
or three of these composed.

**Read:** [Reverse Linked List](../neetcode-150/kotlin/src/06-linked-list/0206-reverse-linked-list.kt) ·
[Reorder List](../neetcode-150/kotlin/src/06-linked-list/0143-reorder-list.kt) (all three at once) ·
[LRU Cache](../neetcode-150/kotlin/src/06-linked-list/0146-lru-cache.kt)

## 7. Trees

**The tell:** a tree. Then pick your traversal.

**What it does:** DFS for anything about paths or subtree properties; BFS for anything about
levels or shortest depth. For a **BST**, in-order traversal yields sorted values — that one
fact solves a surprising number of problems.

**Watch for:** the two-quantity pattern. In problems like maximum path sum, what a node
*returns upward* (one branch) differs from what it *contributes to the answer* (both
branches). Conflating them is the classic bug.

**Read:** [Maximum Path Sum](../neetcode-150/kotlin/src/07-trees/0124-binary-tree-maximum-path-sum.kt) ·
[Validate BST](../neetcode-150/kotlin/src/07-trees/0098-validate-binary-search-tree.kt) ·
[Level Order Traversal](../neetcode-150/kotlin/src/07-trees/0102-binary-tree-level-order-traversal.kt)

## 8. Tries

**The tell:** prefixes, autocomplete, or "check many words against this text".

**What it does:** shares prefixes between words so a lookup costs O(word length) regardless
of dictionary size — and, unlike a hash set, it can answer *prefix* questions.

**Watch for:** combining it with backtracking. Word Search II is unsolvable in time without
a trie to prune dead paths.

**Read:** [Implement Trie](../neetcode-150/kotlin/src/08-tries/0208-implement-trie-prefix-tree.kt) ·
[Word Search II](../neetcode-150/kotlin/src/08-tries/0212-word-search-ii.kt)

## 9. Heap / Priority Queue

**The tell:** "top K", "K closest", "median of a stream", "always take the smallest".

**What it does:** O(log n) insert and O(1) access to the extreme, without a full sort.

**Watch for:** the size trick — for "K largest", keep a **min**-heap capped at K. That is
O(n log k) and O(k) space instead of sorting everything. And **two heaps** facing each other
maintain a running median.

**Note:** Kotlin has no heap of its own — use `java.util.PriorityQueue`, and know that
writing one is a fair interview question by itself. (The JavaScript solutions here ship a
hand-written `Heap` in [`_lib.js`](../neetcode-150/javascript/_lib.js) for the same reason.)

**Read:** [Kth Largest Element](../neetcode-150/kotlin/src/09-heap-priority-queue/0215-kth-largest-element-in-an-array.kt) ·
[Find Median from Data Stream](../neetcode-150/kotlin/src/09-heap-priority-queue/0295-find-median-from-data-stream.kt)

## 10. Backtracking

**The tell:** "all possible", "every combination", "generate every valid…".

**What it does:** a DFS over choices — choose, recurse, un-choose. The template is always
the same; the interesting part is the pruning.

**Watch for:** duplicate handling. Sort the input, then skip a candidate equal to the
previous one *at the same level* (`i > start`). This exact line appears in Subsets II,
Combination Sum II, and Permutations II.

**Read:** [Subsets](../neetcode-150/kotlin/src/10-backtracking/0078-subsets.kt) (the template) ·
[Combination Sum II](../neetcode-150/kotlin/src/10-backtracking/0040-combination-sum-ii.kt) (dedup) ·
[N-Queens](../neetcode-150/kotlin/src/10-backtracking/0051-n-queens.kt) (pruning)

## 11. Graphs

**The tell:** a grid, a network, dependencies, "connected", "reachable".

**What it does:** BFS finds the shortest path in an *unweighted* graph; DFS explores
exhaustively; topological sort orders a DAG and detects cycles.

**Watch for:** **multi-source BFS** — seed the queue with *every* start at once (rotting
oranges, walls and gates). Running one BFS per source is the slow version of the same
answer. Also: grids are graphs. Neighbours are the four directions.

**Read:** [Number of Islands](../neetcode-150/kotlin/src/11-graphs/0200-number-of-islands.kt) ·
[Course Schedule](../neetcode-150/kotlin/src/11-graphs/0207-course-schedule.kt) (topological sort) ·
[Rotting Oranges](../neetcode-150/kotlin/src/11-graphs/0994-rotting-oranges.kt) (multi-source)

## 12. Advanced Graphs

**The tell:** weighted edges, minimum spanning trees, "cheapest route with a constraint".

**The toolkit:** **Dijkstra** for shortest paths with non-negative weights; **Bellman-Ford**
when there is a hop limit or negative edges; **union-find** for connectivity and cycle
detection; **Prim/Kruskal** for minimum spanning trees.

**Watch for:** Dijkstra being *wrong* when a constraint exists. Cheapest Flights Within K
Stops needs Bellman-Ford, because Dijkstra will settle a cheap route that uses too many
hops and discard the only legal one.

**Read:** [Network Delay Time](../neetcode-150/kotlin/src/12-advanced-graphs/0743-network-delay-time.kt) (Dijkstra) ·
[Cheapest Flights Within K Stops](../neetcode-150/kotlin/src/12-advanced-graphs/0787-cheapest-flights-within-k-stops.kt) (Bellman-Ford) ·
[Min Cost to Connect All Points](../neetcode-150/kotlin/src/12-advanced-graphs/1584-min-cost-to-connect-all-points.kt) (MST)

## 13. 1-D Dynamic Programming

**The tell:** "how many ways", "minimum/maximum cost to reach", and a recursion that
revisits the same state.

**What it does:** caches subproblem answers. Start from the recursion, add a memo, then
(optionally) flip it into a bottom-up table.

**Watch for:** the space collapse. If `dp[i]` only reads `dp[i-1]` and `dp[i-2]`, the whole
array becomes two variables.

**Read:** [House Robber](../neetcode-150/kotlin/src/13-1-d-dynamic-programming/0198-house-robber.kt) ·
[Coin Change](../neetcode-150/kotlin/src/13-1-d-dynamic-programming/0322-coin-change.kt) ·
[Longest Increasing Subsequence](../neetcode-150/kotlin/src/13-1-d-dynamic-programming/0300-longest-increasing-subsequence.kt)

## 14. 2-D Dynamic Programming

**The tell:** two sequences compared against each other, or a grid.

**What it does:** `dp[i][j]` relates prefixes of two inputs. Matching characters move
diagonally; mismatches take the best of the neighbours.

**Watch for:** loop direction and order. In Coin Change II, coins-outside counts
combinations and amounts-outside counts permutations — different problems, same four lines.
In 0/1 knapsack, iterating upward silently makes it *unbounded*.

**Read:** [Longest Common Subsequence](../neetcode-150/kotlin/src/14-2-d-dynamic-programming/1143-longest-common-subsequence.kt) ·
[Edit Distance](../neetcode-150/kotlin/src/14-2-d-dynamic-programming/0072-edit-distance.kt) ·
[Burst Balloons](../neetcode-150/kotlin/src/14-2-d-dynamic-programming/0312-burst-balloons.kt) (interval DP)

## 15. Greedy

**The tell:** a local rule that seems like it should work.

**What it does:** takes the locally best option and never reconsiders — O(n) instead of
exploring.

**Watch for:** the trap. Greedy is *usually wrong* and you must be able to argue why it is
right here. Coin Change with coins `[1,3,4]` and amount 6 is the counterexample worth
memorising: greedy gives 4+1+1, optimal is 3+3.

**Read:** [Maximum Subarray](../neetcode-150/kotlin/src/15-greedy/0053-maximum-subarray.kt) (Kadane's) ·
[Jump Game](../neetcode-150/kotlin/src/15-greedy/0055-jump-game.kt) ·
[Gas Station](../neetcode-150/kotlin/src/15-greedy/0134-gas-station.kt)

## 16. Intervals

**The tell:** ranges, meetings, bookings, overlaps.

**What it does:** sorting makes overlap a local check between neighbours.

**Watch for:** *what* you sort by. Merging → sort by **start**. Maximising how many fit →
sort by **end** (activity selection). Sorting by start when you needed end is the single
most common bug in this category.

**Read:** [Merge Intervals](../neetcode-150/kotlin/src/16-intervals/0056-merge-intervals.kt) ·
[Non-overlapping Intervals](../neetcode-150/kotlin/src/16-intervals/0435-non-overlapping-intervals.kt) ·
[Meeting Rooms II](../neetcode-150/kotlin/src/16-intervals/0253-meeting-rooms-ii.kt) (sweep line)

## 17. Math & Geometry

**The tell:** matrix rotation, spirals, digit manipulation, overflow rules.

**What it does:** mostly careful index bookkeeping. These reward drawing the small case on
paper before writing anything.

**Watch for:** decomposition. Rotating a matrix is *transpose, then reverse each row* —
two easy operations instead of one four-way swap you will get wrong.

**Read:** [Rotate Image](../neetcode-150/kotlin/src/17-math-and-geometry/0048-rotate-image.kt) ·
[Spiral Matrix](../neetcode-150/kotlin/src/17-math-and-geometry/0054-spiral-matrix.kt) ·
[Set Matrix Zeroes](../neetcode-150/kotlin/src/17-math-and-geometry/0073-set-matrix-zeroes.kt)

## 18. Bit Manipulation

**The tell:** "without extra space", "without using +", XOR-shaped problems, powers of two.

**The toolkit worth memorising:**

| Trick | Meaning |
| :--- | :--- |
| `x ^ x == 0`, `x ^ 0 == x` | XOR cancels pairs — finds the unpaired element |
| `n & (n - 1)` | clears the lowest set bit — counts bits in O(set bits) |
| `n & -n` | isolates the lowest set bit |
| `n & (n - 1) == 0` | n is a power of two |
| `(a & b) << 1` | the carry, when adding without `+` |

**Watch for (JavaScript):** bitwise operators produce **signed** 32-bit integers. Finish
with `>>> 0` when you need an unsigned result.

**Read:** [Single Number](../neetcode-150/kotlin/src/18-bit-manipulation/0136-single-number.kt) ·
[Counting Bits](../neetcode-150/kotlin/src/18-bit-manipulation/0338-counting-bits.kt) ·
[Sum of Two Integers](../neetcode-150/kotlin/src/18-bit-manipulation/0371-sum-of-two-integers.kt)

---

## Using this table under pressure

When you are stuck in an interview, walk it:

1. **What is the input shape?** Sorted? A grid? A tree? Each one halves the candidates.
2. **What is the brute force, and where does it waste work?** Repeated scans → hashing or
   pointers. Repeated subproblems → DP. Repeated comparisons → sorting or a heap.
3. **Say the pattern name out loud.** "This feels like a sliding window because the subarray
   has to be contiguous." Even if it turns out to be wrong, you have just shown the
   interviewer how you think — which is the thing being graded.

Being wrong *with a reason* scores far better than silence.
