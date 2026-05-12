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
} from "lucide-react";
import Image from "next/image";

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
      };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(copy.whatsappMessage)}`;
  const imageMode = project.imageMode || "cover";

  return (
    <Dialog>
      <div
        className={cn(
          "group/shell h-full rounded-2xl p-[1px]",
          "bg-gradient-to-br from-blue-500/45 via-slate-400/20 to-blue-300/18",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
          "transition-all duration-500 hover:shadow-[0_20px_60px_-20px_rgba(37,99,235,0.45)] hover:-translate-y-1",
          "dark:from-blue-400/28 dark:via-white/10 dark:to-sky-300/18",
          featured &&
          "md:shadow-[0_16px_56px_-24px_rgba(37,99,235,0.35)] md:ring-1 md:ring-blue-300/20"
        )}
      >
        <Card
          className="flex h-full flex-col overflow-hidden rounded-[15px] border-0 bg-card/85 shadow-none backdrop-blur-md dark:bg-card/75"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-slate-950/10">
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
              className={cn(
                "transition-[filter,transform] duration-700 ease-out group-hover/shell:brightness-110",
                imageMode === "contain"
                  ? "object-contain p-4 group-hover/shell:scale-105"
                  : "object-cover group-hover/shell:scale-[1.04]"
              )}
            />
            <div
              className="absolute inset-x-5 top-5 z-10 flex items-start justify-end gap-3"
              aria-hidden
            >
              <span className="rounded-full border border-white/14 bg-background/60 px-3 py-1.5 text-[11px] font-bold tracking-tight text-foreground/90 backdrop-blur-lg shadow-lg">
                {project.estimatedPrice}
              </span>
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/10 to-transparent opacity-90 transition-opacity duration-300 group-hover/shell:opacity-100"
              aria-hidden
            />
          </div>

          <div className="px-4 pt-5">
            <CardTitle className="font-heading text-lg font-semibold leading-snug md:text-xl">
              {project.title}
            </CardTitle>
          </div>

          <CardHeader className="relative space-y-2 pb-2 pt-3">
            <CardDescription className="line-clamp-3 text-sm leading-relaxed">
              {project.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="grow pt-0">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="border border-border/50 bg-muted/50 font-mono text-[10px] uppercase tracking-wide"
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
                className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 transition-colors hover:text-primary/85 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
              >
                {copy.open}
                <ArrowUpRight className="size-4 shrink-0" aria-hidden />
              </a>
            </div>
          </CardContent>

          <CardFooter className="mt-auto border-t border-border/40 bg-muted/20">
            <div className="flex w-full gap-2">
              <DialogTrigger
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "flex-1 cursor-pointer rounded-xl font-medium transition-transform duration-200 hover:brightness-110 active:scale-[0.99] motion-reduce:transition-none motion-reduce:active:scale-100"
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
                  "cursor-pointer rounded-xl border-primary/25 bg-primary/5 px-3 text-primary hover:bg-primary/10"
                )}
              >
                <MessagesSquare className="size-4" />
                <span className="sr-only">{copy.order}</span>
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>

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
                isZoomedOutProject ? "object-contain p-4" : "object-cover"
              )}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"
              aria-hidden
            />
          </div>

          <div>
            <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {copy.stack}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="border-primary/25 bg-primary/5"
                >
                  {tech}
                </Badge>
              ))}
            </div>
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
