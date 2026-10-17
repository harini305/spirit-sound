# The Spirit Sound Gallery — website

**Live:** https://spirit-sound.vercel.app (Vercel, production) · **Repo:** https://github.com/harini305/spirit-sound

Next.js 16 (App Router, JavaScript) · React 19 · GSAP + ScrollTrigger · CSS Modules. Frontend only — no backend.
Pushes to `main` deploy to production automatically (Vercel ↔ GitHub integration).

```
npm install
npm run dev                        # development
npm run build && npm run start     # production preview (add `-- -p 3008` for a port)
```

- Content and verified business facts: `src/content/site.js`
- Optional environment variables: see `.env.example` (contact form endpoint, Google Analytics) — set them in Vercel → Project → Settings → Environment Variables, then redeploy
- Media pipeline: `npm run media:images` · `FFMPEG_PATH=/path/to/ffmpeg npm run media:video`
  (originals live in `docs/source-audit/assets/original/`; the 53 MB 4K master video is kept outside the repo — place it at `docs/source-audit/assets/original/video/Singing-Bowl.mp4` before re-running the video script)
- Docs: [`docs/phase-2-implementation-plan.md`](docs/phase-2-implementation-plan.md), [`docs/phase-2-qa-report.md`](docs/phase-2-qa-report.md), Phase 1 audit in [`docs/source-audit/`](docs/source-audit/README.md). QA screenshots are kept locally, not in the repo.
- Only the build inputs are uploaded to Vercel (`.vercelignore` excludes `docs/` and `scripts/`).
