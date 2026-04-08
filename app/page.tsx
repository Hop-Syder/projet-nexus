"use client";

import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import { ProjectCard } from "@/components/project-card";
import projectsData from "@/data/projects.json";
import type { Project } from "@/lib/types/project";
import {
  AtSign,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Clock3,
  Globe,
  Mail,
  MessagesSquare,
  Phone,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const projects = projectsData as Project[];
const stackCount = new Set(projects.flatMap((project) => project.stack)).size;
const localeStorageKey = "nexus-partners-locale";

const copy = {
  fr: {
    eyebrow: "catalogue Nexus Partners",
    availability: "Disponibilités limitées pour nouveaux mandats web",
    heroLine1: "Des interfaces",
    heroLine2: "qui vendent.",
    heroDescription:
      "Le catalogue officiel des réalisations Nexus Partners : parcours clair, technologies affichées, fourchettes tarifaires et niveau d'exécution visible dès le premier scroll.",
    primaryCta: "Voir le catalogue",
    secondaryCta: "Demander une proposition",
    chips: [
      "Direction web lisible",
      "Build rapide",
      "Preuve par les livrables",
    ],
    selectedWork: "selected work",
    sideTitle: "Studio, conseil et exécution.",
    references: "Références",
    referencesCaption: "études de cas prêtes à consulter.",
    stackVisible: "Stack visible",
    stackCaption: "briques techniques exposées sans flou.",
    positioning: "Positionnement",
    positioningTitle: "Une interface qui assume sa valeur.",
    positioningPoints: [
      "01. Promesse claire avant les détails techniques.",
      "02. Références montrées comme preuve, pas comme galerie.",
      "03. Contact direct, sans tunnel ni friction inutile.",
    ],
    projectsTitle: "Réalisations & références",
    projectsDescription:
      "Chaque carte ouvre une fiche : visuels, stack technique, budget indicatif, puis accès direct au projet en ligne.",
    caseStudies: "études de cas",
    pricingVisible: "pricing visible",
    contactTitle: "Un projet avec Nexus Partners ?",
    contactDescription:
      "Décrivez votre besoin : nous revenons vers vous avec une proposition adaptée, sans engagement.",
    socialTitle: "Contact & réseaux",
    site: "Site",
    email: "Email",
    phone: "Téléphone",
    hours: "Horaires",
    hoursValue: "Lun–Ven : 9h00 – 18h00",
  },
  en: {
    eyebrow: "Nexus Partners catalog",
    availability: "Limited availability for new web engagements",
    heroLine1: "Interfaces",
    heroLine2: "that sell.",
    heroDescription:
      "The official Nexus Partners showcase: clear navigation, visible technologies, pricing ranges, and execution quality you can assess from the first scroll.",
    primaryCta: "Browse the catalog",
    secondaryCta: "Request a proposal",
    chips: ["Clear web direction", "Fast build", "Proof through deliverables"],
    selectedWork: "selected work",
    sideTitle: "Studio, advisory and execution.",
    references: "References",
    referencesCaption: "case studies ready to review.",
    stackVisible: "Visible stack",
    stackCaption: "technical building blocks shown without blur.",
    positioning: "Positioning",
    positioningTitle: "An interface that owns its value.",
    positioningPoints: [
      "01. Clear promise before technical details.",
      "02. References shown as proof, not as a gallery.",
      "03. Direct contact, no tunnel and no needless friction.",
    ],
    projectsTitle: "Work & references",
    projectsDescription:
      "Each card opens a profile: visuals, technical stack, indicative budget, then direct access to the live project.",
    caseStudies: "case studies",
    pricingVisible: "pricing visible",
    contactTitle: "A project with Nexus Partners?",
    contactDescription:
      "Describe your needs and we will come back with a tailored proposal, with no obligation.",
    socialTitle: "Contact & social",
    site: "Website",
    email: "Email",
    phone: "Phone",
    hours: "Hours",
    hoursValue: "Mon–Fri: 9:00 AM – 6:00 PM",
  },
} as const;

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/nexus-partners-bj",
    icon: Users,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61566371714392",
    icon: MessagesSquare,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nexuspartners.agency/",
    icon: AtSign,
  },
] as const;

const projectTranslations: Record<
  string,
  {
    en: Pick<Project, "title" | "description" | "estimatedPrice">;
  }
> = {
  "projet-1": {
    en: {
      title: "ART DE VIVRE PSYCHOLOGICAL PRACTICE",
      description:
        "Showcase website for a psychology practice in Cotonou, built around appointment booking and a reassuring journey for children, teenagers, adults, couples, and families. The project highlights services, therapeutic approach, and a booking system connected to Google Calendar.",
      estimatedPrice: "250,000 XOF",
    },
  },
  "projet-2": {
    en: {
      title: "Empreinte Finale",
      description:
        "Showcase website for a Beninese agency focused on cleaning and event management. The project presents before, during, and after-event services, decoration, logistics, and a turnkey support promise with clear service blocks, figures, and testimonials.",
      estimatedPrice: "200,000 XOF",
    },
  },
  "projet-3": {
    en: {
      title: "Corporate Website",
      description:
        "SEO-focused corporate website with polished animation, advanced contact flow, and CRM integration.",
      estimatedPrice: "From €800",
    },
  },
  "projet-4": {
    en: {
      title: "Mobile Application",
      description:
        "Cross-platform fitness app with GPS tracking, push notifications, and real-time cloud sync.",
      estimatedPrice: "From €2,500",
    },
  },
  "projet-5": {
    en: {
      title: "Analytics Dashboard",
      description:
        "Admin dashboard with interactive charts to monitor large volumes of financial data in real time.",
      estimatedPrice: "From €2,000",
    },
  },
};

