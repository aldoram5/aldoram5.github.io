# Copilot Instructions for aldoram5's Blog

## Project Overview

This is a statically generated React 19 blog deployed to GitHub Pages. React Router framework mode and Vite prerender every public route, including Markdown post slugs, so search engines and non-JavaScript clients receive complete HTML.

Core stack:

- React 19 and TypeScript
- React Router 7 framework mode
- Vite 8
- Tailwind CSS 3
- gray-matter and react-markdown
- GitHub Pages

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
```

Production output is `dist/client`.

## Architecture

- `react-router.config.ts`: static prerender paths and `404.html` generation
- `src/routes.ts`: route configuration
- `src/root.tsx`: document shell, metadata outlets, theme bootstrap, hydration
- `src/pages/`: visible route modules
- `src/routes/`: resource routes for sitemap, robots, RSS, llms.txt, and about.json
- `src/utils/posts.server.ts`: server-only Markdown discovery and validation
- `src/utils/posts.ts`: browser-safe formatting helpers
- `src/config/site.ts`: shared site, author, and canonical URL data
- `src/utils/seo.ts`: shared metadata and JSON-LD helpers
- `public/posts/content/`: unchanged source of truth for post bodies

Do not reintroduce `HashRouter`, runtime Markdown fetching, a browser `Buffer` polyfill, a manual post registry, or global-only metadata.

## Route Modules

Visible pages export a default React component and may export `loader` and `meta`. This is expected React Router framework behavior. Dynamic post data must be loaded through server-only utilities and returned by the route loader so it is available during prerendering.

Every indexable page needs:

- a unique title and description
- a canonical URL
- Open Graph and Twitter metadata
- appropriate JSON-LD
- semantic page landmarks and heading order

Use `pageMeta` for consistency. Post pages use `BlogPosting`; the home and profile surfaces connect the Blog, Person, and Crimson R Games identities.

## Adding Posts

Create a Markdown file in `public/posts/content/` named `YYYY-MM-DD-post-title.md`. Files are discovered automatically; no code registry is required.

Required frontmatter:

```yaml
---
title: "Post Title"
date: "2026-08-17"
slug: "post-title"
tags: ["development"]
description: "Search and sharing description."
---
```

`image` is optional. Invalid dates, invalid slugs, missing fields, and duplicate slugs fail the build. Do not alter existing post prose while changing the blog engine unless the task explicitly requests editorial work.

## Accessibility

- Preserve one clear `main` landmark and logical heading levels.
- Use real links for navigation and URL state; use buttons for actions.
- Name icon-only controls and mark decorative icons as hidden.
- Keep keyboard focus visible.
- Make horizontally scrollable code blocks keyboard focusable.
- Do not rely on color alone to identify prose links.
- Verify light and dark contrast after palette changes.
- Test mobile navigation and tag filters at narrow widths.

## Styling

Follow the existing Tailwind palette and responsive patterns. Keep both light and dark states. Avoid inline styles and hand-authored SVG icons; use the installed Lucide icons.

## Deployment and SEO

GitHub Pages deploys `dist/client` through `.github/workflows/deploy.yml`. React Router resource routes generate `sitemap.xml`, `robots.txt`, `rss.xml`, `llms.txt`, and `about.json` from shared data. Keep these derived from the Markdown and site configuration rather than maintaining duplicate lists.

Before finishing substantial changes, run typecheck, lint, build, inspect generated HTML for at least one post, and test the affected routes in a real browser.
