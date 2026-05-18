/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Section décrivant le processus de travail de Nexus Partners
 * @created 2024-05-12
 * @updated 2024-05-14
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
// ──────────────────────────────────
"use client";

import { motion } from "framer-motion";
import { CardFlip } from "@/components/ui/card-flip";

const steps = [
  {
    title: { fr: "Idéation & Stratégie", en: "Ideation & Strategy" },
    subtitle: { fr: "Définir votre vision", en: "Define your vision" },
    desc: {
      fr: "Chaque grand projet commence par une écoute attentive. En tant que développeur africain au Bénin, nous analysons vos besoins spécifiques, vos objectifs commerciaux et votre audience pour concevoir une stratégie digitale sur mesure qui surpasse la concurrence locale et internationale.",
      en: "Every great project starts with attentive listening. As an African developer in Benin, we analyze your specific needs, business goals, and audience to design a tailored digital strategy that outperforms local and international competition.",
    },
    features: {
      fr: ["Audit concurrentiel", "Stratégie digitale", "Positionnement"],
      en: ["Competitive audit", "Digital strategy", "Positioning"]
    }
  },
  {
    title: { fr: "Design UX/UI Premium", en: "Premium UX/UI Design" },
    subtitle: { fr: "Interfaces qui convertissent", en: "Interfaces that convert" },
    desc: {
      fr: "Nous ne nous contentons pas de faire du beau ; nous créons des interfaces intuitives qui captivent. Notre approche du design au Bénin allie esthétique moderne et ergonomie, garantissant que chaque visiteur de votre site web en Afrique vive une expérience fluide et mémorable.",
      en: "We don't just do beauty; we create intuitive interfaces that captivate. Our design approach in Benin combines modern aesthetics and ergonomics, ensuring that every visitor to your website in Africa has a fluid and memorable experience.",
    },
    features: {
      fr: ["Maquettes Figma", "Design System", "Animations fluides"],
      en: ["Figma Mockups", "Design System", "Fluid animations"]
    }
  },
  {
    title: { fr: "Développement Haute Performance", en: "High-Performance Development" },
    subtitle: { fr: "Code robuste et scalable", en: "Robust and scalable code" },
    desc: {
      fr: "L'excellence technique est notre signature. En utilisant Next.js et React, nous construisons des sites ultra-rapides, sécurisés et optimisés pour le SEO. C'est ici que votre vision prend vie grâce à un code propre, robuste et évolutif, conçu par des experts passionnés.",
      en: "Technical excellence is our signature. Using Next.js and React, we build ultra-fast, secure, and SEO-optimized sites. This is where your vision comes to life through clean, robust, and scalable code, designed by passionate experts.",
    },
    features: {
      fr: ["Next.js & React", "Optimisation SEO", "Sécurité avancée"],
      en: ["Next.js & React", "SEO Optimization", "Advanced security"]
    }
  },
  {
    title: { fr: "Déploiement & Accompagnement", en: "Deployment & Support" },
    subtitle: { fr: "Lancement et évolution", en: "Launch and evolution" },
    desc: {
      fr: "Le lancement n'est que le début. Nous assurons un déploiement sécurisé sur les meilleurs serveurs mondiaux et nous vous accompagnons dans la durée. Notre objectif est de faire de votre présence web un moteur de croissance continue pour votre entreprise en Afrique.",
      en: "The launch is just the beginning. We ensure a secure deployment on the world's best servers and we support you over time. Our goal is to make your web presence a continuous growth engine for your business in Africa.",
    },
    features: {
      fr: ["Hébergement Cloud", "Maintenance", "Support continu"],
      en: ["Cloud Hosting", "Maintenance", "Continuous support"]
    }
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

      <div className="grid gap-8 place-items-center md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex w-full justify-center"
          >
            <CardFlip
              title={step.title[locale]}
              subtitle={step.subtitle[locale]}
              description={step.desc[locale]}
              features={step.features[locale]}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
