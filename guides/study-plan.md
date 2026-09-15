# Study Plans

Pick the one that matches the time you actually have, not the time you wish you had.

Every plan below assumes the same daily loop:

> solve it yourself → state the complexity → find the bottleneck → name the pattern →
> compare against the solution here → **re-solve it from scratch three days later**

The re-solve is not optional. It is where the learning happens.

---

## 1 week — the emergency plan

You have an interview on Friday. Do not attempt 150 problems.

Do **only the ⭐ Blind 75 subset** in the [NeetCode 150](../neetcode-150/README.md), and only
these patterns, in this order:

| Day | Pattern | Problems |
| :-- | :--- | :-- |
| 1 | Arrays & Hashing, Two Pointers | ~10 |
| 2 | Sliding Window, Stack | ~8 |
| 3 | Binary Search, Linked List | ~10 |
| 4 | Trees | ~10 |
| 5 | Graphs | ~8 |
| 6 | 1-D DP | ~8 |
| 7 | **Re-solve everything you failed.** No new problems. | — |

If you run out of time, cut Graphs before you cut Trees. Trees come up more.

---

## 4 weeks — the standard plan

The full 150, one pattern at a time, roughly 6 problems a day.

**Week 1 — foundations**
Arrays & Hashing → Two Pointers → Sliding Window → Stack

These carry the most weight per hour. If you only half-finish this plan, finish this week
properly.

**Week 2 — structures**
Binary Search → Linked List → Trees → Tries → Heap

Trees is the biggest single block (15 problems). Do not rush it.

**Week 3 — search and graphs**
Backtracking → Graphs → Advanced Graphs

The hardest week. Expect to look at solutions more often here — that is fine, as long as
you re-solve from the idea rather than from memory.

**Week 4 — DP and the rest**
1-D DP → 2-D DP → Greedy → Intervals → Math & Geometry → Bit Manipulation

Then spend the last two days re-solving every problem you got wrong the first time. That
list is worth more than any new problem.

---

## 3 months — the thorough plan

Weeks 1–4: the standard plan above, unhurried.

Weeks 5–8:
- Re-solve all 150 from scratch. Aim for 20 minutes per medium.
- Add [system design](system-design.md) — one topic a week, out loud.
- Start doing problems on a timer, because the clock is its own skill.

Weeks 9–12:
- Mock interviews with a real human. This is the highest-value thing in the whole plan and
  the one most people skip.
- Write your [behavioural stories](behavioral.md) down. Six of them, in STAR form.
- Build or finish one project you can talk about for twenty minutes.
- Practise the [AI-allowed round](ai-era-interviews.md) format specifically — narrate your
  delegation, verify out loud.

---

## The rules that matter more than the schedule

**Time-box it.** 25 minutes on a medium, 40 on a hard. Then look. Staring for two hours
teaches you nothing except that you can stare for two hours.

**Track your failures, not your completions.** A spreadsheet of "problems I could not
re-solve on day 3" is the only progress metric worth keeping.

**Depth beats count, always.** 80 problems you can rebuild from the idea are worth more than
400 you have seen once. This has always been true and is more true now that recall is the
cheapest skill on the market.

**Say it out loud.** Both because interviews are spoken, and because explaining is how you
find out you did not actually understand it.

**Rest.** Tired pattern-matching is bad pattern-matching. Six focused days beat seven
exhausted ones.

---

## Tracking progress

The checkboxes in [the NeetCode 150 index](../neetcode-150/README.md) track which solutions
exist in this repo, not which ones *you* have done. Fork it and keep your own list — a
simple table of `problem | first attempt | re-solve | notes` is enough, and the notes column
is the part that pays off.
