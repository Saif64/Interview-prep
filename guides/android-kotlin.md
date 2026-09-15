# The Android / Kotlin Interview

A DSA round is only part of a mobile loop. The rest is Android-specific, and in 2026 it is
noticeably less about syntax and API trivia than it used to be — interviewers ask about
internals, lifecycle correctness, performance trade-offs, and decisions you actually shipped.

This is the map of what gets asked and why.

---

## What a mobile loop usually contains

| Round | What it is | What it is really testing |
| :--- | :--- | :--- |
| **DSA** | The same coding round as any backend role | Problem solving under time pressure |
| **Android fundamentals** | Lifecycle, coroutines, Compose, memory | Do you understand the platform or just use it |
| **Mobile system design** | "Design the Instagram feed screen" | Offline, caching, pagination, state |
| **Code review / debugging** | Read a screen that leaks or janks, find it | Real-world diagnostic skill |
| **Behavioural** | The usual | Ownership, conflict, judgement |

The DSA round is covered by everything else in this repo. This page is the rest.

---

## Kotlin language

**Null safety.** `?.`, `?:`, `!!`, `lateinit`, `lazy`. Be able to say *when `!!` is
acceptable* (almost never in production; occasionally in tests) and what `lateinit` costs
(no null check, throws if unset, cannot be a primitive).

**`val` vs `var` vs immutability.** `val` means the reference cannot be reassigned, **not**
that the object is immutable. `val list = mutableListOf<Int>()` is still mutable. This is
asked a lot.

**Data classes** — what `copy`, `equals`, `hashCode`, and destructuring give you, and the
trap: generated `equals` only considers properties in the **primary constructor**.

**Scope functions** — `let`, `run`, `with`, `apply`, `also`. Know which return the receiver
(`apply`, `also`) and which return the lambda result (`let`, `run`, `with`). The honest
answer to "which do you use?" is usually `let` for null handling and `apply` for
configuration, and that is fine to say.

**Sealed classes and `when`** — modelling state exhaustively. This is the idiomatic answer to
"how do you represent loading / success / error?".

**Extension functions** — and the gotcha that they are resolved **statically**, so they do
not participate in polymorphism.

**Inline / reified** — why `inline` exists (lambda allocation, non-local returns) and what
`reified` buys you (a generic type that survives erasure).

---

## Coroutines

The single most-asked Android topic. Interviewers no longer accept "it's for async work".

**Structured concurrency** is the headline concept: coroutines have a lifetime tied to a
`CoroutineScope`, a parent does not complete until its children do, and cancelling a parent
cancels its children. That is what prevents leaked work.

Be able to explain:

| Concept | The thing to actually say |
| :--- | :--- |
| `launch` vs `async` | Fire-and-forget vs returns a `Deferred` you `await` |
| `suspend` | A function that can pause without blocking a thread |
| **Dispatchers** | `Main` for UI, `IO` for network/disk, `Default` for CPU |
| `viewModelScope` / `lifecycleScope` | Scopes cancelled automatically at the right time |
| **Cancellation is cooperative** | A tight CPU loop never cancels — check `isActive` or call a suspending function |
| `withContext` | Switch dispatcher without a new coroutine |
| `supervisorScope` | One child failing does not cancel its siblings |
| `SharedFlow` vs `StateFlow` | Events vs state; `StateFlow` always has a value and conflates |

**`StateFlow` vs `LiveData`** is a near-guaranteed question. `StateFlow` is Kotlin-first,
works with structured concurrency, composes with other flows, and is not tied to the Android
framework — which is why it has become the default. `LiveData` is lifecycle-aware out of the
box, which was its main advantage before `repeatOnLifecycle` existed.

**The cancellation trap** — worth having an answer ready:

```kotlin
// Never cancels: no suspension point, so nothing checks for cancellation.
while (true) { heavyCpuWork() }

// Cancels correctly.
while (isActive) { heavyCpuWork() }
```

---

## Jetpack Compose

Now the default UI toolkit, and interviews test mechanics, not just usage.

**Recomposition** — what triggers it, and why it may run *often*. Composables must therefore
be side-effect free and cheap, and must not rely on execution order or run count.

