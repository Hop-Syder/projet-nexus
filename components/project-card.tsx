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
import { ArrowRight, MessagesSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

  return (
    <Card className={cn(
      "group relative flex h-full flex-col overflow-hidden transition-all duration-300 ease-out",
      "hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5",
      "border-border/50 bg-card",
      featured && "ring-1 ring-primary/20"
    )}>
      {/* ── Image pleine largeur (Edge to Edge) ── */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Badge de catégorie superposé */}
        <div className="absolute left-4 top-4 z-10">
          <Badge className="bg-background/80 text-foreground backdrop-blur-md hover:bg-background/90">
            {project.category}
          </Badge>
        </div>
      </div>

      {/* ── En-tête de la carte ── */}
      <CardHeader className="p-5 pb-0">
        <CardTitle className="line-clamp-1 text-xl font-semibold tracking-tight">
          {project.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-2 text-sm leading-relaxed">
          {project.description}
        </CardDescription>
      </CardHeader>

      {/* ── Contenu (Stack technique) ── */}
      <CardContent className="flex-1 p-5 pt-4">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary" className="font-medium text-xs">
              {tech}
            </Badge>
          ))}
          {project.stack.length > 4 && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              +{project.stack.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>

      {/* ── Pied de la carte (Actions) ── */}
      <CardFooter className="flex items-center gap-3 p-5 pt-0">
        <Link
          href={`/projets/${project.slug}`}
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "flex-1 font-medium group/btn"
          )}
        >
          {copy.detail}
          <ArrowRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "shrink-0 text-muted-foreground hover:text-primary"
          )}
          title={copy.order}
        >
          <MessagesSquare className="size-4" />
        </a>
      </CardFooter>
    </Card>
  );
}
