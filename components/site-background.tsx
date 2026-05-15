/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Arrière-plan premium avec gradients dynamiques et motifs de grille
 * @updated 2024-05-14
 */
export function SiteBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background transition-colors duration-700"
      aria-hidden
    >
      {/* Grille de fond subtile */}
      <div className="grid-pattern absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" />

      {/* Gradients de marque - Mode Clair */}
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute -left-[10%] top-0 h-[60vh] w-[40vw] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -right-[5%] top-[20%] h-[50vh] w-[30vw] rounded-full bg-accent/8 blur-[100px]" />
        <div className="absolute bottom-0 left-[20%] h-[40vh] w-[50vw] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Gradients de marque - Mode Sombre */}
      <div className="absolute inset-0 hidden dark:block">
        <div className="absolute -left-[15%] -top-[10%] h-[70vh] w-[50vw] rounded-full bg-primary/12 blur-[140px]" />
        <div className="absolute -right-[10%] top-[10%] h-[60vh] w-[40vw] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-0 left-[10%] h-[50vh] w-[60vw] rounded-full bg-primary/8 blur-[140px]" />
      </div>

      {/* Overlay de grain pour texture premium */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay" />
    </div>
  );
}
