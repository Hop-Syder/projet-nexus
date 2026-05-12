/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Section décrivant le processus de travail de Nexus Partners
 * @created 2024-05-12
 * @updated 2024-05-12
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
// ──────────────────────────────────
"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Coffee, Lightbulb, Rocket } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: { fr: "Idéation", en: "Ideation" },
    desc: {
      fr: "Analyse de votre besoin et conception d'une stratégie digitale sur mesure.",
      en: "Analysis of your needs and design of a tailored digital strategy.",
    },
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Coffee,
    title: { fr: "Design", en: "Design" },
    desc: {
      fr: "Création d'interfaces premium, intuitives et orientées conversion.",
      en: "Creation of premium, intuitive, and conversion-oriented interfaces.",
    },
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    icon: CheckCircle2,
    title: { fr: "Développement", en: "Development" },
    desc: {
      fr: "Codage haute performance avec Next.js et les meilleures briques techniques.",
      en: "High-performance coding with Next.js and the best technical blocks.",
    },
    color: "bg-green-500/10 text-green-500",
  },
  {
    icon: Rocket,
    title: { fr: "Déploiement", en: "Deployment" },
    desc: {
      fr: "Mise en ligne optimisée, SEO et accompagnement au lancement.",
      en: "Optimized launch, SEO, and support during the release phase.",
    },
    color: "bg-purple-500/10 text-purple-500",
  },
];

export function ProcessSection({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const t = {
    fr: {
      title: "Notre Processus",
      subtitle: "De l'idée au succès digital.",
    },
    en: {
      title: "Our Process",
      subtitle: "From idea to digital success.",
    },
  }[locale];

  return (
    <section className="py-24">
      <div className="mb-16 text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          {t.title}
        </h2>
        <p className="mt-4 text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative rounded-2xl border border-border/50 bg-card/50 p-8 transition-all hover:border-primary/30 hover:shadow-xl dark:bg-card/30"
          >
            <div
              className={`mb-6 flex size-12 items-center justify-center rounded-xl ${step.color}`}
            >
              <step.icon className="size-6" />
            </div>
            <h3 className="mb-3 font-heading text-xl font-semibold">
              {step.title[locale]}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {step.desc[locale]}
            </p>
            <div className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-lg bg-muted text-xs font-bold text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              0{index + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
