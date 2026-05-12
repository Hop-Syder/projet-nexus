/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Section FAQ optimisée pour le SEO (Bénin, Afrique, Développeur Africain)
 * @created 2024-05-12
 * @updated 2024-05-12
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
// ──────────────────────────────────
"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: {
      fr: "Je cherche un site web au Bénin, comment procéder ?",
      en: "I'm looking for a website in Benin, how to proceed?",
    },
    a: {
      fr: "Pour créer un site web au Bénin, Nexus Partners vous accompagne de A à Z. Nous concevons des interfaces modernes et performantes adaptées au marché local et international.",
      en: "To create a website in Benin, Nexus Partners supports you from A to Z. We design modern and high-performance interfaces adapted to the local and international market.",
    },
  },
  {
    q: {
      fr: "Quel développeur africain peut me créer un site web ?",
      en: "Which African developer can create a website for me?",
    },
    a: {
      fr: "Si vous voulez un développeur africain expert, Nexus Partners est votre partenaire de choix. Notre équipe basée en Afrique maîtrise les technologies les plus avancées (Next.js, React) pour des résultats de classe mondiale. Nous ne nous contentons pas de coder, nous construisons des outils de croissance robustes pour votre business.",
      en: "If you want an expert African developer, Nexus Partners is your partner of choice. Our Africa-based team masters the most advanced technologies (Next.js, React) for world-class results. We don't just code, we build robust growth tools for your business.",
    },
  },
  {
    q: {
      fr: "Comment choisir la meilleure agence digitale au Bénin ?",
      en: "How to choose the best digital agency in Benin?",
    },
    a: {
      fr: "Le choix d'un partenaire au Bénin repose sur trois piliers : l'expertise technique, la transparence des tarifs et la qualité du portfolio. Nexus Partners coche toutes ces cases en proposant une exécution haut de gamme accessible à tous les entrepreneurs qui visent l'excellence.",
      en: "Choosing a partner in Benin relies on three pillars: technical expertise, pricing transparency, and portfolio quality. Nexus Partners checks all these boxes by offering high-end execution accessible to all entrepreneurs aiming for excellence.",
    },
  },
  {
    q: {
      fr: "Est-il possible de créer un site e-commerce performant en Afrique ?",
      en: "Is it possible to create a high-performance e-commerce site in Africa?",
    },
    a: {
      fr: "Absolument. Grâce à des architectures modernes comme Next.js, nous créons des boutiques en ligne ultra-rapides qui fonctionnent parfaitement même avec des connexions mobiles limitées. Un développeur africain au Bénin saura optimiser chaque kilo-octet pour garantir une conversion maximale sur le continent.",
      en: "Absolutely. Thanks to modern architectures like Next.js, we create ultra-fast online stores that work perfectly even with limited mobile connections. An African developer in Benin will know how to optimize every kilobyte to ensure maximum conversion on the continent.",
    },
  },
  {
    q: {
      fr: "Pourquoi choisir Nexus Partners pour un projet en Afrique ?",
      en: "Why choose Nexus Partners for a project in Africa?",
    },
    a: {
      fr: "Choisir un développeur africain, c'est bénéficier d'une compréhension fine des réalités du continent tout en exigeant une qualité d'exécution internationale. Nous transformons les défis locaux en opportunités digitales grâce à notre signature visuelle et technique unique.",
      en: "Choosing an African developer means benefiting from a deep understanding of the continent's realities while demanding international quality of execution. We transform local challenges into digital opportunities through our unique visual and technical signature.",
    },
  },
];

export function FaqSection({ locale = "fr" }: { locale?: "fr" | "en" }) {
  return (
    <section className="py-24">
      <div className="mb-16 text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
          {locale === "fr" ? "Expertise & SEO" : "Expertise & SEO"}
        </h2>
        <p className="mt-4 text-muted-foreground">
          {locale === "fr" ? "Réponses à vos questions sur le développement web en Afrique." : "Answers to your questions about web development in Africa."}
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm"
          >
            <div className="flex gap-4">
              <HelpCircle className="size-6 shrink-0 text-primary" />
              <div>
                <h3 className="mb-2 font-heading text-lg font-bold">
                  {faq.q[locale]}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {faq.a[locale]}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
