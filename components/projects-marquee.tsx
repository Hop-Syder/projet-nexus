/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Bandeau défilant des réalisations (preuve visuelle immédiate sous le hero)
 * @created 2026-07-02
 * @updated 2026-07-02
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
// ──────────────────────────────────
"use client";

import type { Project } from "@/lib/types/project";
import Image from "next/image";
import Link from "next/link";

export function ProjectsMarquee({
  projects,
  locale = "fr",
}: {
  projects: Project[];
  locale?: "fr" | "en";
}) {
  const items = [...projects, ...projects];

  return (
    <section
      aria-label={locale === "fr" ? "Aperçu des réalisations" : "Work preview"}
      className="relative mb-20 overflow-hidden md:mb-28"
    >
      <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {locale === "fr"
          ? "Ils nous ont fait confiance — projets en ligne"
          : "Trusted by clients — live projects"}
      </p>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-28" />

      <div className="flex w-max gap-5 animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none md:gap-6">
        {items.map((project, index) => (
          <Link
            key={`${project.id}-${index}`}
            href={`/projets/${project.slug}`}
            aria-hidden={index >= projects.length}
            tabIndex={index >= projects.length ? -1 : undefined}
            className="group relative block h-40 w-64 shrink-0 overflow-hidden rounded-xl border border-border/50 bg-muted/30 transition-colors hover:border-primary/40 md:h-48 md:w-80"
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 256px, 320px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute inset-x-4 bottom-3">
              <p className="font-heading text-sm font-semibold text-foreground drop-shadow-sm">
                {project.title}
              </p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                {project.category}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
