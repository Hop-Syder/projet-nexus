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
    title: { fr: "Idéation & Stratégie", en: "Ideation & Strategy" },
    desc: {
      fr: "Chaque grand projet commence par une écoute attentive. En tant que développeur africain au Bénin, nous analysons vos besoins spécifiques, vos objectifs commerciaux et votre audience pour concevoir une stratégie digitale sur mesure qui surpasse la concurrence locale et internationale.",
      en: "Every great project starts with attentive listening. As an African developer in Benin, we analyze your specific needs, business goals, and audience to design a tailored digital strategy that outperforms local and international competition.",
    },
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Coffee,
    title: { fr: "Design UX/UI Premium", en: "Premium UX/UI Design" },
    desc: {
      fr: "Nous ne nous contentons pas de faire du beau ; nous créons des interfaces intuitives qui captivent. Notre approche du design au Bénin allie esthétique moderne et ergonomie, garantissant que chaque visiteur de votre site web en Afrique vive une expérience fluide et mémorable.",
      en: "We don't just do beauty; we create intuitive interfaces that captivate. Our design approach in Benin combines modern aesthetics and ergonomics, ensuring that every visitor to your website in Africa has a fluid and memorable experience.",
    },
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    icon: CheckCircle2,
    title: { fr: "Développement Haute Performance", en: "High-Performance Development" },
    desc: {
      fr: "L'excellence technique est notre signature. En utilisant Next.js et React, nous construisons des sites ultra-rapides, sécurisés et optimisés pour le SEO. C'est ici que votre vision prend vie grâce à un code propre, robuste et évolutif, conçu par des experts passionnés.",
      en: "Technical excellence is our signature. Using Next.js and React, we build ultra-fast, secure, and SEO-optimized sites. This is where your vision comes to life through clean, robust, and scalable code, designed by passionate experts.",
    },
    color: "bg-green-500/10 text-green-500",
  },
  {
    icon: Rocket,
    title: { fr: "Déploiement & Accompagnement", en: "Deployment & Support" },
    desc: {
      fr: "Le lancement n'est que le début. Nous assurons un déploiement sécurisé sur les meilleurs serveurs mondiaux et nous vous accompagnons dans la durée. Notre objectif est de faire de votre présence web un moteur de croissance continue pour votre entreprise en Afrique.",
      en: "The launch is just the beginning. We ensure a secure deployment on the world's best servers and we support you over time. Our goal is to make your web presence a continuous growth engine for your business in Africa.",
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
