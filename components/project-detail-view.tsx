/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Vue détaillée d'un projet — hero cinématique, stack, galerie, navigation (Client)
 * @created 2026-05-18
 * @updated 2026-05-18
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
// ──────────────────────────────────
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  ExternalLink,
  MessagesSquare,
  Target,
  Zap,
  CalendarDays,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/types/project";

interface ProjectDetailViewProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const, delay },
  }),
};

export function ProjectDetailView({
  project,
  prevProject,
  nextProject,
}: ProjectDetailViewProps) {
  const imageMode = project.imageMode || "cover";
  const whatsappUrl = `https://wa.me/2290196701733?text=${encodeURIComponent(
    `Bonjour Nexus Partners, je suis intéressé par un projet similaire à "${project.title}". Pouvez-vous me guider ?`
  )}`;

  return (
    <main className="relative min-h-screen pt-24 pb-24 px-4">
      {/* ── Fil d'Ariane ── */}
      <div className="mx-auto max-w-5xl mb-8">
        <Link
          href="/projets"
          className="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:text-primary"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Retour aux projets
        </Link>
      </div>

      {/* ── Hero du projet ── */}
      <section className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="space-y-6 mb-10"
        >
          {/* Catégorie */}
          <motion.div variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
              <Layers className="size-3" />
              {project.category}
            </span>
          </motion.div>

          {/* Titre */}
          <motion.h1
            variants={fadeUp}
            custom={0.05}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight"
          >
            {project.title}
          </motion.h1>

          {/* Meta : date + stack count */}
          <motion.div
            variants={fadeUp}
            custom={0.1}
            className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono"
          >
            {project.date && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4 text-accent" />
                {new Date(project.date).toLocaleDateString("fr-FR", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Layers className="size-4 text-accent" />
              {project.stack.length} technologies
            </span>
          </motion.div>

          {/* Description principale */}
          <motion.p
            variants={fadeUp}
            custom={0.15}
            className="max-w-3xl text-lg md:text-xl leading-relaxed text-muted-foreground"
          >
            {project.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            custom={0.2}
            className="flex flex-wrap gap-3 pt-2"
          >
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-primary/40"
            >
              <ExternalLink className="size-4" />
              Voir le site en live
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border/60 bg-card/60 px-5 py-2.5 text-sm font-bold text-foreground backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-primary/5"
            >
              <MessagesSquare className="size-4 text-green-500" />
              Projet similaire ?
            </a>
          </motion.div>
        </motion.div>

        {/* ── Image Hero (Cover) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
          className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 shadow-2xl shadow-black/20"
        >
          <Image
            src={project.largeImage}
            alt={`Preview du projet ${project.title}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className={cn(
              imageMode === "contain"
                ? "object-contain p-6 bg-muted"
                : "object-cover"
            )}
          />
          {/* Gradient overlay subtil */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </section>

      {/* ── Contenu principal ── */}
      <section className="mx-auto max-w-5xl mt-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* ── Colonne gauche : analyse projet ── */}
        <div className="space-y-8">
          {/* Stack technique */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm"
          >
            <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
              <Layers className="size-5 text-primary" />
              Stack Technique
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-primary/20 bg-primary/8 px-3 py-1.5 font-mono text-xs font-semibold text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Défi */}
          {project.problem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm"
            >
              <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2 text-amber-500">
                <Target className="size-5" />
                Le Défi
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                {project.problem}
              </p>
            </motion.div>
          )}

          {/* Solution */}
          {project.solution && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-accent/20 bg-accent/5 p-6"
            >
              <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2 text-accent">
                <Zap className="size-5" />
                Notre Solution
              </h2>
              <p className="text-base leading-relaxed text-foreground/85">
                {project.solution}
              </p>
            </motion.div>
          )}

          {/* Impact */}
          {project.impact && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-2xl border border-green-500/25 bg-green-500/8 p-6"
            >
              <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2 text-green-500">
                <BarChart3 className="size-5" />
                Résultat & Impact
              </h2>
              <p className="text-base leading-relaxed text-foreground/85 font-medium">
                {project.impact}
              </p>
            </motion.div>
          )}

          {/* Galerie (si plusieurs images) */}
          {project.gallery && project.gallery.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-lg font-bold mb-4 flex items-center gap-2">
                Galerie du projet
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-video overflow-hidden rounded-xl border border-border/50"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} — capture ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* ── Colonne droite : sidebar infos ── */}
        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          {/* Budget indicatif */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/12 to-primary/4 p-5"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
              Budget indicatif
            </p>
            <p className="font-heading text-2xl font-bold text-gradient-brand">
              {project.estimatedPrice}
            </p>
          </motion.div>

          {/* CTA Commander */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm"
          >
            <p className="text-sm font-medium mb-4 text-foreground/90">
              Vous souhaitez un projet similaire ?
            </p>
            <div className="space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-green-600/20 transition-all hover:-translate-y-0.5 hover:bg-green-500"
              >
                <MessagesSquare className="size-4" />
                Discuter sur WhatsApp
              </a>
              <a
                href="mailto:contact@nexus-partners.xyz"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-border/60 px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                Envoyer un email
              </a>
            </div>
          </motion.div>

          {/* Lien vers le site */}
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex cursor-pointer items-center justify-between rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-primary/4"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                Site en production
              </p>
              <p className="text-sm font-semibold text-foreground truncate max-w-[200px]">
                {project.projectUrl.replace(/^https?:\/\//, "")}
              </p>
            </div>
            <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
          </motion.a>
        </aside>
      </section>

      {/* ── Navigation Projet Suivant / Précédent ── */}
      <nav
        aria-label="Navigation entre projets"
        className="mx-auto max-w-5xl mt-20 pt-10 border-t border-border/50"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {prevProject ? (
            <Link
              href={`/projets/${prevProject.slug}`}
              className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm transition-all hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg"
            >
              <ChevronLeft className="size-5 text-muted-foreground shrink-0 transition-transform group-hover:-translate-x-1" />
              <div className="min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                  Projet précédent
                </p>
                <p className="font-heading text-sm font-bold truncate">
                  {prevProject.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projets/${nextProject.slug}`}
              className="group flex cursor-pointer items-center justify-end gap-4 rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm transition-all hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg sm:text-right"
            >
              <div className="min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                  Projet suivant
                </p>
                <p className="font-heading text-sm font-bold truncate">
                  {nextProject.title}
                </p>
              </div>
              <ChevronRight className="size-5 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <div />
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/projets"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border/60 px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Voir tous les projets
          </Link>
        </div>
      </nav>
    </main>
  );
}