export default function Home() {
  const [locale, setLocale] = useState<"fr" | "en">(() => {
    if (typeof window === "undefined") {
      return "fr";
    }
    const saved = window.localStorage.getItem(localeStorageKey);
    return saved === "en" ? "en" : "fr";
  });
  const t = copy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(localeStorageKey, locale);
  }, [locale]);

  const localizedProjects = useMemo(
    () =>
      projects.map((project) => {
        if (locale === "fr") return project;
        const translated = projectTranslations[project.id]?.en;
        return translated ? { ...project, ...translated } : project;
      }),
    [locale]
  );

  return (
    <div className="relative min-h-screen">
      <header className="sticky top-4 z-40 px-4 md:top-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-background/70 px-4 py-3 shadow-[0_8px_32px_-12px_rgba(37,99,235,0.2)] backdrop-blur-xl dark:border-white/10 dark:bg-background/55 dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]">
            <div className="flex items-center rounded-2xl border border-[rgb(255_204_0_/_0.22)] bg-[linear-gradient(135deg,rgb(255_204_0_/_0.14),transparent_58%)] px-2 py-1 accent-yellow-glow">
              <Image
                src="/logo.png"
                alt="Nexus Partners"
                width={44}
                height={44}
                className="h-11 w-auto"
                priority
              />
            </div>
            <div className="flex items-center gap-2">
              <LanguageToggle
                locale={locale}
                onToggle={() => setLocale(locale === "fr" ? "en" : "fr")}
              />
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 pb-24 pt-10 md:pt-14 lg:pt-16">
        <section
          aria-labelledby="hero-heading"
          className="mb-20 md:mb-28 lg:mb-36"
        >
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-10">
            <div>
              <p className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground md:text-xs">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
                {t.eyebrow}
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-[rgb(255_204_0_/_0.9)]" />
              </p>

              <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(255_204_0_/_0.28)] bg-[linear-gradient(135deg,rgb(255_204_0_/_0.14),rgb(255_255_255_/_0.02))] px-3 py-1 text-[11px] font-medium text-foreground/80 shadow-[0_10px_30px_-20px_rgba(255,204,0,0.45)] backdrop-blur-xl">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[rgb(255_204_0_/_0.55)] motion-reduce:hidden" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-[rgb(255_204_0)]" />
                </span>
                {t.availability}
              </div>

              <h1
                id="hero-heading"
                className="mt-8 font-heading text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[0.98] tracking-tight text-balance"
              >
                <span className="block text-foreground">{t.heroLine1}</span>
                <span className="block text-gradient-brand">{t.heroLine2}</span>
              </h1>

              <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
                {t.heroDescription}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#projects-heading"
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-primary/50 bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_18px_45px_-20px_rgba(37,99,235,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-24px_rgba(37,99,235,0.8)]"
                >
                  {t.primaryCta}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#contact-heading"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border/70 bg-background/65 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/70"
                >
                  {t.secondaryCta}
                  <ArrowRight className="size-4" />
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {t.chips.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border/60 bg-background/55 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <aside className="relative">
              <div className="absolute inset-x-6 top-8 -z-10 h-32 rounded-full bg-primary/18 blur-3xl" />
              <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-background/70 p-5 shadow-[0_30px_80px_-28px_rgba(15,23,42,0.45)] backdrop-blur-2xl">
                <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {t.selectedWork}
                    </p>
                    <p className="mt-2 font-heading text-2xl font-semibold tracking-tight">
                      {t.sideTitle}
                    </p>
                  </div>
                  <span className="rounded-full border border-[rgb(255_204_0_/_0.3)] bg-[rgb(255_204_0_/_0.12)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[rgb(255_204_0)] shadow-[0_10px_28px_-16px_rgba(255,204,0,0.8)]">
                    2026
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                  <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {t.references}
                    </p>
                    <p className="mt-2 font-heading text-3xl font-semibold tracking-tight">
                      {localizedProjects.length}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t.referencesCaption}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {t.stackVisible}
                    </p>
                    <p className="mt-2 font-heading text-3xl font-semibold tracking-tight">
                      {stackCount}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t.stackCaption}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-[1.35rem] border border-blue-400/20 bg-[linear-gradient(180deg,rgba(15,23,42,0.98),rgba(15,23,42,0.92))] p-5 text-slate-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/35">
                      <Blocks className="size-4 text-blue-200" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        {t.positioning}
                      </p>
                      <p className="font-heading text-lg font-semibold">
                        {t.positioningTitle}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-2 text-sm text-slate-300">
                    {t.positioningPoints.map((point) => (
                      <p key={point}>{point}</p>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section aria-labelledby="projects-heading" className="scroll-mt-24">
          <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <h2
                id="projects-heading"
                className="font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
              >
                {t.projectsTitle}
              </h2>
              <p className="mt-3 max-w-xl text-base text-muted-foreground md:text-lg">
                {t.projectsDescription}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="rounded-full border border-[rgb(255_204_0_/_0.28)] bg-[linear-gradient(135deg,rgb(255_204_0_/_0.12),rgb(255_255_255_/_0.04))] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/75 shadow-[0_12px_28px_-20px_rgba(255,204,0,0.55)] backdrop-blur-sm">
                {localizedProjects.length} {t.caseStudies}
              </p>
              <p className="rounded-full border border-[rgb(255_204_0_/_0.28)] bg-[linear-gradient(135deg,rgb(255_204_0_/_0.12),rgb(255_255_255_/_0.04))] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/75 shadow-[0_12px_28px_-20px_rgba(255,204,0,0.55)] backdrop-blur-sm">
                {t.pricingVisible}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-9 xl:grid-cols-4 xl:gap-10">
            {localizedProjects.map((project, i) => (
              <div
                key={project.id}
                className={
                  i === 0
                    ? "md:col-span-2 xl:col-span-2 xl:row-span-1"
                    : undefined
                }
              >
                <ProjectCard
                  project={project}
                  featured={i === 0}
                  locale={locale}
                />
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="contact-heading"
          className="relative mt-24 md:mt-32"
        >
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/18 via-transparent to-primary/8 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/60 p-8 text-center shadow-[0_24px_80px_-32px_rgba(37,99,235,0.35)] backdrop-blur-xl dark:border-white/10 md:p-12 lg:p-14">
            <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/14 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 size-40 rounded-full bg-blue-500/20 blur-3xl" />

            <h2
              id="contact-heading"
              className="font-heading relative text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl"
            >
              {t.contactTitle}
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-muted-foreground md:text-lg">
              {t.contactDescription}
            </p>
            <Button
              className="relative mt-8 cursor-pointer rounded-full px-8 shadow-[0_0_24px_-4px_rgba(37,99,235,0.45)]"
              nativeButton={false}
              render={
                <a
                  href="mailto:contact@nexus-partners.xyz"
                  className="inline-flex items-center gap-2"
                />
              }
            >
              <Mail className="size-4" />
              contact@nexus-partners.xyz
            </Button>

            <div className="relative mx-auto mt-8 max-w-3xl rounded-[1.5rem] border border-border/60 bg-background/45 p-5 text-left backdrop-blur-xl">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {t.socialTitle}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {socialLinks.map(({ label, href, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-[rgb(255_204_0_/_0.35)] hover:bg-[rgb(255_204_0_/_0.08)]"
                      >
                        <Icon className="size-4 text-primary" />
                        {label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:min-w-[420px]">
                  <a
                    href="https://nexus-partners.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-3 rounded-2xl border border-border/60 bg-background/55 p-3 transition-colors hover:border-[rgb(255_204_0_/_0.35)] hover:bg-[rgb(255_204_0_/_0.08)]"
                  >
                    <Globe className="mt-0.5 size-4 text-primary" />
                    <span>
                      <span className="block font-medium text-foreground">{t.site}</span>
                      <span>nexus-partners.xyz</span>
                    </span>
                  </a>
                  <a
                    href="tel:+2290196701733"
                    className="inline-flex items-start gap-3 rounded-2xl border border-border/60 bg-background/55 p-3 transition-colors hover:border-[rgb(255_204_0_/_0.35)] hover:bg-[rgb(255_204_0_/_0.08)]"
                  >
                    <Phone className="mt-0.5 size-4 text-primary" />
                    <span>
                      <span className="block font-medium text-foreground">{t.phone}</span>
                      <span>+229 01 96 70 17 33</span>
                    </span>
                  </a>
                  <a
                    href="mailto:contact@nexus-partners.xyz"
                    className="inline-flex items-start gap-3 rounded-2xl border border-border/60 bg-background/55 p-3 transition-colors hover:border-[rgb(255_204_0_/_0.35)] hover:bg-[rgb(255_204_0_/_0.08)]"
                  >
                    <Mail className="mt-0.5 size-4 text-primary" />
                    <span>
                      <span className="block font-medium text-foreground">{t.email}</span>
                      <span>contact@nexus-partners.xyz</span>
                    </span>
                  </a>
                  <div className="inline-flex items-start gap-3 rounded-2xl border border-border/60 bg-background/55 p-3">
                    <Clock3 className="mt-0.5 size-4 text-primary" />
                    <span>
                      <span className="block font-medium text-foreground">{t.hours}</span>
                      <span>{t.hoursValue}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border/50 py-10 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Nexus Partners — nexus-partners.xyz
          </p>
        </div>
      </footer>
    </div>
  );
}
