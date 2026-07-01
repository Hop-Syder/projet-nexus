/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Section preuve sociale : résultats chiffrés mesurés sur les projets livrés
 * @created 2026-07-02
 * @updated 2026-07-02
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
// ──────────────────────────────────
"use client";

import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const copy = {
  fr: {
    eyebrow: "Résultats mesurés",
    title: "Des chiffres, pas des promesses.",
    description:
      "Chaque projet livré est suivi et mesuré. Voici l'impact réel constaté chez nos clients.",
    stats: [
      { value: "9", label: "projets livrés & en ligne" },
      { value: "70%", label: "de prises de RDV automatisées" },
      { value: "-40%", label: "de taux de rebond mobile" },
      { value: "48h", label: "pour recevoir votre proposition" },
    ],
    results: [
      {
        quote:
          "Automatisation de 70% des prises de rendez-vous et une augmentation notable de la clientèle jeune.",
        client: "Cabinet Art de Vivre",
        sector: "Santé · Cotonou",
        slug: "art-de-vivre",
      },
      {
        quote:
          "3 nouveaux contrats majeurs d'entretien industriel signés dès le premier mois après le lancement.",
        client: "Empreinte Finale",
        sector: "Services · Bénin",
        slug: "empreinte-finale",
      },
      {
        quote:
          "Taux de rebond réduit de 40% sur mobile et centralisation réussie de tout l'écosystème digital de la marque.",
        client: "Vano Baby",
        sector: "Retail · Bénin",
        slug: "vano-baby",
      },
    ],
    caseLink: "Lire l'étude de cas",
  },
  en: {
    eyebrow: "Measured results",
    title: "Numbers, not promises.",
    description:
      "Every delivered project is tracked and measured. Here is the real impact observed with our clients.",
    stats: [
      { value: "9", label: "projects delivered & live" },
      { value: "70%", label: "of bookings automated" },
      { value: "-40%", label: "mobile bounce rate" },
      { value: "48h", label: "to receive your proposal" },
    ],
    results: [
      {
        quote:
          "70% of appointment bookings automated and a notable increase in younger clientele.",
        client: "Cabinet Art de Vivre",
        sector: "Healthcare · Cotonou",
        slug: "art-de-vivre",
      },
      {
        quote:
          "3 major industrial maintenance contracts signed within the first month after launch.",
        client: "Empreinte Finale",
        sector: "Services · Benin",
        slug: "empreinte-finale",
      },
      {
        quote:
          "Mobile bounce rate reduced by 40% and the brand's entire digital ecosystem successfully centralized.",
        client: "Vano Baby",
        sector: "Retail · Benin",
        slug: "vano-baby",
      },
    ],
    caseLink: "Read the case study",
  },
} as const;

export function SocialProofSection({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const t = copy[locale];

  return (
    <section
      aria-labelledby="social-proof-heading"
      className="mt-24 md:mt-32"
    >
      <div className="mb-12 text-center md:mb-16">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em] text-accent md:text-xs">
          {t.eyebrow}
        </p>
        <h2
          id="social-proof-heading"
          className="font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
        >
          {t.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground md:text-lg">
          {t.description}
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
      >
        {t.stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0 },
            }}
            className="rounded-xl border border-border/60 bg-card/50 p-5 text-center backdrop-blur-xl md:p-6"
          >
            <p className="font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-xs text-muted-foreground md:text-sm">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        className="mt-8 grid gap-5 md:mt-10 md:grid-cols-3 md:gap-6"
      >
        {t.results.map((result) => (
          <motion.blockquote
            key={result.slug}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="flex h-full flex-col justify-between rounded-xl border border-border/60 bg-card/50 p-6 backdrop-blur-xl transition-colors hover:border-accent/40"
          >
            <div>
              <TrendingUp className="size-5 text-accent" aria-hidden="true" />
              <p className="mt-4 text-sm leading-relaxed text-foreground/85 md:text-base">
                « {result.quote} »
              </p>
            </div>
            <footer className="mt-6 flex items-end justify-between gap-3 border-t border-border/50 pt-4">
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">
                  {result.client}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {result.sector}
                </p>
              </div>
              <Link
                href={`/projets/${result.slug}`}
                className="shrink-0 text-xs font-medium text-primary underline-offset-4 hover:underline"
              >
                {t.caseLink}
              </Link>
            </footer>
          </motion.blockquote>
        ))}
      </motion.div>
    </section>
  );
}
