import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ContainerBlock from "../components/ContainerBlock";
import VillageGuide from "@components/3d/VillageGuide";
import { SITE_URL as siteUrl } from "@constants/site";

// three.js can't render on the server, so the scene is loaded client-side only.
// The written version below is always in the markup, which means this page is
// still a real page to a crawler, a screen reader, or a browser without WebGL.
const VillageScene = dynamic(() => import("@components/3d/VillageScene"), {
  ssr: false,
});

const NO_WEBGL =
  "This browser doesn't support WebGL, so the walkable village can't run here. The whole of it is written out below.";
const REDUCED_MOTION =
  "You've asked your system for reduced motion, so the village won't start on its own.";

function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (!context) return false;
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch (error) {
    return false;
  }
}

export default function ThreeDVillage() {
  const [state, setState] = useState({
    checked: false,
    supported: false,
    reducedMotion: false,
  });
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const supported = detectWebGL();
    const reducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    setState({ checked: true, supported, reducedMotion });
    if (supported && !reducedMotion) setEntered(true);
  }, []);

  const enter = useCallback(() => setEntered(true), []);
  const exit = useCallback(() => setEntered(false), []);

  const reason = !state.checked
    ? null
    : !state.supported
    ? NO_WEBGL
    : state.reducedMotion
    ? REDUCED_MOTION
    : null;

  return (
    <>
      <ContainerBlock
        title="The Village by the River — Adam Peleback in 3D"
        description="Adam Peleback's portfolio as a walkable 3D village: five villagers by a river, each telling one chapter of a career that runs from esports tournament administration to frontend engineering."
        keywords="3d portfolio, interactive cv, three.js portfolio, react three fiber, adam peleback"
        image="/adam.png"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "The Village by the River",
          applicationCategory: "BrowserApplication",
          operatingSystem: "Any",
          url: `${siteUrl}/3d`,
          description:
            "An interactive 3D village where each villager tells a chapter of Adam Peleback's career.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      >
        <VillageGuide
          canEnter={!state.checked || state.supported}
          onEnter={enter}
          reason={reason}
        />
      </ContainerBlock>

      {entered && <VillageScene onExit={exit} />}
    </>
  );
}
