export type ModeKey = "historic" | "live" | "simulation";

/**
 * One colour per operating mode, reused everywhere (hero cards, mode cards, mockups).
 * Class names are written out in full so Tailwind can detect them.
 */
export const MODE_STYLE: Record<
  ModeKey,
  { hex: string; text: string; border: string; bg: string; dot: string; glow: string }
> = {
  historic: {
    hex: "#f59e0b",
    text: "text-historic",
    border: "border-historic/35",
    bg: "bg-historic/10",
    dot: "bg-historic",
    glow: "0 0 60px rgba(245,158,11,0.18)",
  },
  live: {
    hex: "#22d3ee",
    text: "text-live",
    border: "border-live/35",
    bg: "bg-live/10",
    dot: "bg-live",
    glow: "0 0 60px rgba(34,211,238,0.2)",
  },
  simulation: {
    hex: "#a855f7",
    text: "text-sim",
    border: "border-sim/35",
    bg: "bg-sim/10",
    dot: "bg-sim",
    glow: "0 0 60px rgba(168,85,247,0.2)",
  },
};

export const MODE_ORDER: ModeKey[] = ["historic", "live", "simulation"];
