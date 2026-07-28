import { Html } from "@react-three/drei";
import { LANDMARKS, NPCS, STALLS } from "@constants/worldData";
import { terrainHeight } from "@lib/3d/terrain";
import { useVillage } from "@lib/3d/store";
import {
  Cottage,
  Lighthouse,
  Tavern,
  TournamentTent,
  Workshop,
} from "@components/3d/buildings";
import {
  Bridge,
  Campfire,
  FishingPier,
  Fountain,
  GroundPatch,
  Mailbox,
  NoticeBoard,
  Signpost,
  Stall,
  Well,
} from "@components/3d/props";
import NPC from "@components/3d/NPC";
import Fireworks from "@components/3d/Fireworks";
import Scatter from "@components/3d/Scatter";
import TourPath from "@components/3d/TourPath";
import Terrain from "@components/3d/Terrain";
import River from "@components/3d/River";
import Boat from "@components/3d/Boat";
import { ProximitySensor, SelectionRing } from "@components/3d/Interactions";

const LANDMARK_COMPONENTS = {
  tent: TournamentTent,
  tavern: Tavern,
  lighthouse: Lighthouse,
  workshop: Workshop,
  cottage: Cottage,
  well: Well,
  fountain: Fountain,
  noticeboard: NoticeBoard,
  mailbox: Mailbox,
  signpost: Signpost,
};

const NEEDS_PATCH = new Set(["tent", "tavern", "workshop", "cottage", "lighthouse"]);

export default function Village({ quality }) {
  const visited = useVillage((state) => state.visited);
  const celebrated = useVillage((state) => state.celebrated);

  return (
    <group>
      <Terrain />
      <River />
      <Boat />
      <Bridge />
      <FishingPier />
      <Scatter quality={quality} />
      <TourPath />

      {LANDMARKS.map((landmark) => {
        const Component = LANDMARK_COMPONENTS[landmark.kind];
        if (!Component) return null;
        const [x, z] = landmark.position;
        return (
          <group key={landmark.id}>
            {NEEDS_PATCH.has(landmark.kind) && (
              <GroundPatch radius={landmark.radius * 0.95} position={[x, 0, z]} />
            )}
            <group position={[x, terrainHeight(x, z), z]} rotation={[0, landmark.rotation, 0]}>
              <Component roof={landmark.roof} />
            </group>
          </group>
        );
      })}

      {STALLS.map((stall, index) => {
        const [x, z] = stall.position;
        return (
          <group key={stall.id} position={[x, terrainHeight(x, z), z]} rotation={[0, Math.PI, 0]}>
            <Stall index={index} />
            <Html
              position={[0, 3.3, 0]}
              center
              distanceFactor={16}
              zIndexRange={[20, 0]}
              style={{ pointerEvents: "none", userSelect: "none" }}
            >
              <div className="village-tag village-tag--stall">
                <span className="village-tag__name">{stall.sign}</span>
                <span className="village-tag__title">
                  {stall.projects.length} project
                  {stall.projects.length === 1 ? "" : "s"}
                </span>
              </div>
            </Html>
          </group>
        );
      })}

      {NPCS.map((npc) => (
        <NPC key={npc.id} npc={npc} visited={Boolean(visited[npc.id])} />
      ))}

      <Campfire position={[-46.5, terrainHeight(-46.5, -15.5), -15.5]} />
      <Fireworks active={celebrated} />

      <ProximitySensor />
      <SelectionRing />
    </group>
  );
}
