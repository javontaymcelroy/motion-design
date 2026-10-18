import type React from "react";
import { safe } from "../theme";

// Review overlay. Rendered on top of a reel when `showGuides` is on, so stills
// show at a glance whether anything crosses into the platform UI zones.
export const SafeAreaGuides: React.FC = () => {
  const zone: React.CSSProperties = {
    position: "absolute",
    backgroundColor: "rgba(255, 40, 80, 0.22)",
  };

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <div style={{ ...zone, left: 0, right: 0, top: 0, height: safe.top }} />
      <div
        style={{ ...zone, left: 0, right: 0, bottom: 0, height: safe.bottom }}
      />
      <div
        style={{
          ...zone,
          left: 0,
          top: safe.top,
          bottom: safe.bottom,
          width: safe.left,
        }}
      />
      <div
        style={{
          ...zone,
          right: 0,
          top: safe.top,
          bottom: safe.bottom,
          width: safe.right,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: safe.top,
          bottom: safe.bottom,
          left: safe.left,
          right: safe.right,
          outline: "3px dashed rgba(255, 40, 80, 0.9)",
        }}
      />
    </div>
  );
};
