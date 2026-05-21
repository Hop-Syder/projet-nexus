/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Page catalogue complet des projets — grille filtrée avec animations
 * @created 2026-05-18
 * @updated 2026-05-18
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
// ──────────────────────────────────
import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/projects-grid";
import projectsData from "@/data/projects.json";
import type { Project } from "@/lib/types/project";

export const metadata: Metadata = {
  title: "Portfolio & Projets",
  description:
    "Découvrez l'ensemble des réalisations Nexus Partners : sites vitrine, e-commerce, plateformes IA et applications web premium conçus au Bénin et en Afrique.",
};

const projects = projectsData as Project[];

export default function ProjetsPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-24 px-4">
      <div className="mx-auto max-w-7xl">
        {/* ── Header Section ── */}
        <header className="mb-16 md:mb-20">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.35em] text-accent mb-4">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
            Nexus Partners — Catalogue
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent/90" />
          </p>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
            Portfolio &{" "}
            <span className="text-gradient-brand">Références</span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Chaque projet est une démonstration d&apos;expertise : stack
            moderne, design sur mesure et optimisation SEO. Des solutions web
            premium conçues pour performer en Afrique et à l&apos;international.
          </p>

          {/* Stats rapides */}
          <div className="mt-10 flex flex-wrap gap-6">
            {[
              { value: `${projects.length}`, label: "Projets réalisés" },
              {
                value: `${new Set(projects.flatMap((p) => p.stack)).size}+`,
                label: "Technologies maîtrisées",
              },
              {
                value: `${new Set(projects.map((p) => p.category)).size}`,
                label: "Secteurs d'activité",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm px-5 py-3"
              >
                <p className="font-heading text-2xl font-bold text-primary">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </header>

        {/* ── Grid avec filtres (Client Component) ── */}
        <ProjectsGrid projects={projects} />
      </div>
    </main>
  );
}
