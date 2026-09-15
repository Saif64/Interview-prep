# The Coding Round, Minute by Minute

You have 45 minutes and an interviewer who is filling in a rubric. This is what to do with
the time, and what the rubric is actually measuring.

---

## What is being scored

Almost never "did you get the optimal solution". Usually four axes:

| Axis | What it means | How to show it |
| :--- | :--- | :--- |
| **Problem solving** | Do you have a method, or do you flail? | Clarify, brute force, then optimise — out loud |
| **Coding** | Is the code clean and correct? | Real names, small functions, no half-finished lines |
| **Verification** | Do you check your own work? | Trace an example; name the edge cases |
| **Communication** | Can we work with you? | Narrate; take hints; ask before assuming |

A working brute force with clear reasoning and good communication beats a half-finished
optimal solution written in silence. Most candidates get this backwards.

---

## The 45 minutes

### 0–5 — Clarify. Do not skip this.

Ask about input size, value ranges, duplicates, empty input, whether the input can be
mutated, and what to return when there is no answer. Repeat the problem back in your own
words and get agreement.

This catches misunderstandings while they are free, and it is itself a scored signal.

### 5–10 — Brute force, out loud

Say the obvious solution and its complexity. Do not write it yet.

> "The straightforward version is: for each element, scan the rest. That's O(n²) time, O(1)
> space. Let me see whether I can do better before I write it."

This buys you credit even if you never improve it, and it gives the interviewer a chance to
say "that's fine, go ahead" — which is often exactly what they want.

### 10–15 — Find the bottleneck, name the pattern

What is the brute force *wasting*?

| Waste | Fix |
| :--- | :--- |
| Rescanning for a value | Hash map |
| Rescanning a sorted range | Two pointers / binary search |
| Recomputing a subproblem | Memoise → DP |
| Repeatedly finding the max/min | Heap |
| Re-checking overlaps | Sort first |

Say the name out loud: "this feels like a sliding window because the subarray has to be
contiguous." Being wrong with a reason still scores. Silence does not.

See [patterns.md](patterns.md) for the full table.

### 15–35 — Code it

- Say what you are about to write before you write it.
- Use real names. `left`, `right`, `seen` — not `i`, `j`, `m`.
- Write helpers rather than nesting four levels deep.
- If you get stuck, say what you are stuck on. Interviewers give hints to people who are
  legibly stuck and not to people who are silently stuck.

### 35–42 — Verify before they ask

Walk a real example through your code, line by line, out loud. Then hit the edge cases you
named at minute three: empty, single element, all duplicates, negatives, the maximum size.

Finding your own bug here is a *strong* positive signal. Having the interviewer find it is a
weak one. This is the most under-used five minutes in the whole interview.

### 42–45 — Complexity and trade-offs

State time and space. Then say what you would do differently with more time, or under a
different constraint:

> "This is O(n log n) because of the sort. If the values were bounded I'd bucket them and get
> O(n). And if the array were huge I'd want to avoid the copy."

---

## Things that quietly lose points

- **Silence longer than about twenty seconds.** Narrate, even if it is "I'm thinking about
  whether a heap helps here."
- **Ignoring a hint.** Interviewers hint when they want you to change direction. Take it and
  say you are taking it.
- **Arguing when corrected.** Check, then agree or explain your reasoning calmly.
- **Never testing.** Submitting code without tracing it reads as careless.
- **Pretending to recognise a problem you have memorised.** Interviewers can tell, and the
  follow-up questions expose it immediately. Better: "I've seen this one — want me to go
  through the reasoning anyway?" That is honest and usually appreciated.
- **Asking no questions at the end.** Have two ready.

---

## When you are completely stuck

It happens, and it is survivable if you handle it well:

1. **Say so.** "I'm stuck on how to avoid recomputing this. Let me think about it from a
   different angle."
2. **Solve a smaller version.** n = 1, n = 2, n = 3. Patterns show up in small cases.
3. **Solve a different version.** "If the array were sorted, I'd do X." Sometimes the
   interviewer will tell you that you may assume that.
4. **Ask for a hint.** Costs less than fifteen silent minutes. Genuinely.
5. **Write the brute force.** A working slow solution is worth far more than nothing.

---

## Remote-specific

- Test your setup *the day before*, not five minutes prior.
- Have water, and have the problem window and your editor arranged so you are not
  alt-tabbing.
- If you share your screen, close everything else first.
- Look at the camera occasionally. It reads as engagement.
- If your connection drops, rejoin and carry on — it is not held against you.
