# The Spirit Sound Gallery — website (Phase 2 frontend)

Next.js 16 (App Router, JavaScript) · React 19 · GSAP + ScrollTrigger · CSS Modules. Frontend only — no backend.

```
npm install
npm run dev            # development
npm run build && npm run start   # production preview (add `-- -p 3008` for a port)
```

- Content and verified business facts: `src/content/site.js`
- Media pipeline (originals stay in `docs/source-audit/assets/original/`):
  `npm run media:images` · `FFMPEG_PATH=/path/to/ffmpeg npm run media:video`
- Optional environment variables: see `.env.example` (contact form endpoint, Google Analytics)
- Docs: [`docs/phase-2-implementation-plan.md`](docs/phase-2-implementation-plan.md), [`docs/phase-2-qa-report.md`](docs/phase-2-qa-report.md), Phase 1 audit in [`docs/source-audit/`](docs/source-audit/README.md)

Not deployed. Publishing requires explicit approval.
