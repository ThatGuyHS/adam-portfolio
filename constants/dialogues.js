// Dialogue trees for the villagers.
//
// The prose is flavour; the facts are not. Every villager's `roles` list is
// looked up out of constants/data.js, so job titles, companies and dates shown
// in the dialogue box are the same ones the 2D site renders. Update data.js and
// the village updates with it.

import userData from "@constants/data";

const role = (title, company) =>
  userData.experience.find((e) => e.title === title && e.company === company);

const roles = (...pairs) => pairs.map(([t, c]) => role(t, c)).filter(Boolean);

const bye = { label: "I'll keep walking.", to: null };

export const DIALOGUES = {
  organizer: {
    name: "Rune",
    title: "The Organizer",
    emoji: "🏕",
    accent: "#c2553f",
    place: "The Tournament Tent",
    roles: roles(
      ["Tournament Administrator", "G-Loot"],
      ["QA Tester", "G-Loot Esports"]
    ),
    start: "greet",
    nodes: {
      greet: {
        text: [
          "Ah — a traveller. You've come in at the top of the river, which is the right place to start.",
          "This tent is where Adam's road began, back in 2017. Brackets pinned to the canvas, a laptop balanced on a crate, and several hundred PUBG players who all wanted to know why their match hadn't started yet.",
        ],
        choices: [
          { label: "What was the job, exactly?", to: "job" },
          { label: "Sounds stressful.", to: "stress" },
          { label: "What did he take from it?", to: "lesson" },
          bye,
        ],
      },
      job: {
        text: [
          "Tournament Administrator for the Global Loot League. He ran the PUBG tournaments — seeding, scheduling, disputes, the lot.",
          "When a hundred squads queue at once and the platform hiccups, somebody has to be the calm voice in the announcement channel. That was him, most weekends, for a year.",
        ],
        choices: [
          { label: "And after that?", to: "after" },
          { label: "What did he take from it?", to: "lesson" },
          bye,
        ],
      },
      stress: {
        text: [
          "Oh, thoroughly. But it's a useful kind of stress — the kind where you find out what a product is really like.",
          "You learn more about software in one bad tournament night than in a month of everything working.",
        ],
        choices: [
          { label: "What was the job, exactly?", to: "job" },
          { label: "What did he take from it?", to: "lesson" },
          bye,
        ],
      },
      lesson: {
        text: [
          "That a product is judged at its worst moment, not its best. Nobody remembers the ninety-nine matches that started on time.",
          "He's built everything since with that in mind. It's also why he walked straight from this tent into testing — go and see Alv at the lighthouse, downstream. Alv will tell it better than I will.",
        ],
        choices: [
          { label: "And after that?", to: "after" },
          bye,
        ],
      },
      after: {
        text: [
          "He stayed with G-Loot and moved into QA, then into the code itself. The river carries on that way — follow it east.",
          "Vira's at the tavern if you want the other half of the story: everything he did in esports that wasn't a job title.",
        ],
        choices: [bye],
      },
    },
  },

  bard: {
    name: "Vira",
    title: "The Bard",
    emoji: "🎻",
    accent: "#7a4a9e",
    place: "The Tavern",
    roles: roles(
      ["Esports Copywriter", "Znipe Esports"],
      ["Director of Social Media and Written Content", "Crimson Esports"],
      ["General Member Board", "Phoenix Blue"],
      ["Freelance Web Developer", "Svenska E-sportförbundet"]
    ),
    start: "greet",
    nodes: {
      greet: {
        text: [
          "Sit, sit. Everyone else in this village will tell you what Adam was paid to do. I'll tell you what he did anyway.",
          "Words first, mostly. Event pages, recaps, news, match summaries — the writing that turns a scoreboard into a story somebody wants to read.",
        ],
        choices: [
          { label: "Tell me about the writing.", to: "writing" },
          { label: "Who's Phoenix Blue?", to: "phoenix" },
          { label: "What about the association?", to: "sesf" },
          bye,
        ],
      },
      writing: {
        text: [
          "Znipe Esports, from 2017. Copywriting — event pages, summaries, news articles, recaps. Then Crimson Esports, where he ran all of social and content, and wrote the sponsorship proposals besides.",
          "That last part matters more than it sounds. If you can explain a scene to somebody outside it well enough that they'll fund it, you can explain anything to anyone.",
        ],
        choices: [
          { label: "Who's Phoenix Blue?", to: "phoenix" },
          { label: "Does he still write?", to: "still" },
          bye,
        ],
      },
      phoenix: {
        text: [
          "A non-profit, and he's been on its board since 2017 — the longest-running thing on his whole record.",
          "He helped grow it, and helped create the Phoenix Blue Event Series. Broadcasts, events, the unglamorous scaffolding a community stands on.",
        ],
        choices: [
          { label: "What about the association?", to: "sesf" },
          { label: "Does he still write?", to: "still" },
          bye,
        ],
      },
      sesf: {
        text: [
          "The Swedish Esports Association. He built their first site — and a custom CMS to go with it, so the people running it could actually update the thing without calling a developer.",
          "He came back to them again later as a freelancer. That's usually a good sign about how the first job went.",
        ],
        choices: [
          { label: "Who's Phoenix Blue?", to: "phoenix" },
          bye,
        ],
      },
      still: {
        text: [
          "He does. It's why the guide sites down at the market read like someone's talking to you rather than at you.",
          "A developer who can write is a rarer bird than you'd think. Go on — the stalls are down by the water.",
        ],
        choices: [bye],
      },
    },
  },

  keeper: {
    name: "Alv",
    title: "The Keeper",
    emoji: "🗼",
    accent: "#2f6f7a",
    place: "The QA Lighthouse",
    roles: roles(
      ["QA Tester", "G-Loot Esports"],
      ["QA Developer", "G-Loot"],
      ["System Tester", "Decerno AB"]
    ),
    start: "greet",
    nodes: {
      greet: {
        text: [
          "Mind the step. Wet stone.",
          "A lighthouse isn't there to be admired. It's there so nothing hits the rocks. That's the whole job, and it was Adam's for four years.",
        ],
        choices: [
          { label: "What did testing look like?", to: "work" },
          { label: "Why leave QA for development?", to: "why" },
          { label: "Is he still testing?", to: "now" },
          bye,
        ],
      },
      work: {
        text: [
          "Manual testing of the flows that actually matter — the ones where a bug costs somebody a match or a payout. Then automation, so the boring half stopped needing a human.",
          "And a lot of sitting with development teams, advising on how to test the thing before it was built. That's the part most testers never get to.",
        ],
        choices: [
          { label: "Why leave QA for development?", to: "why" },
          { label: "Is he still testing?", to: "now" },
          bye,
        ],
      },
      why: {
        text: [
          "He didn't, really. He crossed the room.",
          "When you've spent years finding out how software breaks, you write it differently. Sten at the workshop builds like someone who's been on this side of the glass — and that's not a coincidence, it's the whole reason.",
        ],
        choices: [
          { label: "Is he still testing?", to: "now" },
          bye,
        ],
      },
      now: {
        text: [
          "Very much. Since September 2025 he's been a System Tester at Decerno — system and software testing, full time.",
          "The light never really goes out. It just gets pointed at something new.",
        ],
        choices: [bye],
      },
    },
  },

  builder: {
    name: "Sten",
    title: "The Builder",
    emoji: "🔨",
    accent: "#3d6b9e",
    place: "The Dev Workshop",
    roles: roles(
      ["Frontend Developer", "G-Loot"],
      ["Frontend Engineer", "Zaver"],
      ["Freelance Web Developer", "Self-employed"]
    ),
    start: "greet",
    nodes: {
      greet: {
        text: [
          "Careful, there's sawdust everywhere. Or the digital equivalent — I've never worked out what that is.",
          "This is the workshop. Everything in the market row down by the river was made in here.",
        ],
        choices: [
          { label: "What does he build with?", to: "stack" },
          { label: "Tell me about the freelance year.", to: "freelance" },
          { label: "What about Zaver?", to: "zaver" },
          bye,
        ],
      },
      stack: {
        text: [
          "TypeScript, Next.js, React — that's the bench he works at every day, and has since October 2022 at G-Loot.",
          "He's picked up Angular and Nest.js on the way, but he doesn't collect tools for the sake of it. A workshop full of things you've used once isn't a workshop, it's an attic.",
        ],
        choices: [
          { label: "Tell me about the freelance year.", to: "freelance" },
          { label: "What about Zaver?", to: "zaver" },
          bye,
        ],
      },
      freelance: {
        text: [
          "A full year on his own, April 2024 to April 2025. Internal tools built in Nest.js for Clutch Group. The PXB Media brand site in Next.js. The first version of the Swedish Esports Association site, custom CMS and all.",
          "Working alone teaches you scope. There's nobody else to hand the hard half to.",
        ],
        choices: [
          { label: "What does he build with?", to: "stack" },
          { label: "What about Zaver?", to: "zaver" },
          bye,
        ],
      },
      zaver: {
        text: [
          "A short stretch in fintech, early 2024 — TypeScript and Angular.",
          "Short doesn't mean small. Payments code is unforgiving in a way games code isn't, and it's good for a developer to spend time somewhere the stakes are money.",
        ],
        choices: [
          { label: "Tell me about the freelance year.", to: "freelance" },
          bye,
        ],
      },
    },
  },

  cartographer: {
    name: "Nima",
    title: "The Cartographer",
    emoji: "🧭",
    accent: "#4d7c52",
    place: "The Town Square",
    roles: roles(["System Tester", "Decerno AB"]),
    start: "greet",
    nodes: {
      greet: {
        text: [
          "You came over the bridge. Good — that's the part most visitors miss the meaning of.",
          "Upstream is gaming. This side is software. Adam is one of the few people who genuinely lives on both banks, and the bridge is the point of the whole village.",
        ],
        choices: [
          { label: "Why does that matter?", to: "bridge" },
          { label: "What's he working on now?", to: "current" },
          { label: "Can I hire him?", to: "hire" },
          bye,
        ],
      },
      bridge: {
        text: [
          "Because plenty of developers can build an esports product, and plenty of esports people can describe one. Very few have run the tournament, tested the platform, written the copy and then shipped the feature.",
          "He's not a developer who likes games. He's someone who came up through the scene and learned to build.",
        ],
        choices: [
          { label: "What's he working on now?", to: "current" },
          { label: "Can I hire him?", to: "hire" },
          bye,
        ],
      },
      current: {
        text: [
          `System testing at Decerno by day, and ${userData.about.currentProject} on the side.`,
          "Plus the guide sites, which are a slow-burning experiment in whether careful content still wins. So far: yes.",
        ],
        choices: [
          { label: "Can I hire him?", to: "hire" },
          { label: "Why does the bridge matter?", to: "bridge" },
          bye,
        ],
      },
      hire: {
        text: [
          "The notice board east of here lists what he takes on — web builds, test automation, Discord bots, tournament operations.",
          "And the post box past it will get a letter to him directly. He does read them.",
        ],
        choices: [
          { label: "Thanks. I'll take a look.", to: null },
        ],
      },
    },
  },
};

/** Shown once, the first time you reach the middle of the bridge. */
export const BRIDGE_STORY = {
  title: "The bridge",
  body: userData.about.description[0],
};

export const NPC_COUNT = Object.keys(DIALOGUES).length;