**State** — `remember` (survives recomposition), `rememberSaveable` (survives configuration
change and process death), and hoisting state so composables stay stateless and testable.

**Stability and skipping** — the performance question. Compose skips a composable when its
parameters are *stable*. An unstable parameter (a `List` interface type, a class with `var`
fields, a lambda capturing unstable state) defeats skipping and causes needless
recomposition. `@Immutable` / `@Stable` and `ImmutableList` are the usual fixes. Being able
to explain this separates people who have profiled a Compose screen from people who have not.

**Side effects** — and when each is right:

| Effect | Use it for |
| :--- | :--- |
| `LaunchedEffect(key)` | Suspending work tied to composition; cancelled on leave or key change |
| `rememberCoroutineScope()` | Work started by a user event (a click), not by composition |
| `DisposableEffect` | Something needing explicit cleanup (listeners, callbacks) |
| `derivedStateOf` | Deriving state where you want to avoid recomposing on every change |
| `produceState` | Converting a non-Compose async source into `State` |

**`LaunchedEffect` vs `rememberCoroutineScope`** is asked constantly. Short version: the
first is driven by composition, the second by events.

---

## Architecture

**MVVM / MVI, and why.** Have an opinion and a reason. MVI's single immutable state object
makes state transitions explicit and testable; MVVM is lighter. Either answer is fine with
justification; "because Google recommends it" is not.

**Unidirectional data flow** — events up, state down.

**Layering** — UI / domain / data, and repositories as the boundary that hides whether data
came from network or cache.

**Dependency injection** — Hilt or Koin. Know what DI buys you (testability, lifecycle
scoping) rather than just the annotations.

**Modularisation** — why (build times, ownership boundaries, enforced separation) and the
cost (more wiring, more Gradle complexity).

---

## The things that bite in production

These make the best answers because they are real:

- **Configuration changes and process death.** `rememberSaveable`, `SavedStateHandle`. A
  surprising number of candidates have never handled process death.
- **Memory leaks.** The classic: a long-lived object holding an `Activity` context. Know why
  you pass `applicationContext` where you can, and what LeakCanary does.
- **Lifecycle correctness.** Collecting a flow with `repeatOnLifecycle(STARTED)` instead of
  leaking collection while the UI is in the background.
- **Jank.** Work on the main thread, over-recomposition, unbounded lists without keys.
- **Target SDK migrations.** Interviewers specifically like asking about one you actually
  shipped — permissions, background restrictions, predictive back, edge-to-edge. Have the
  story.

---

## Mobile system design

Different from backend system design. Given "design the feed screen", they want:

- **Pagination** — cursor-based, and `Paging 3` if you have used it
- **Caching and offline** — Room as source of truth, network as a refresher; what happens on
  a cold start with no connectivity
- **Image loading** — Coil/Glide, memory vs disk cache, sizing to avoid decoding full-res
- **State** — loading, empty, error, and partial states as a sealed hierarchy
- **Sync conflicts** — what happens when a local write and a remote change disagree
- **Battery and data** — WorkManager for deferrable work, constraints on metered networks
- **Testability** — where the seams are

The single best thing you can bring is a real trade-off you made and its consequence.

---

## Questions worth being ready for

- Walk me through what happens when the user rotates the screen mid-network-call.
- Why might a Compose screen recompose more than you expect, and how would you find out?
- How do you cancel work when the user leaves the screen, and what if that work is CPU-bound?
- `StateFlow` or `LiveData` for a new screen — which, and why?
- How would you make this screen work offline?
- Tell me about a target-SDK migration you shipped and what broke.
- How do you test a ViewModel that exposes a `StateFlow`?

---

## Practising

Write the answers out and say them aloud — see [mock-interviews.md](mock-interviews.md). For
the platform questions specifically, the strongest answers come from something you actually
built, so pick two or three screens from your own work and be able to talk about their state
handling, their failure modes, and what you would change.

The Kotlin solutions in [`neetcode-150/kotlin`](../neetcode-150/kotlin) cover the DSA half of
the loop; this page covers the half that decides mobile offers.
