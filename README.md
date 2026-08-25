# adampeleback.com

Personal portfolio of **Adam Peleback** — frontend developer and esports organizer in Stockholm.

Live at [www.adampeleback.com](https://www.adampeleback.com).

## What's on it

- **/** — intro, favourite projects, tech stack
- **/projects** — all projects, each with a detail page under `/project/[slug]`
- **/experience** — work history timeline
- **/services** & **/seo-konsult** — freelance offerings (the latter in Swedish)
- **/3d** — *The Village by the River*: the portfolio as a walkable 3D village built with react-three-fiber, with a keyboard/touch-controlled player, NPCs that narrate career chapters, a boat, a mail plane, and fireworks. Server-rendered fallback content is provided for crawlers and devices without WebGL.

## Stack

- [Next.js](https://nextjs.org) (Pages Router) + React 18
- [Tailwind CSS](https://tailwindcss.com)
- [three.js](https://threejs.org) via [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) and [drei](https://github.com/pmndrs/drei), with [zustand](https://github.com/pmndrs/zustand) for UI state — all code-split so 3D only loads on `/3d`
- [next-themes](https://github.com/pacocoursey/next-themes) for dark mode

Site copy and project data live in `constants/`; the 3D world's data in `constants/worldData.js` and `constants/dialogues.js`.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # regenerates public/sitemap.xml (scripts/generate-sitemap.js), then next build
```

Deployed on [Vercel](https://vercel.com); pushes to `main` go to production.
