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
          caseStudy: featured ? "Case study 01" : "Case study",
          featuredLabel: "À la une — Nexus",
          referenceLabel: "Référence",
          positioning: "Positionnement",
          featuredPositioning: "Livrable phare du catalogue",
          defaultPositioning: "Mission ciblée",
          open: "Ouvrir",
          detail: "Voir l’étude de cas",
          order: "Commander",
          stack: "Stack",
          pricing: "Fourchette indicative",
          openSite: "Ouvrir le site",
          whatsappMessage: `Bonjour Nexus Partners, je souhaite commander le projet "${project.title}". Pouvez-vous me guider sur la suite ?`,
          close: "Fermer",
        }
      : {
          caseStudy: featured ? "Case study 01" : "Case study",
          featuredLabel: "Featured — Nexus",
          referenceLabel: "Reference",
          positioning: "Positioning",
          featuredPositioning: "Lead showcase deliverable",
          defaultPositioning: "Targeted engagement",
          open: "Open",
          detail: "View case study",
          order: "Order",
          stack: "Stack",
          pricing: "Indicative range",
          openSite: "Open website",
          whatsappMessage: `Hello Nexus Partners, I would like to order the "${project.title}" project. Could you guide me on the next steps?`,
          close: "Close",
        };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(copy.whatsappMessage)}`;

  return (
    <Dialog>
      <div
        className={cn(
          "group/shell rounded-2xl p-[1px]",
          "bg-gradient-to-br from-blue-500/45 via-slate-400/20 to-blue-300/18",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
          "transition-shadow duration-300 hover:shadow-[0_12px_48px_-20px_rgba(37,99,235,0.4)]",
          "dark:from-blue-400/28 dark:via-white/10 dark:to-sky-300/18",
          featured &&
            "md:shadow-[0_16px_56px_-24px_rgba(37,99,235,0.35)] md:ring-1 md:ring-blue-300/20"
        )}
      >
        <Card
          className={cn(
            "flex h-full flex-col overflow-hidden rounded-[15px] border-0 bg-card/85 shadow-none backdrop-blur-md dark:bg-card/75",
            featured && "md:min-h-[320px]"
          )}
        >
          <div
            className={cn(
              "relative w-full overflow-hidden",
              featured ? "aspect-[21/9] md:aspect-[2.4/1]" : "aspect-video"
            )}
          >
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes={
                featured
                  ? "(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 50vw"
                  : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
              }
              className="object-cover transition-[filter,transform] duration-500 ease-out group-hover/shell:scale-[1.03] group-hover/shell:brightness-110 motion-reduce:transition-none motion-reduce:group-hover/shell:scale-100"
            />
            <div
              className="absolute inset-x-5 top-5 z-10 flex items-start justify-between gap-3"
              aria-hidden
            >
              <span className="rounded-full border border-white/20 bg-slate-950/65 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-100 backdrop-blur-md">
                {copy.caseStudy}
              </span>
              <span className="rounded-full border border-white/14 bg-background/55 px-2.5 py-1 text-xs font-medium text-foreground/80 backdrop-blur-md">
                {project.estimatedPrice}
              </span>
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-t from-background via-background/28 to-transparent opacity-92 transition-opacity duration-300 group-hover/shell:opacity-100"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary drop-shadow-sm">
                {featured ? copy.featuredLabel : copy.referenceLabel}
              </p>
              <p className="font-heading text-lg font-semibold leading-snug text-foreground drop-shadow-sm md:text-xl">
                {project.title}
              </p>
            </div>
          </div>

          <CardHeader className="relative space-y-2 pb-2 pt-5">
            <CardTitle className="sr-only">{project.title}</CardTitle>
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
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                {copy.open}
                <ArrowUpRight className="size-4" />
              </span>
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
          <div className="relative h-56 w-full overflow-hidden rounded-xl sm:h-64">
            <Image
              src={project.largeImage}
              alt={project.title}
              fill
              sizes="640px"
              className="object-cover"
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
