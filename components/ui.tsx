import { Reveal } from "./Reveal";

/** Eyebrow + heading + optional one-line sub. Same typography in every section. */
export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignCls}`}>
      {eyebrow && (
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2 className={`h-section ${eyebrow ? "mt-4" : ""}`}>{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-text-secondary leading-relaxed">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

type TagKind = "illustrative" | "developed" | "inDevelopment" | "planned";

const TAG_STYLE: Record<TagKind, string> = {
  illustrative: "border-border-strong text-text-muted bg-white/[0.03]",
  developed: "border-emerald-400/40 text-emerald-300 bg-emerald-400/10",
  inDevelopment: "border-blue/40 text-cyan bg-blue/10",
  planned: "border-border-strong text-text-secondary bg-white/[0.03]",
};

/** Small status label used for development status and for "illustrative" notes. */
export function Tag({ kind, children }: { kind: TagKind; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] uppercase whitespace-nowrap ${TAG_STYLE[kind]}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" aria-hidden="true" />
      {children}
    </span>
  );
}
