/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Composant d'affichage des projets avec détails et commande WhatsApp
 */"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { Project } from "@/lib/types/project";
import { cn } from "@/lib/utils";
import { ArrowUpRight, MessagesSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
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
          detail: "Voir l'étude de cas",
          order: "Nous contacter",
          whatsappMessage: `Bonjour Nexus Partners, je suis intéressé par une solution similaire au projet "${project.title}". Pouvez-vous m'en dire plus ?`,
        }
      : {
          detail: "View case study",
          order: "Contact us",
          whatsappMessage: `Hello Nexus Partners, I am interested in a solution similar to the "${project.title}" project. Could you tell me more?`,
        };

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    copy.whatsappMessage
  )}`;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card/20 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_40px_-12px_rgba(251,191,36,0.15)] border border-border/40"
    >
      {/* ── Spotlight Effect ── */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(251, 191, 36, 0.1),
              transparent 80%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* ── Image ── */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/30">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Voile assombrissant au survol */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
        
        <div className="absolute left-5 top-5 z-10">
          <Badge className="bg-background/40 text-foreground backdrop-blur-md border-border/50 shadow-sm transition-colors group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/30">
            {project.category}
          </Badge>
        </div>
      </div>

      {/* ── Contenu ── */}
      <div className="relative flex flex-1 flex-col z-10 -mt-8 p-5">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="font-heading text-2xl font-bold tracking-tight text-foreground/95 drop-shadow-sm">
            {project.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 mt-2 text-sm leading-relaxed text-foreground/70">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 flex-1 flex flex-col justify-end">
          <div className="flex flex-wrap gap-2 pt-2">
            {project.stack.slice(0, 4).map((tech) => (
              <Badge 
                key={tech} 
                variant="secondary" 
                className="bg-muted/40 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors group-hover:bg-primary/5 group-hover:text-primary"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </div>

      {/* ── Actions ── */}
      <CardFooter className="relative z-10 flex items-center justify-between border-t border-border/30 bg-muted/10 p-5 pt-4">
        <Link
          href={`/projets/${project.slug}`}
          className="group/link inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-all hover:text-primary"
        >
          {copy.detail}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "h-9 w-9 shrink-0 rounded-full border-border/50 bg-background/50 text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary hover:shadow-md hover:shadow-primary/20"
          )}
          title={copy.order}
        >
          <MessagesSquare className="size-4" />
        </a>
      </CardFooter>
    </motion.div>
  );
}
