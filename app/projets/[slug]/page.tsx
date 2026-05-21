/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Page de détail d'un projet — hero, stack, galerie, navigation
 * @created 2026-05-18
 * @updated 2026-05-18
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
// ──────────────────────────────────
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import projectsData from "@/data/projects.json";
import type { Project } from "@/lib/types/project";
import { ProjectDetailView } from "@/components/project-detail-view";

const projects = projectsData as Project[];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Projet introuvable" };
  }

  return {
    title: `${project.title} — Étude de cas`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Nexus Partners`,
      description: project.description,
      images: [{ url: project.largeImage, width: 1200, height: 630 }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <ProjectDetailView
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
