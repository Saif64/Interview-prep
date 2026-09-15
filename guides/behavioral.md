# The Behavioural Round

The round people prepare for least and get rejected on most.

It is not a personality test. It is an evidence round: the interviewer has a rubric with
items like *"handles conflict"*, *"drives work without being told"*, *"learns from
failure"*, and they are trying to fill it with specifics you provide.

Vague answers fail not because they are wrong but because there is nothing to write down.

---

## STAR, and the part everyone gets wrong

**S**ituation → **T**ask → **A**ction → **R**esult.

Most people spend 80% of the answer on Situation. Invert it. The interviewer needs about two
sentences of context; what they are grading is **Action** — what *you specifically* decided
and did.

> **Weak:** "We had a lot of production issues so we worked really hard and fixed them."
>
> **Strong:** "Our checkout service was paging twice a week. *(S)* I owned reliability that
> quarter. *(T)* I pulled six months of incidents into a spreadsheet and found that four of
> the last seven traced to the same retry logic — it retried non-idempotent writes. I wrote
> a design doc proposing idempotency keys, got pushback from the payments team on latency,
> so I prototyped it and measured the actual cost at 3ms. That unblocked the decision.
> *(A)* Paging dropped to roughly once a month, and I wrote the runbook the on-call rotation
> still uses. *(R)*"

The second one contains numbers, a disagreement, a decision, and a lasting artefact. Those
are four separate rubric items filled by one story.

Say "I" when you mean I. "We" hides exactly the information being asked for.

---

## Prepare six stories, not thirty answers

Questions get recycled endlessly; stories are reusable. Write six, and each will answer
several questions.

| Story | Covers |
| :--- | :--- |
| **A project you drove end to end** | ownership, ambiguity, impact, "proudest work" |
| **A time you disagreed with someone** | conflict, influence, "disagreed with your manager" |
| **A real failure** | ownership, learning, "biggest mistake" |
| **Something technically hard** | depth, trade-offs, "hardest bug" |
| **A time you helped someone else** | mentoring, teamwork, leadership signal |
| **A time you changed your mind** | humility, data-driven thinking |

For each, write down: two sentences of context, the three or four decisions **you** made,
one number, and one thing that outlived the project.

---

## The failure question

*"Tell me about a time you failed."*

This is the highest-variance question in the round, and it has one requirement: **the
failure must be real**. "I care too much" and "I worked too hard" are non-answers that read
as evasion.

A good failure story has four parts:
1. Something genuinely went wrong, and your decision contributed to it.
2. You own your part without over-apologising or blaming the team.
3. You say what you *actually* learned — specifically, not "communication is important".
4. You can point to a later situation where you did it differently.

Part 4 is what turns a failure into evidence of growth. Have it ready.

---

## The AI question

You will be asked some version of *"how do you use AI tools?"* — see
[ai-era-interviews.md](ai-era-interviews.md) for the full treatment. The short version:
name a real workflow, name a real failure you caught, and state your rule for what you will
not delegate.

---

## Questions to ask them

Not asking questions reads as not caring. Generic questions ("what's the culture like?")
read as not having thought about it. Ask things whose answers would actually change your
decision:

- "What does the on-call rotation look like, and how often does it page?"
- "What's something the team tried in the last year that didn't work?"
- "How does work get chosen — top-down roadmap, or do engineers propose things?"
- "What would you want the person in this role to have accomplished in six months?"
- "What's the biggest source of friction in shipping here right now?"

The last two are the most useful. The answers tell you whether the role is real and whether
they are honest about their problems.

---

## Practical notes

- **Rehearse out loud.** Stories that read well often collapse when spoken. Time them —
  two to three minutes each.
- **Keep the numbers.** "Reduced p99 from 800ms to 120ms" is memorable; "made it faster"
  is not. Approximate honestly if you cannot recall exactly.
- **Do not over-script.** Memorised answers sound memorised. Know the beats, not the words.
- **Have the stories written down** somewhere you can re-read an hour before the call.
