# Task Management Dashboard

A demo SPA built with React and Feature-Sliced Design architecture, using [JSONPlaceholder](https://jsonplaceholder.typicode.com) as a fake REST API.

## Tech Stack

| Layer | Technology |
|---|---|
| Build | Vite |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Server state | TanStack Query v5 |
| Client state | Jotai |
| HTTP | Axios |
| Forms | React Hook Form + Zod |

## Architecture

The project follows **Feature-Sliced Design (FSD)**:

```
src/
├── app/          # Providers and app-level setup
├── entities/     # Business entities (Task)
├── features/     # User interactions (create-task, filter-tasks)
├── widgets/      # Composite UI blocks (task-list)
└── shared/       # Reusable API client, UI primitives
```

Each slice exposes a single `index.ts` as its public API. No layer imports from a layer above it.

## Features

- **Task list** — fetches 200 todos from JSONPlaceholder on load
- **Filtering** — switch between All / Active / Completed views via Jotai atom
- **Create task** — form with title + priority selector, validated with Zod
- **Toggle status** — click the checkbox to complete or reopen a task
- **Optimistic updates** — the UI updates instantly; rolls back on error
- **Unique IDs** — new tasks get a `crypto.getRandomValues` ID to avoid duplicate-key warnings

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.
