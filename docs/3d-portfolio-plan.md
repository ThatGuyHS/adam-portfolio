# 3D Portfolio — "The Village by the River" — Implementation Plan

An explorable 3D village at `/3d` where visitors walk around, meet characters, and learn about Adam's experience, projects, and services through conversations and world landmarks. The existing 2D site stays untouched; the 3D world is an additive experience.

---

## 1. Concept

A small, cozy low-poly village on the bank of a river at golden hour. Each part of Adam's story maps to a place or a person:

- **NPCs (villagers)** represent chapters of the career. Talk to them and they tell that part of the story through branching dialogue.
- **Buildings** hold themed content — a workshop full of projects, a tavern for the esports years, a bridge for the "bridging tech and gaming" narrative.
- **The river** is the timeline: the world subtly progresses from upstream (early esports days) to downstream (current frontend work), so walking the riverbank walks the career.

Visitors can either free-roam or follow a guided "tour path" of glowing stones for people who just want the story in order.

### Village layout (top-down sketch)

```
        upstream ◄──────── river flows ────────► downstream
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    [Tournament     [Old            ║bridge║      [Dev
     Tent 🏕]        Arcade 🕹]      ║      ║       Workshop 🔨]
                                                      [Town
      spawn ⭑ ── glowing tour path ──────────────►    Square ⛲]
    [Tavern 🍺]              [QA Lighthouse 🗼]     [Mailbox ✉]
   ~~~~~~~~~~~~~~~~~ fishing pier ~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

### Content mapping (from `constants/data.js`)

| World element | Content it carries |
|---|---|
| **The Tournament Tent** + "The Organizer" NPC | Tournament Administrator @ G-Loot — where the journey started |
| **QA Lighthouse** + "The Keeper" NPC | QA Tester / QA Developer @ G-Loot — the keeper who spots problems before they reach shore |
| **Dev Workshop** + "The Builder" NPC | Frontend Developer @ G-Loot, Frontend Engineer @ Zaver, System Tester @ Decerno — current craft: TypeScript, Next.js, React |
| **Tavern** + "The Bard" NPC | Esports community life: Phoenix Blue, Crimson Esports, Znipe, Svenska E-sportförbundet — told as tales and songs |
| **Town Square notice board** | Services — freelance offerings pinned as village job postings |
| **Market stalls along the river** | Projects (~21 from `data.js`) grouped into stalls: guide sites (Robotklipparguiden etc.), esports tools (Rivals League, Stryda), utilities (Cryptoskatt, Cookbook Generator, PromptBibliotek). Interacting shows a project card with screenshot + link to the live site / 2D project page |
| **Mailbox / carrier pigeon post** | Contact — opens the existing contact flow |
| **Bridge across the river** | The "about me" narrative beat: bridging technology and gaming. Crossing it triggers the story |
| **Signpost at spawn** | Controls help + "prefer the classic site?" link back to `/` |

---

## 2. Tech stack

| Choice | What | Why |
|---|---|---|
| Renderer | **three.js via `@react-three/fiber`** | Declarative React components fit the existing codebase; huge ecosystem |
| Helpers | **`@react-three/drei`** | Camera controls, `useGLTF`, `Html` overlays, `Sky`, instancing — avoids reinventing basics |
| Physics | **none** (custom kinematic movement + simple collider circles) | A stroll through a village doesn't need a physics engine; keeps bundle small. Escape hatch: `@react-three/rapier` if needed later |
| State | **`zustand`** | De-facto standard with r3f; drives dialogue/UI state outside the render loop |
| Assets | **CC0 low-poly packs** (KayKit, Kenney, Quaternius) + a few Blender-tweaked pieces, exported as Draco-compressed `.glb` | Free, cohesive stylized look, tiny files. All models under `public/3d/models/` |
| Animation | Baked GLTF clips (idle/wave/talk) via drei's `useAnimations` | NPC life without hand-coded animation |
| Page integration | `pages/3d.js` with `next/dynamic` `ssr: false` import of the whole scene | three.js can't SSR; keeps the 3D bundle out of every other page |
| Dialogue UI | Plain React + Tailwind overlaid on the canvas | Reuses site styling/dark-mode; DOM text is accessible and crisp |

New dependencies: `three`, `@react-three/fiber`, `@react-three/drei`, `zustand`. Note: repo currently pins `next: latest` — verify r3f version compatibility with the installed Next/React versions at implementation time.

---

## 3. Architecture

```
pages/3d.js                      # thin page: SEO meta, dynamic(ssr:false) scene, loading screen
components/3d/
  World.jsx                      # <Canvas>, lighting, sky, fog, Suspense boundaries
  Player.jsx                     # capsule/character, WASD + touch movement, camera follow
  Terrain.jsx                    # ground plane, river, banks, paths
  River.jsx                      # animated water shader/material
  Village.jsx                    # composes buildings/props from layout data
  NPC.jsx                        # generic villager: model, idle anim, name tag, proximity prompt
  Interactable.jsx               # shared "press E / tap to interact" behavior + outline highlight
  TourPath.jsx                   # glowing stones + optional auto-guided camera walk
  ui/
    DialogueBox.jsx              # typewriter text, branching choices, portrait
    ProjectCard.jsx              # project popup (image, description, links)
    HUD.jsx                      # controls hint, mute, "exit to classic site"
    LoadingScreen.jsx            # asset progress (drei useProgress)
    MobileControls.jsx           # virtual joystick + interact button
