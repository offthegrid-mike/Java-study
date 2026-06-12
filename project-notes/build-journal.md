# Build Journal — Java Interview Prep site

Loop memory: one entry per completed task. On resume, read this first.

- Task 1 DONE (scaffold built clean). next: Task 2
- Task 2 DONE (config set, GitHub Pages baseUrl=/Java-study/). next: Task 3
- Task 3 DONE (Jest+RTL runner wired, verified with --passWithNoTests). next: Task 4
- Task 3 FIX: bumped @testing-library/react to v16 (+@testing-library/dom) for React 19; clean npm install verified (no legacy-peer-deps).

- Task 4 DONE (useProgress hook, 3/3 tests pass). next: Task 5
- Task 5 DONE (scoreQuiz, 3/3 tests pass). next: Task 6
- Task 6 DONE (flashcardState nav helpers, 3/3 tests pass). next: Task 7
- Task 7 DONE (Flashcard UI + RTL smoke test, full suite green). next: Task 8
- Task 8 DONE (Quiz UI + RTL smoke test, full suite green). next: Task 9
- Task 9 DONE (InterviewQA UI + RTL smoke test, full suite green). next: Task 10

- Task 10 DONE (RunnableJava + mocked-fetch smoke test, full suite green). next: Task 11
- Task 11 DONE (landing page, sidebar order, CSS; build deferred to Task 12 once docs exist). next: Task 12
- Task 12 DONE (all 10 docs authored; build compiles all MDX, only /progress link pending Task 13). next: Task 13
- Task 13 DONE (progress dashboard; FULL build clean, 0 broken links; removed scaffold markdown-page). next: Task 14
- Task 14 DONE (GitHub Actions deploy workflow; npm ci + build verified clean locally; not pushed). next: Task 15
- Task 15 DONE (README with dev/deploy instructions). next: Task 16 (push + PR, needs user confirmation)
- Task 16 DONE (pushed build/java-prep-site, opened PR #1). REMAINING USER STEPS: merge PR, enable Pages (Settings>Pages>Source>GitHub Actions), verify live deploy.
- Cleanup: removed scaffold blog/ and unused default images (kept favicon); tightened .gitignore to cover bare .env. Build+tests verified green.
