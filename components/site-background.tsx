/**
 * Arrière-plan Nexus Partners : spotlight froid, grille technique et grain léger.
 */
export function SiteBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-x-[15%] -top-32 h-[420px] rounded-full bg-blue-500/16 blur-[120px] dark:bg-blue-400/18" />
      <div className="absolute right-[-10%] top-[18%] h-[320px] w-[320px] rounded-full bg-sky-400/12 blur-[110px] dark:bg-sky-300/14" />
      <div className="absolute bottom-[-8%] left-[-8%] h-[300px] w-[300px] rounded-full bg-blue-700/10 blur-[100px] dark:bg-blue-500/14" />
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-blue-500/12 to-transparent" />



      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.22]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(37 99 235 / 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(37 99 235 / 0.07) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 100%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.45] dark:opacity-[0.3]"
        style={{
          background:
            "radial-gradient(circle at top, rgb(37 99 235 / 0.08), transparent 34%), linear-gradient(180deg, transparent 0%, rgb(15 23 42 / 0.04) 100%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.4] mix-blend-overlay dark:opacity-[0.28]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_-10%,transparent_38%,var(--background)_85%)]" />
    </div>
  );
}
