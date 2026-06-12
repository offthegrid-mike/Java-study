# Java Interview Prep

A [Docusaurus](https://docusaurus.io/) site covering mid-level Java interview topics —
syntax, data types, classes, OOP, generics, collections, exceptions, and garbage
collection — with runnable in-browser Java examples, flashcards, quizzes, and an
interview Q&A bank with browser-local progress tracking.

Live site: https://offthegrid-mike.github.io/Java-study/

## Develop

```bash
npm install        # install dependencies (clean, no flags)
npm run start      # dev server at http://localhost:3000
npm test           # run component/logic tests (Jest + React Testing Library)
npm run build      # production build into ./build
npm run serve      # serve the production build locally
```

## Project layout

- `docs/` — topic pages (`.mdx`), one per concept, plus `intro.md` and `interview-qa.mdx`.
- `src/components/` — interactive widgets: `RunnableJava` (Piston API), `Flashcard`,
  `Quiz`, `InterviewQA`, and the shared `hooks/useProgress` localStorage hook.
- `src/pages/` — landing page (`index.jsx`) and the `progress.jsx` dashboard.
- `project-notes/build-journal.md` — build log (not published).

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes it to GitHub Pages. One-time setup: in the repo's **Settings → Pages →
Source**, select **GitHub Actions**.

Deployment config lives in `docusaurus.config.js`
(`url`, `baseUrl`, `organizationName`, `projectName`) — already set for this repo as a
project page (`baseUrl: /Java-study/`).

## Runnable code

`RunnableJava` blocks execute Java via the free public [Piston API](https://github.com/engineer-man/piston).
No API key is required; the visitor's browser makes the request, so an internet
connection is needed to run snippets.
