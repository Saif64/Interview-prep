# System Design, Briefly

A full system design curriculum does not belong in a DSA repository. This is the minimum
map — enough to know what you are being asked and what to study properly elsewhere.

---

## What is actually being graded

Not whether you name the right database. The rubric is roughly:

1. **Did you clarify the requirements before designing?** Jumping straight to boxes is the
   most common failure, at every level.
2. **Did you estimate?** Users, requests per second, storage per year. Rough is fine —
   *order of magnitude* is the point, because it determines whether this is a single
   Postgres box or a sharded cluster.
3. **Can you justify the trade-offs?** Every choice costs something. Saying what it costs is
   the signal.
4. **Do you know where it breaks?** Bottlenecks, failure modes, what happens when a
   component dies.

---

## The shape of a good 45 minutes

| Minutes | What you do |
| :-- | :--- |
| 0–5 | **Clarify.** Who uses it, what are the core features, read-heavy or write-heavy, what is explicitly out of scope. |
| 5–10 | **Estimate.** Daily active users → requests/second → storage. Write the numbers down. |
| 10–15 | **API and data model.** The handful of endpoints that matter, and what a row looks like. |
| 15–30 | **High level design.** Client → load balancer → service → cache → database. Draw it, then justify each box. |
| 30–40 | **Go deep** on one thing — whatever the interviewer poked at, or the hardest part. |
| 40–45 | **Bottlenecks and failure.** What breaks first at 10x, and what happens when this component dies. |

Narrate throughout. Silence reads as being stuck even when you are thinking.

---

## Concepts worth being able to explain

If you can explain each of these in two sentences *including the cost*, you can hold a
design conversation:

**Scaling:** vertical vs horizontal · load balancing · stateless services · sharding
(and how you pick a shard key) · read replicas.

**Data:** SQL vs NoSQL, and *when each is actually right* · indexes and what they cost on
writes · normalisation vs denormalisation · the CAP theorem, stated honestly (it is about
behaviour during a partition, not a general "pick two").

**Caching:** where to put it (client, CDN, application, database) · cache-aside vs
write-through · eviction (you already implemented [LRU](../neetcode-150/06-linked-list/0146-lru-cache.js))
· invalidation, which is genuinely hard · the thundering herd.

**Asynchrony:** message queues · pub/sub · why you would move work out of the request path ·
idempotency and why retries demand it.

**Reality:** replication and its lag · consistent hashing · rate limiting · the difference
between availability and durability · monitoring, and what you would actually alert on.

---

## Designing systems that use AI

Increasingly its own question. The parts that are different from a normal service:

- **Latency is a first-class problem.** Model calls are hundreds of milliseconds to seconds.
  Streaming responses, and doing the work asynchronously where you can, is usually the
  design.
- **Cost scales with usage in a way most services do not.** Per-token pricing means caching
  and prompt size are budget decisions, not just performance ones.
- **Outputs are non-deterministic.** Anything downstream must validate rather than trust.
  Schema-constrained output, then verification, then a fallback path.
- **Retrieval is the usual architecture.** Chunk, embed, store in a vector index, retrieve,
  put it in the prompt. Know why each step exists, and that retrieval quality — not the
  model — is usually what is broken.
- **Evaluation is the hard part.** "How do you know it got better?" is the question that
  separates people who have shipped one of these from people who have read about them.

---

## Where to actually learn this

This page is a map, not the territory. For real preparation:

- **Designing Data-Intensive Applications** (Kleppmann) — the one book worth reading cover
  to cover.
- **The System Design Primer** (github.com/donnemartin/system-design-primer) — free, broad.
- Engineering blogs from companies at the scale you are interviewing for. Real constraints
  beat idealised diagrams.

And practise **out loud, with a whiteboard and a person**. System design is a conversation,
and it is the one round you cannot prepare for silently.
