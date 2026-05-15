/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Composant d'affichage des projets avec détails et commande WhatsApp
 */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Project } from "@/lib/types/project";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  ExternalLink,
  MessagesSquare,
  ShoppingCart,
  Target,
  Zap,
  BarChart3,
  Globe,
} from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { MouseEvent } from "react";

const whatsappNumber = "2290196701733";

export function ProjectCard({
  project,
  featured = false,
  locale = "fr",
}: {
  project: Project;
  featured?: boolean;
  locale?: "fr" | "en";
}) {
  const copy =
    locale === "fr"
      ? {
        positioning: "Positionnement",
        featuredPositioning: "Direction artistique & Stratégie",
        defaultPositioning: "Expertise ciblée",
        open: "Ouvrir",
        detail: "Voir l’étude de cas",
        order: "Commander",
        stack: "Stack",
        pricing: "Budget indicatif",
        openSite: "Ouvrir le site",
        whatsappMessage: `Bonjour Nexus Partners, je souhaite commander le projet "${project.title}". Pouvez-vous me guider sur la suite ?`,
        close: "Fermer",
        problem: "Le Défi",
        solution: "Notre Solution",
        impact: "Résultat & Impact",
      }
      : {
        positioning: "Positioning",
        featuredPositioning: "Art Direction & Strategy",
        defaultPositioning: "Targeted Expertise",
        open: "Open",
        detail: "View case study",
        order: "Order",
        stack: "Stack",
        pricing: "Indicative budget",
        openSite: "Open website",
        whatsappMessage: `Hello Nexus Partners, I would like to order the "${project.title}" project. Could you guide me on the next steps?`,
        close: "Close",
        problem: "The Challenge",
        solution: "Our Solution",
        impact: "Result & Impact",
      };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(copy.whatsappMessage)}`;
  const imageMode = project.imageMode || "cover";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    
    mouseX.set(x);
    mouseY.set(y);

    const xPct = x / width - 0.5;
    const yPct = y / height - 0.5;
    
    rotateX.set(yPct * -10);
    rotateY.set(xPct * 10);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const rotateXSpring = useSpring(0, { stiffness: 150, damping: 20 });
  const rotateYSpring = useSpring(0, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(rotateXSpring, (v) => v);
  const rotateY = useTransform(rotateYSpring, (v) => v);

  return (
    <Dialog>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ y: -12 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className={cn(
          "group/shell relative h-full rounded-xl p-[1px] perspective-[1000px]",
          "bg-gradient-to-b from-border/50 via-border/20 to-border/50",
          "hover:from-primary/30 hover:via-primary/10 hover:to-primary/30",
          "transition-all duration-500",
          featured && "ring-1 ring-primary/20 shadow-[0_0_40px_-15px_rgba(37,99,235,0.2)]"
        )}
      >
        {/* Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover/shell:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                450px circle at ${mouseX}px ${mouseY}px,
                var(--primary),
                transparent 80%
              )
            `,
            maskImage: useMotionTemplate`
              radial-gradient(
                450px circle at ${mouseX}px ${mouseY}px,
                black,
                transparent 80%
              )
            `,
            WebkitMaskImage: useMotionTemplate`
              radial-gradient(
                450px circle at ${mouseX}px ${mouseY}px,
                black,
                transparent 80%
              )
            `,
          }}
          aria-hidden="true"
        />

        <Card
          style={{ transform: "translateZ(20px)" }}
          className="relative flex h-full flex-col overflow-hidden rounded-[11px] border-0 bg-card/95 shadow-none backdrop-blur-sm transition-colors duration-500 group-hover/shell:bg-card/98 dark:bg-card/90"
        >
          <div 
            className="relative aspect-video w-full overflow-hidden bg-muted"
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
              className={cn(
                "transition-transform duration-700 ease-out",
                imageMode === "contain"
                  ? "object-contain p-4 group-hover/shell:scale-105"
                  : "object-cover group-hover/shell:scale-105"
              )}
            />
            <div
              className="absolute inset-x-4 top-4 z-10 flex items-start justify-end gap-3"
              aria-hidden
            >
              <span className="rounded-lg border border-border/40 bg-background/80 px-2.5 py-1 text-[11px] font-bold tracking-tight text-foreground shadow-sm backdrop-blur-md">
                {project.estimatedPrice}
              </span>
            </div>
          </div>

          <div className="px-4 pt-5">
            <h3 className="font-heading text-lg font-semibold leading-snug md:text-xl">
              {project.title}
            </h3>
          </div>

          <CardHeader className="relative space-y-2 pb-2 pt-3">
            <CardDescription className="line-clamp-2 text-sm leading-relaxed">
              {project.description}
            </CardDescription>
            <div className="mt-1">
              <Badge variant="outline" className="border-primary/20 bg-primary/5 text-[10px] font-semibold text-primary">
                {project.category}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="grow pt-0">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="rounded-md border border-border/40 bg-muted/30 font-mono text-[9px] uppercase tracking-wider transition-colors group-hover/shell:bg-primary/5 group-hover/shell:text-primary"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/40 pt-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {copy.positioning}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground/85">
                  {featured
                    ? copy.featuredPositioning
                    : copy.defaultPositioning}
                </p>
              </div>
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-8 transition-all hover:gap-2 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
              >
                {copy.open}
                <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover/shell:translate-x-0.5 group-hover/shell:-translate-y-0.5" aria-hidden />
              </a>
            </div>
          </CardContent>

          <CardFooter className="mt-auto border-t border-border/40 bg-muted/20">
            <div className="flex w-full gap-2">
              <DialogTrigger
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "flex-1 cursor-pointer rounded-lg font-semibold transition-all duration-300 active:scale-[0.95] shadow-lg shadow-primary/10 hover:shadow-primary/20"
                )}
              >
                {copy.detail}
              </DialogTrigger>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "cursor-pointer rounded-lg border-primary/30 bg-primary/5 px-3 text-primary hover:bg-primary/10"
                )}
              >
                <MessagesSquare className="size-4" />
                <span className="sr-only">{copy.order}</span>
              </a>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      <DialogContent className="max-h-[90vh] overflow-y-auto border-border/60 bg-card/95 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:max-w-[640px] dark:border-white/10 dark:shadow-[0_24px_80px_-20px_rgba(37,99,235,0.18)]">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl md:text-3xl">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-foreground/85">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-1">
          <div className="relative h-56 w-full overflow-hidden rounded-xl bg-slate-950/8 sm:h-64">
            <Image
              src={project.largeImage}
              alt={project.title}
              fill
              sizes="640px"
              className={cn(
                imageMode === "contain" ? "object-contain p-4" : "object-cover"
              )}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"
              aria-hidden
            />
          </div>

          <div className="grid gap-6 py-4">
            {project.problem && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                  <Target className="size-4" />
                  {copy.problem}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.problem}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent">
                  <Zap className="size-4" />
                  {copy.solution}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.solution}
                </p>
              </div>
            )}

            {project.impact && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-green-500">
                  <BarChart3 className="size-4" />
                  {copy.impact}
                </h4>
                <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-sm font-medium text-foreground/90">
                  {project.impact}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-primary/25 bg-gradient-to-br from-primary/15 to-primary/5 p-5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-background/50 ring-1 ring-primary/30">
              <ShoppingCart className="size-5 text-primary" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {copy.pricing}
              </p>
              <p className="inline-block text-xl font-bold tracking-tight text-gradient-brand">
                {project.estimatedPrice}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <DialogClose
            render={<Button variant="outline" className="w-full sm:w-auto" />}
          >
            {copy.close}
          </DialogClose>
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 sm:w-auto"
              />
            }
          >
            <MessagesSquare className="size-4" />
            {copy.order}
          </Button>
          <Button
            nativeButton={false}
            render={
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 sm:w-auto"
              />
            }
          >
            <ExternalLink className="size-4" />
            {copy.openSite}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
