<div align="center">

# Interview Prep

**Everything between "I should start applying" and "I signed the offer."**

The resume that gets the call, the rounds in the middle, the negotiation at the end —
and 150 practice problems with the reasoning written out.

[![Guides](https://img.shields.io/badge/guides-12-2ea44f?style=flat-square)](#-the-interview)
[![Solutions](https://img.shields.io/badge/solutions-193_problems-2ea44f?style=flat-square)](SOLUTIONS.md)
[![Kotlin](https://img.shields.io/badge/Kotlin-7F52FF?style=flat-square&logo=kotlin&logoColor=white)](neetcode-150/kotlin)
[![Tests](https://github.com/Saif64/Interview-prep/actions/workflows/ci.yml/badge.svg)](https://github.com/Saif64/Interview-prep/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=flat-square)](CONTRIBUTING.md)

[**Start here**](#-start-here) · [**The interview**](#-the-interview) · [**Practice**](#-practice) · [**AI-era interviewing**](guides/ai-era-interviews.md)

</div>

---

Most interview repos are a pile of solutions. Solutions are the easy part — a model can write
every one of them in seconds. What actually decides offers is the stuff around them: whether
your resume gets read, whether you can think out loud, whether you know what a round is
measuring, and whether you negotiate at the end.

**So this repo is organised around the interview, not around the problem list.**

---

## 🧭 Start here

Where are you in the process right now?

| Right now | Read this |
| :--- | :--- |
| **Not applied yet** | [The process, end to end](guides/the-process.md) → [Resume](guides/resume.md) |
| **Applications are out** | [Study plans](guides/study-plan.md) → [The 18 patterns](guides/patterns.md) |
| **Loop is next week** | [The coding round, minute by minute](guides/coding-interview-playbook.md) → [Practise out loud](guides/mock-interviews.md) |
| **Interview is tomorrow** | [The 18 patterns](guides/patterns.md) — recognition beats recall |
| **Offer in hand** | [Negotiation](guides/negotiation.md) — do not accept on the call |
| **Worried AI made this pointless** | [Interviewing when the machine can already solve it](guides/ai-era-interviews.md) |
| **Interviewing for Android** | [The Android / Kotlin interview](guides/android-kotlin.md) |

---

## 🗺️ The pipeline

Each stage filters for something different, and most people only prepare for one of them.

```mermaid
graph LR
    A[Resume<br/>screen] --> B[Recruiter<br/>call]
    B --> C[Technical<br/>screen]
    C --> D[On-site<br/>loop]
    D --> E[Behavioural]
    E --> F[Offer &<br/>negotiation]

    A -.- A1["keywords<br/>numbers<br/>artefacts"]
    B -.- B1["don't name<br/>a number"]
    C -.- C1["think<br/>out loud"]
    D -.- D1["patterns<br/>system design"]
    E -.- E1["six STAR<br/>stories"]
    F -.- F1["counter once<br/>get it in writing"]

    style A fill:#ddf4ff,stroke:#54aeff
    style B fill:#ddf4ff,stroke:#54aeff
    style C fill:#fff8c5,stroke:#d4a72c
    style D fill:#fff8c5,stroke:#d4a72c
    style E fill:#dafbe1,stroke:#4ac26b
    style F fill:#ffeff7,stroke:#ff80c8
    style A1 fill:none,stroke:none
    style B1 fill:none,stroke:none
    style C1 fill:none,stroke:none
    style D1 fill:none,stroke:none
    style E1 fill:none,stroke:none
    style F1 fill:none,stroke:none
```

---

## 📋 The interview

### Getting in the door

| Guide | What it covers |
| :--- | :--- |
| [**The process, end to end**](guides/the-process.md) | Every stage, what it filters for, where people lose offers they should have won |
| [**Resume**](guides/resume.md) | The bullet formula, why ATS parsers reject good resumes, what to cut |

### The rounds

| Guide | What it covers |
| :--- | :--- |
| [**The 18 patterns**](guides/patterns.md) | Recognise the shape of a problem in two minutes. The most useful page here. |
| [**The coding round, minute by minute**](guides/coding-interview-playbook.md) | What to do with the 45 minutes, and what the rubric actually scores |
| [**Interviewing in the AI era**](guides/ai-era-interviews.md) | AI-allowed rounds, code-comprehension rounds, and how to answer "do you use AI?" |
| [**System design**](guides/system-design.md) | The 45-minute shape, the concepts, and designing systems that use models |
| [**The Android / Kotlin interview**](guides/android-kotlin.md) | Coroutines, Compose stability, lifecycle, mobile system design |
| [**The behavioural round**](guides/behavioral.md) | Six stories that cover thirty questions |

### Getting good, and getting paid

| Guide | What it covers |
| :--- | :--- |
| [**Practise out loud**](guides/mock-interviews.md) | The highest-value habit almost nobody builds deliberately |
| [**Study plans**](guides/study-plan.md) | 1 week / 4 weeks / 3 months, including what to cut when time runs out |
| [**Negotiation**](guides/negotiation.md) | Don't name a number first. Don't accept on the call. What else is negotiable. |
| [**Resources**](guides/resources.md) | A short, opinionated list — books, platforms, mocks, comp data |

---

## 💻 Practice

Practice is one input to interviewing, not the whole thing — but you do still have to do it.

### [NeetCode 150](neetcode-150/README.md)

The 150 problems from [neetcode.io](https://neetcode.io/practice), grouped into 18 patterns,
in **Kotlin** and **JavaScript**. Every solution explains *why* the approach works and names
the trap, and every one runs its own assertions:

```bash
node tools/test.js          # the JavaScript suite
node tools/test-kotlin.js   # the Kotlin suite
```

Open any file and you get the idea, the complexity, and the edge cases that break the naive
version — written as tests you can run and break yourself:

```kotlin
// 424. Longest Repeating Character Replacement — Medium
// Time O(n) | Space O(1)
//
// Idea: a window is legal when (length - count of its most common character) <= k.
// `maxCount` is deliberately never decreased: the answer only grows, so a stale high
// value can never produce a longer-than-real result.
```

### [Every solution, indexed](SOLUTIONS.md)

**193 problems** across Kotlin, JavaScript, C++ and Java, cross-linked when a problem is
solved in more than one. Generated from the repo, so it never goes stale.

| 🟩 Easy | 🟨 Medium | 🟥 Hard |
| :-----: | :-------: | :-----: |
| 51 | 116 | 26 |

### Foundations

`Data structures/` and `algorithms/` hold the things built from nothing — linked lists, trees,
graphs, heaps, sorting, searching, Big-O demonstrations. Start here if you want to understand
*why* a hash map is O(1) before using one to solve Two Sum.

---

## 🧠 How to practise so it transfers

Reading solutions is the least useful thing you can do with them.

1. **Solve it yourself first**, badly if necessary. The brute force counts.
2. **State the complexity out loud** before checking. Being wrong here is the most useful
   signal you get.
3. **Find the bottleneck**, then name the pattern that removes it. Rescanning → hash map.
   Recomputing → memoise. This step *is* the skill.
4. **Then** open the solution here and compare reasoning, not syntax.
5. **Re-solve it from scratch in three days.** Non-negotiable.

If you are doing this at a desk in silence, you are practising the wrong half — see
[Practise out loud](guides/mock-interviews.md).

---

## 🤝 Contributing

PRs welcome. The 150 are solved in Kotlin and JavaScript, so **Python, Java, Go, Swift and
Rust ports are all open** — and so is anything that improves the guides.

See [CONTRIBUTING.md](CONTRIBUTING.md). The one rule: **a solution must run and pass its own
assertions.** CI checks it.

Good first contributions:

- Port a pattern folder to your language
- Add a section to a guide from your own interview experience
- Improve an explanation that didn't click for you
- Fix a typo — genuinely, they all help

<a href="https://github.com/Saif64/Interview-prep/graphs/contributors"><img src="https://contrib.rocks/image?repo=Saif64/Interview-prep" alt="Contributors"/></a>

---

<div align="center">

**If this helped, a ⭐ helps someone else find it.**

Something unclear, wrong, or missing —
[open an issue](https://github.com/Saif64/Interview-prep/issues).

Built by [Muntasir Mahmud Saif](https://github.com/Saif64) ·
[LinkedIn](https://www.linkedin.com/in/muntasir-mahmud-saif-9a0900233/) ·
[LeetCode](https://leetcode.com/mmSaif_64/)

</div>
