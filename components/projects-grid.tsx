/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Grille de projets filtrée avec animations au scroll (Client Component)
 * @created 2026-05-18
 * @updated 2026-05-18
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
// ──────────────────────────────────
"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ExternalLink, Layers, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types/project";

interface ProjectsGridProps {
  projects: Project[];
}

// Toutes les catégories uniques
const ALL_LABEL = "Tous";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] as const },
  },
};

// Carte projet pour la page grille
function ProjectGridCard({ project }: { project: Project }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const imageMode = project.imageMode || "cover";

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      animate={isInView ? "show" : "hidden"}
      initial="hidden"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/8"
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className={cn(
            "transition-transform duration-700 ease-out group-hover:scale-105",
            imageMode === "contain"
              ? "object-contain p-4"
              : "object-cover"
          )}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Badge catégorie */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-background/85 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-foreground shadow-sm backdrop-blur-md">
            <Tag className="size-2.5 text-accent" />
            {project.category}
          </span>
        </div>

        {/* Prix */}
        <div className="absolute top-3 right-3 z-10">
          <span className="rounded-lg border border-primary/20 bg-background/85 px-2.5 py-1 font-mono text-[10px] font-bold text-primary backdrop-blur-md shadow-sm">
            {project.estimatedPrice}
          </span>
        </div>

        {/* Lien vers détail - survol */}
        <Link
          href={`/projets/${project.slug}`}
          className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="flex items-center gap-2 rounded-xl border border-white/20 bg-background/90 px-4 py-2.5 text-sm font-semibold text-foreground shadow-xl backdrop-blur-md transition-all hover:bg-primary hover:text-primary-foreground">
            Voir le projet
            <ArrowUpRight className="size-4" />
          </span>
        </Link>
      </div>

      {/* Contenu texte */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <h2 className="font-heading text-xl font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
            {project.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        {/* Stack badges */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border/40 bg-muted/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="rounded-md border border-border/40 bg-muted/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        {/* Footer liens */}
        <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4">
          <Link
            href={`/projets/${project.slug}`}
            className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2"
          >
            Étude de cas
            <ArrowUpRight className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
          >
            <ExternalLink className="size-3.5" />
            Voir le site
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const categories = useMemo(() => {
    const cats = [ALL_LABEL, ...Array.from(new Set(projects.map((p) => p.category)))];
    return cats;
  }, [projects]);

  const [activeCategory, setActiveCategory] = useState<string>(ALL_LABEL);

  const filteredProjects = useMemo(() => {
    if (activeCategory === ALL_LABEL) return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <div>
      {/* ── Filtres catégories ── */}
      <div className="mb-10 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mr-2">
          <Layers className="size-3.5" />
          Filtrer
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider transition-all duration-200",
              activeCategory === cat
                ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "border-border/60 bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">
          {filteredProjects.length} projet{filteredProjects.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Grille de cartes ── */}
      <motion.div
        key={activeCategory}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredProjects.map((project) => (
          <ProjectGridCard key={project.id} project={project} />
        ))}
      </motion.div>

      {/* ── CTA bas de page ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-20 text-center"
      >
        <div className="mx-auto max-w-xl rounded-2xl border border-border/60 bg-card/60 p-8 backdrop-blur-xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent mb-3">
            Votre projet
          </p>
          <h3 className="font-heading text-2xl font-bold mb-3">
            Vous avez un projet similaire ?
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Décrivez votre vision, nous vous préparerons une proposition stratégique sous 48h.
          </p>
          <a
            href="mailto:contact@nexus-partners.xyz"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-primary/40"
          >
            Lancer mon projet
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
