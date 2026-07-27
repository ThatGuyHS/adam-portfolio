const TIPS = [
  "The river runs with the timeline — upstream is 2017, downstream is today.",
  "Five villagers each tell one chapter. Talk to all of them to hear the whole story.",
  "Walk with W A S D, drag to look around, press E to talk.",
  "The signpost by the campfire will show you around if you'd rather be led.",
];

export default function LoadingScreen({ tipIndex = 0 }) {
  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffd9a0] via-[#e6a86e] to-[#3f6470]" />
      <div className="relative flex flex-col items-center px-6">
        <p className="text-4xl">🏘</p>
        <h1 className="mt-3 font-serif text-2xl text-[#2a1c12] sm:text-3xl">
          Building the village…
        </h1>
        <div className="mt-5 h-1 w-48 overflow-hidden rounded-full bg-[#2a1c12]/20">
          <div className="village-loading-bar h-full w-1/3 rounded-full bg-[#2a1c12]/60" />
        </div>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#2a1c12]/75">
          {TIPS[tipIndex % TIPS.length]}
        </p>
      </div>
    </div>
  );
}
