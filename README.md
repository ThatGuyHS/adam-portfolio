# adampeleback.com

Personal portfolio of **Adam Peleback**, web developer and software tester in Stockholm.

Live at [www.adampeleback.com](https://www.adampeleback.com).

## What's on it

- **/** — hero, favourite projects, the three freelance offers, contact band
- **/projects** — all projects grouped as client work, products, own sites and employers; each has a page under `/project/[slug]`
- **/about**, **/experience**, **/services**, **/contact**
- **/webbkonsult**, **/testkonsult** (Swedish) and **/discord-bots** — landing pages for the freelance offers
- **/3d** — *The Village by the River*: the portfolio as a walkable 3D village built with react-three-fiber, with NPCs that narrate career chapters. A written version is always in the markup for crawlers, screen readers and devices without WebGL.

## Stack

- [Next.js](https://nextjs.org) 16 (Pages Router, Turbopack) + React 19, versions pinned exactly
- [Tailwind CSS](https://tailwindcss.com) 3, Inter self-hosted through `next/font/local`
- [three.js](https://threejs.org) via [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) 9 and [drei](https://github.com/pmndrs/drei) 10, with [zustand](https://github.com/pmndrs/zustand) for UI state; all code-split so 3D only loads on `/3d`
- [next-themes](https://github.com/pacocoursey/next-themes) for dark mode, [rough-notation](https://roughnotation.com) for the hero highlights

## Where things live

| What | File |
|---|---|
| Name, email, social links | `constants/profile.js` (kept small so every page can import it) |
| Projects, about text, experience | `constants/data.js` (`group` sorts /projects, `featured` picks the home page six) |
| Case studies (the only indexed project pages) | `constants/caseStudies.js` |
| Services | `constants/services.js` |
| 3D world and dialogue | `constants/worldData.js`, `constants/dialogues.js` |
| Project screenshots | `public/projects/<name>.jpg` (1440×900, JPEG, also used as og:image) |
| CV | `public/Adam_Peleback_CV.pdf`, rendered from `docs/cv-source.html` |

Copy rules: only claims the code or a live page can back up, and no Search Console figures on the site.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # regenerates public/sitemap.xml (scripts/generate-sitemap.js), then next build
```

The local npm config only installs package versions at least seven days old (`min-release-age`), so pick the newest release that passes when upgrading.

Deployed on [Vercel](https://vercel.com); pushes to `main` go to production.

To roll back the October 2026 redesign, revert `5f4d431` and `5f07ee9` together: the earlier one carries file deletions the later one depends on, so it doesn't build on its own.
