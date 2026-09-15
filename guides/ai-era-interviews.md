# Interviewing When the Machine Can Already Solve It

A model can solve almost everything in this repository. That is worth saying plainly,
because pretending otherwise is why a lot of preparation advice now feels hollow.

So the honest question is not *"can I still get a job?"* It is **"what is the interview
actually measuring now, and am I practising that?"**

---

## What changed, and what did not

Companies responded to assistants in roughly three ways. You will meet all three, often at
the same company for different rounds.

| Format | What it looks like | What it rewards |
| :--- | :--- | :--- |
| **Locked down** | No AI, often on-site or proctored, sometimes on a whiteboard | Recall, fluency, thinking out loud under pressure |
| **AI-allowed** | Use any tool you want, the interviewer watches how | Judgement, prompt-to-verification loop, knowing when the output is wrong |
| **AI-focused** | Debug something a model wrote, review its PR, design a system that uses one | Reading unfamiliar code fast, spotting plausible-but-wrong, system thinking |

What did *not* change: someone still has to decide whether an answer is correct, whether an
approach will hold at scale, and what to do when it fails at 3am. Every format above is a
proxy for that.

---

## The uncomfortable part

If your preparation is "memorise 300 solutions", you are training the one skill that has
been most thoroughly automated. That approach was already weak; it is now actively a
liability, because:

- **In a locked-down round**, memorised solutions collapse the moment the problem is
  reworded. You have patterns, but no model of *why* they work, so you cannot adapt.
- **In an AI-allowed round**, everyone has the same answer within thirty seconds. The
  signal moves entirely to what you do next — and if you have never verified a solution you
  did not write, you have nothing to show.
- **In an AI-focused round**, the code in front of you is subtly wrong on purpose. Pattern
  recall does not help; understanding does.

The fix is not to study more problems. It is to study each problem differently.

---

## How to practise so it transfers

For every problem in this repo, the loop that builds transferable skill is:

1. **Solve it yourself first, badly if necessary.** The brute force counts. Getting
   something working is a real step, and skipping it means you never build the instinct for
   where the cost is.
2. **Say the complexity out loud before you look it up.** Being wrong here is the most
   useful signal you get all session.
3. **Find the bottleneck, then name the pattern that removes it.** "The inner loop is
   rescanning" → hash map. "I keep recomputing the same subproblem" → memoise. This step is
   the actual skill; see [patterns.md](patterns.md).
4. **Now ask a model.** Not for the answer — for the counter-argument. *"Here is my
   solution. What input breaks it? What would you have done differently and why?"*
5. **Verify what it tells you.** Half the value is catching it being confidently wrong.
   Every solution in `neetcode-150/` runs its own assertions for exactly this reason:
   ```bash
   node neetcode-150/02-two-pointers/0015-3sum.js
   ```
   Run it. Change it. Break it. See which assertion fires.
6. **Come back in three days and redo it from scratch.** Spaced repetition is doing more
   work here than volume ever will.

Step 4 is the one people skip, and it is the one that maps directly onto the job.

---

## Being asked about AI in the interview

You will get some version of *"do you use AI tools, and how?"* It is not a trap, and both
extreme answers are bad ones. "I don't use them" reads as incurious. "I use them for
everything" invites the obvious follow-up you cannot answer.

What lands well is specific:

> "I use it heavily for scaffolding, unfamiliar APIs, and first drafts of tests. I don't
> let it near anything I can't review — last month it gave me a caching layer that looked
> right and silently dropped a key expiry. I caught it because I wrote the test first. So
> my rule is: it writes the code, I own the correctness."

That answer works because it contains a real failure and a real policy. Have one ready.
It does not have to be dramatic — it has to be true.

**During an AI-allowed round**, the things that actually score:

- Narrate the delegation. *"I'll have it write the boilerplate parser while I think about
  the edge cases"* is a sentence that demonstrates judgement.
- Check the output in front of them. Run it. Feed it the degenerate input. Say what you
  are checking for.
- Catch something. If you disagree with the tool and can say why, that is the strongest
  single signal available in that format.
- Never paste something you cannot explain line by line. This is the one fatal error, and
  interviewers probe for it directly.

---

## What to do with the anxiety

Some of it is justified. Junior hiring genuinely got harder, and "I can write code" is
worth less than it was. Pretending otherwise does not help anyone.

But the thing being devalued is *typing code*, not *engineering*. The people who are fine
are the ones who can hold a system in their head, tell a good answer from a plausible one,
and keep going when the tooling gives up. Those are all learnable, and the problems in this
repo are a reasonable gym for them — as long as you train the reasoning, not the recall.

Concretely, that means:

- **Depth over count.** 80 problems you can rebuild from the idea beat 400 you have seen.
- **Explain it to someone.** Or to a rubber duck, or in a comment. Every solution here has a
  written idea at the top because writing it down is where the understanding gets tested.
- **Build one real thing.** A project you can discuss for twenty minutes does more for a
  senior loop than fifty extra LeetCode problems.
- **Practise the verification loop deliberately.** It is the skill with the clearest upward
  trend, and almost nobody trains it on purpose.

---

## Where to start

| You have | Do this |
| :--- | :--- |
| A week | The ⭐ Blind 75 subset in [the NeetCode 150](../neetcode-150/README.md) |
| A month | The full 150, one pattern at a time |
| Longer | The 150, plus [the study plan](study-plan.md), plus a project worth talking about |

And read [patterns.md](patterns.md) before you start grinding. Knowing which of the
eighteen patterns a problem belongs to is most of solving it — and it is the part that
survives contact with a problem you have never seen.
