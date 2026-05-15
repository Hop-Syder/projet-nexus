/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Page d'accueil du catalogue Nexus Partners
 * @created 2024-05-12
 * @updated 2024-05-12
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
// ──────────────────────────────────
"use client";

import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import { ProjectCard } from "@/components/project-card";
import { ProcessSection } from "@/components/process-section";
import { OrderSection } from "@/components/order-section";
import { Preloader } from "@/components/preloader";
import { FaqSection } from "@/components/faq-section";
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
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
      "Vous cherchez un développeur africain pour créer votre site web au Bénin ou en Afrique ? Découvrez le catalogue Nexus Partners : des solutions web premium, performantes et sur mesure.",
    primaryCta: "Voir le catalogue",
    secondaryCta: "Demander une proposition",
    chips: [
      "Expertise UI/UX Élite",
      "Architecture Next.js Performante",
      "Design System Scalable",
    ],
    selectedWork: "travaux sélectionnés",
    sideTitle: "Stratégie, design et exécution.",
    references: "Références",
    referencesCaption: "études de cas prêtes à l'audit.",
    stackVisible: "Stack exposée",
    stackCaption: "technologies de pointe sans compromis.",
    positioning: "Positionnement",
    positioningTitle: "Une signature visuelle forte.",
    positioningPoints: [
      "01. Stratégie de conversion avant le code.",
      "02. Preuve par le livrable et la performance.",
      "03. Excellence opérationnelle et suivi direct.",
    ],
    projectsTitle: "Portfolio & Références",
    projectsDescription:
      "Chaque réalisation est une démonstration d'expertise : stack moderne, design sur mesure et optimisation SEO.",
    contactTitle: "Élevez votre projet digital",
    contactDescription:
      "Partagez votre vision : nous concevons une proposition stratégique sur mesure sous 48h.",
    socialTitle: "Écosystème & Contact",
    site: "Plateforme",
    email: "Email",
    phone: "Direct",
    hours: "Disponibilité",
    hoursValue: "Lun–Ven : 09:00 – 18:00 (GMT+1)",
  },
  en: {
    eyebrow: "Nexus Partners Portfolio",
    availability: "Limited slots for high-end web mandates",
    heroLine1: "Interfaces",
    heroLine2: "that convert.",
    heroDescription:
      "Looking for an African developer to create your website in Benin or Africa? Explore the Nexus Partners portfolio: premium, high-performance, and custom web solutions.",
    primaryCta: "Explore Portfolio",
    secondaryCta: "Request Strategic Quote",
    chips: [
      "Elite UI/UX Expertise",
      "High-Performance Next.js Build",
      "Scalable Design Systems",
    ],
    selectedWork: "selected work",
    sideTitle: "Strategy, Design & Execution.",
    references: "References",
    referencesCaption: "case studies ready for review.",
    stackVisible: "Exposed Stack",
    stackCaption: "cutting-edge tech blocks without blur.",
    positioning: "Positioning",
    positioningTitle: "An interface that owns its value.",
    positioningPoints: [
      "01. Conversion strategy before technical details.",
      "02. Proof through deliverables and performance.",
      "03. Operational excellence and direct support.",
    ],
    projectsTitle: "Work & References",
    projectsDescription:
      "Each card opens a deep dive: advanced tech stack, custom design, and SEO performance metrics.",
    contactTitle: "Elevate your digital presence",
    contactDescription:
      "Describe your vision and we will come back with a tailored strategic proposal within 48h.",
    socialTitle: "Ecosystem & Contact",
    site: "Platform",
    email: "Email",
    phone: "Direct",
    hours: "Availability",
    hoursValue: "Mon–Fri: 9:00 AM – 6:00 PM (GMT+1)",
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
    en: Partial<Project>;
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
      title: "Parole d'Aîné",
      description:
        "E-commerce and creative platform for an urban fashion brand based in Abomey-Calavi, Benin. The website combines streetwear sales, t-shirts, hoodies, and accessories with creative design services including graphic design, logo creation, visual identity, and advertising.",
      estimatedPrice: "Quote on request",
    },
  },
  "projet-6": {
    en: {
      title: "Morad Prestation",
      description:
        "Next.js showcase website for a construction company in Benin, focused on construction, civil engineering, earthworks, and public works services. The project highlights completed work, teams, and an online quote request flow to support lead generation.",
      estimatedPrice: "Quote on request",
    },
  },
  "projet-7": {
    en: {
      title: "AfriPlantes",
      category: "Community Platform & AI",
      description: "The Digital Herbarium of Africa. A platform dedicated to preserving and promoting African medicinal flora.",
      problem: "The gradual disappearance of ancestral knowledge about African herbal medicine due to a lack of structured documentation.",
      solution: "A complex relational database under Supabase coupled with an immersive 'Nature Premium' interface using fluid animations.",
      impact: "Registration of over 500 species and creation of an active community for knowledge sharing.",
      estimatedPrice: "450,000 XOF",
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
  const [isLoading, setIsLoading] = useState(true);
  const t = copy[locale];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Réduit de 5s à 1.5s pour une meilleure UX
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isLoading]);


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
    <>
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>

      <div className={cn("relative min-h-screen", isLoading ? "hidden" : "block")}>
      <div className="grid-pattern pointer-events-none absolute inset-0 -z-10 opacity-[0.4] dark:opacity-[0.2]" />

      {/* Éléments de structure en arrière-plan */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[10%] top-[15%] size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-[10%] top-[10%] size-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <main className="relative z-10 container mx-auto px-4 pb-24 pt-32 md:pt-40 lg:pt-48">
        <section
          aria-labelledby="hero-heading"
          className="mb-20 md:mb-28 lg:mb-36"
        >
          <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-10">
            <div>
              <p className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.35em] text-accent md:text-xs">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
                {t.eyebrow}
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent/90" />
              </p>

              <div className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-medium text-foreground/80 backdrop-blur-xl">
                <div className="relative flex size-3 items-center justify-center">
                  <svg 
                    viewBox="0 0 48 48" 
                    className="size-3 fill-accent" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M38,4V0h-4v4H14V0h-4v4H0v11.9v4V48h48V19.9v-4V4H38z M44,44H4V19.9h40V44z M4,15.9V8h6v4h4V8h20v4h4V8h6v7.9H4z"></path> 
                    <rect height="6" width="6" x="7.5" y="24"></rect> 
                    <rect height="6" width="6" x="16.667" y="24"></rect> 
                    <rect height="6" width="6" x="25.583" y="24"></rect> 
                    <rect height="6" width="6" x="34.5" y="24"></rect> 
                    <rect height="6" width="6" x="7.5" y="33"></rect> 
                    <rect height="6" width="6" x="16.667" y="33"></rect> 
                    <rect height="6" width="6" x="25.583" y="33"></rect> 
                    <rect height="6" width="6" x="34.5" y="33"></rect> 
                  </svg>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/30 motion-reduce:hidden" />
                </div>
                {t.availability}
              </div>

              <h1
                id="hero-heading"
                className="mt-8 font-heading text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[0.98] tracking-tight text-balance"
              >
                <span className="sr-only">Nexus Partners — Développeur Web au Bénin & Afrique. </span>
                <span className="block text-foreground">{t.heroLine1}</span>
                <span className="block text-gradient-brand">{t.heroLine2}</span>
              </h1>

              <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
                {t.heroDescription}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#projects-heading"
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-primary/50 bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_18px_45px_-20px_rgba(37,99,235,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-24px_rgba(37,99,235,0.8)]"
                >
                  {t.primaryCta}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#order-section"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border/70 bg-background/65 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/70"
                >
                  {t.secondaryCta}
                  <ArrowRight className="size-4" />
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                {t.chips.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-border/60 bg-background/55 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <aside className="relative">
              <div className="absolute inset-x-6 top-8 -z-10 h-32 rounded-full bg-primary/18 blur-3xl" />
              <div className="overflow-hidden rounded-xl border border-border/70 bg-background/70 p-5 shadow-2xl backdrop-blur-2xl">
                <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {t.selectedWork}
                    </p>
                    <p className="mt-2 font-heading text-2xl font-semibold tracking-tight">
                      {t.sideTitle}
                    </p>
                  </div>
                  <span className="rounded-lg border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    2026
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                  <div className="rounded-lg border border-border/60 bg-muted/40 p-4">
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
                  <div className="rounded-lg border border-border/60 bg-muted/40 p-4">
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

                <div className="mt-5 rounded-lg border border-primary/20 bg-slate-950 p-5 text-slate-50">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/35">
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

        <ProcessSection locale={locale} />

        <section aria-labelledby="projects-heading" className="scroll-mt-24">
          <div className="mb-12 md:mb-16">
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

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-9 xl:grid-cols-4 xl:gap-10"
          >
            {localizedProjects.map((project, i) => (
              <motion.div
                key={project.id}
                id={project.id}
                className="scroll-mt-32"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <ProjectCard
                  project={project}
                  featured={i === 0}
                  locale={locale}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <OrderSection locale={locale} />

        <FaqSection locale={locale} />

        <section
          aria-labelledby="contact-heading"
          className="relative mt-24 md:mt-32"
        >
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-primary/18 via-transparent to-primary/8 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-8 text-center shadow-2xl backdrop-blur-xl dark:border-white/10 md:p-12 lg:p-14">
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
              className="relative mt-8 cursor-pointer rounded-lg px-8"
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

            <div className="relative mx-auto mt-8 max-w-3xl rounded-xl border border-border/60 bg-background/45 p-5 text-left backdrop-blur-xl">
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
                        className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-accent/10"
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
                    className="inline-flex items-start gap-3 rounded-lg border border-border/60 bg-background/55 p-3 transition-colors hover:border-accent/40 hover:bg-accent/10"
                  >
                    <Globe className="mt-0.5 size-4 text-primary" />
                    <span>
                      <span className="block font-medium text-foreground">{t.site}</span>
                      <span>nexus-partners.xyz</span>
                    </span>
                  </a>
                  <a
                    href="tel:+2290196701733"
                    className="inline-flex items-start gap-3 rounded-lg border border-border/60 bg-background/55 p-3 transition-colors hover:border-accent/40 hover:bg-accent/10"
                  >
                    <Phone className="mt-0.5 size-4 text-primary" />
                    <span>
                      <span className="block font-medium text-foreground">{t.phone}</span>
                      <span>+229 01 96 70 17 33</span>
                    </span>
                  </a>
                  <a
                    href="mailto:contact@nexus-partners.xyz"
                    className="inline-flex items-start gap-3 rounded-lg border border-border/60 bg-background/55 p-3 transition-colors hover:border-accent/40 hover:bg-accent/10"
                  >
                    <Mail className="mt-0.5 size-4 text-primary" />
                    <span>
                      <span className="block font-medium text-foreground">{t.email}</span>
                      <span>contact@nexus-partners.xyz</span>
                    </span>
                  </a>
                  <div className="inline-flex items-start gap-3 rounded-lg border border-border/60 bg-background/55 p-3">
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
            © {new Date().getFullYear()} Nexus <span className="text-accent">Partners</span> — nexus-partners.xyz
          </p>
        </div>
      </footer>
    </div>
    </>
  );
}