constants/
  worldData.js                   # village layout: positions of buildings/NPCs/stalls
  dialogues.js                   # dialogue trees, derived from/referencing constants/data.js
lib/3d/
  store.js                       # zustand: player pos, active dialogue, visited flags, settings
  collisions.js                  # circle/AABB colliders keeping player on the island
public/3d/                       # .glb models, baked textures, ambient audio
```

Key principles:

- **Single source of truth stays `constants/data.js`.** `dialogues.js` and stall/project mappings import from it, so adding a project to the 2D site automatically stocks the market stall.
- **World layout is data, not JSX.** `worldData.js` describes positions/types; `Village.jsx` renders from it — tweaking the village means editing coordinates, not components.
- **DOM for text, canvas for world.** All reading happens in HTML overlays: accessible, selectable, SEO-visible fallback content on the page itself.

---

## 4. Gameplay & interaction design

- **Movement:** WASD/arrows on desktop, virtual joystick on touch. Third-person follow camera with slight lag; camera collision kept simple (village is mostly open).
- **Interacting:** walking near an interactable shows a floating prompt ("Talk", "Look"); `E`/`Enter`/tap triggers it. Interactables get a soft outline glow when in range.
- **Dialogue:** classic RPG box at the bottom — portrait, name, typewriter text (skippable), 2–3 choice buttons for branching ("Tell me about G-Loot" / "What tech do you use?" / "Bye"). Content pulled from experience data with added personality.
- **Progress nudges:** talked-to NPCs get a checkmark over their head; a subtle "story: 4/8" counter encourages completing the village. After all NPCs are met, fireworks over the river + a final "hire me" prompt at the mailbox.
- **Guided tour:** signpost at spawn offers "Show me around" — the camera/player auto-walks the stone path stop-to-stop for low-effort visitors.
- **Ambience:** river loop, birds, faint tavern music near the tavern; muted by default with a visible unmute toggle (autoplay policies + politeness).

---

## 5. Performance & accessibility

- **Budget:** target 60fps on mid laptops, stable 30fps on mid phones; initial 3D payload < ~4 MB (Draco-compressed GLBs, instanced trees/rocks, baked lighting where possible, `dpr` clamped to `[1, 2]`).
- **Progressive loading:** terrain + player first, buildings/NPCs stream in via nested `Suspense`; loading screen shows real progress.
- **Quality tiers:** detect weak GPUs (`navigator.hardwareConcurrency`, `failIfMajorPerformanceCaveat`, or drei `PerformanceMonitor`) → drop shadows, lower water quality, reduce foliage.
- **No-WebGL / reduced-motion fallback:** `/3d` renders a styled 2D "village map" version of the same content (list of the NPC stories) if WebGL is unavailable or `prefers-reduced-motion` is set — nobody hits a blank page.
- **Accessibility:** all dialogue is real DOM text; interact prompts keyboard-reachable; full experience completable with keyboard only; option to disable camera sway.
- **SEO:** `/3d` gets proper meta + a `noscript`/fallback text block; added to sitemap script.

---

## 6. Implementation phases

### Phase 1 — Skeleton world (walkable proof)
1. Add deps; create `pages/3d.js` with dynamic no-SSR import + loading screen.
2. `World.jsx`: canvas, hemisphere/directional light, `Sky`, fog, ground plane, placeholder river (blue plane).
3. `Player.jsx`: capsule placeholder, WASD movement, follow camera, boundary colliders.
4. Deploy behind the URL (no nav link yet) to validate perf on real devices early.

**Exit criteria:** you can walk around an empty island by a river at 60fps, mobile joystick works.

### Phase 2 — The village
5. Pick and import the asset pack; establish the GLB pipeline (Draco, `useGLTF.preload`).
6. `worldData.js` + `Village.jsx`: place buildings, bridge, pier, market stalls, signpost, trees/rocks (instanced).
7. `River.jsx`: animated water material; riverbank blending.
8. Tune lighting/color grade for the golden-hour look.

**Exit criteria:** village reads as a cohesive place; payload within budget.

### Phase 3 — Characters & dialogue
9. `NPC.jsx` with idle animations, name tags, proximity detection.
10. Dialogue system: `dialogues.js` trees, `DialogueBox` UI, zustand-driven state, typewriter + branching.
11. Write dialogue content for all NPCs from `data.js` (the fun writing pass — each character gets a voice).
12. Visited-checkmarks + progress counter.

**Exit criteria:** every career chapter is tellable in-world through conversation.

### Phase 4 — Projects, services, contact
13. Market stalls → `ProjectCard` popups fed from `data.js` projects (grouped guide sites / esports / utilities).
14. Town square notice board → services; mailbox → contact link/modal; bridge story trigger.
15. Guided tour path + auto-walk.

**Exit criteria:** all 2D site content is reachable inside the world.

### Phase 5 — Polish & ship
16. Ambient audio + mute toggle; completion fireworks.
17. Quality tiers, no-WebGL/reduced-motion fallback page, final perf pass (draw calls, texture sizes, memory on iOS Safari).
18. SEO meta, sitemap entry, OG image (screenshot of the village).
19. Add "Enter the village 🏘" link in the navbar/hero of the 2D site.
20. Cross-device QA: Safari iOS, Android Chrome, Firefox, low-end laptop.

**Exit criteria:** linked from the main site, works or degrades gracefully everywhere.

---

## 7. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Mobile performance (biggest risk) | Test on real phones from Phase 1; quality tiers; hard asset budget |
| Asset style mismatch across packs | Commit to one primary pack (KayKit or Kenney) + unified color palette/toon material |
| Scope creep (it's a game — everything is tempting) | Phases 1–4 are the product; anything else (fishing minigame, day/night cycle, seasons) goes to a post-launch wishlist |
| `next: latest` / React 18 vs r3f version drift | Pin exact dependency versions when starting Phase 1 |
| Dialogue writing takes longer than code | Draft all dialogue in `dialogues.js` as plain text early in Phase 3, iterate separately from engine work |

## 8. Post-launch wishlist (explicitly not in scope)

Day/night cycle tied to visitor's local time · fishing minigame that reels in "fun facts" · seasonal decorations · a dog that follows the player · multiplayer ghosts of other visitors.
