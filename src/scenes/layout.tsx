import type React from "react";
import { safe } from "../theme";

// Content column inside the safe area. Scenes put everything the viewer must
// read inside this.
export const SafeColumn: React.FC<{
  readonly children: React.ReactNode;
  readonly justify?: React.CSSProperties["justifyContent"];
  readonly align?: React.CSSProperties["alignItems"];
  readonly gap?: number;
}> = ({ children, justify = "center", align = "flex-start", gap = 48 }) => (
  <div
    style={{
      position: "absolute",
      top: safe.top,
      bottom: safe.bottom,
      left: safe.left,
      right: safe.right,
      display: "flex",
      flexDirection: "column",
      justifyContent: justify,
      alignItems: align,
      gap,
    }}
  >
    {children}
  </div>
);
