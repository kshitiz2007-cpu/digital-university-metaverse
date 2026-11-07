# Digital University Metaverse

A greenfield, full-stack learning platform combining an interactive 3D university campus with a book-first digital library and learning workspace.

## Product direction

- **Campus World:** interactive destinations for Academy, Library, Study Hall, Lecture Theatre, AI Lab, Examination Centre, Editorial Pavilion, Community and Achievements.
- **Living Library:** book shelves, structured chapters, page navigation, bookmarks, highlights, annotations and PDF reading.
- **Learning Workspace:** study modules, classes, quizzes, editorials, mains practice and student progress.
- **Admin Studio:** content publishing, book management, campus configuration and student operations.

## Stack

- Next.js App Router, React and TypeScript
- Tailwind CSS v4
- React Three Fiber / Three.js for the campus scene
- Motion for interface transitions
- Zustand for client interaction state
- Supabase (planned integration) for auth, database and storage

## Development

Run `npm install` and then `npm run dev`.

Create `.env.local` when Supabase is configured:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

The application remains usable without Supabase credentials during local UI development. Demo data is explicitly labelled.

## Architecture principles

1. The 3D campus is a navigation layer, not the only way to use the app.
2. Every campus destination has a conventional accessible route.
3. The reader supports responsive single-page mobile and spread desktop layouts.
4. 3D assets are lazy-loaded and have a 2D fallback.
5. No secrets are committed to the repository.
6. Features are developed and verified in small, reviewable phases.

## Status

Greenfield scaffold. Campus and reader implementation are being developed incrementally.
