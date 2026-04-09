/**
 * Arrière-plan de test : prototypes volontairement très visibles.
 */
export function SiteBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background transition-colors"
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-95 dark:hidden"
        style={{
          backgroundImage: 'url("/background-prototypes/slate-bone-yellow.svg")',
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      <div
        className="absolute inset-0 hidden opacity-78 dark:block"
        style={{
          backgroundImage: 'url("/background-prototypes/obsidian-cyan-gold.svg"), url("/background-prototypes/midnight-teal-copper.svg"), url("/background-prototypes/charcoal-indigo-lime.svg")',
          backgroundPosition: "right top, left bottom, right bottom",
          backgroundRepeat: "no-repeat, no-repeat, no-repeat",
          backgroundSize: "52vw auto, 48vw auto, 50vw auto",
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0.06),rgba(15,23,42,0.08))] dark:bg-[linear-gradient(180deg,rgba(11,16,32,0.14),rgba(11,16,32,0.26))]" />
    </div>
  );
}
