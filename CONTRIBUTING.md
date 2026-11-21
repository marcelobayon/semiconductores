# Contributing

- Work on feature branches; open small, reviewable PRs against `main`.
- `main` is protected: do not push directly; do not merge or deploy without Marcelo's approval.
- Before opening a PR: `npm run lint`, `npx tsc --noEmit`, `npm run build`.
- Never commit secrets. `.env.example` holds names/descriptions only.
- Never hard-code affiliate URLs in components — use `src/config/affiliates.ts` + the resolver.
- Never render fabricated stock, pricing, lead times, authorization, or supplier authenticity.
- Keep EN and ES dictionaries in sync; do not ship untranslated pages as complete.
