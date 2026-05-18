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

const services = [
  {
    title: { fr: "Développement Web & Apps", en: "Web & App Development" },
    subtitle: { fr: "Sites & Applications modernes", en: "Modern Sites & Apps" },
    desc: {
      fr: "Création de sites web modernes, applications web et mobiles parfaitement adaptées aux besoins des entreprises, startups et institutions.",
      en: "Creation of modern websites, web and mobile applications perfectly tailored to the needs of businesses, startups, and institutions.",
    },
    features: {
      fr: ["Sites vitrines & E-commerce", "Applications sur mesure", "Optimisation SEO & Google", "Intégration WhatsApp/Paiements"],
      en: ["Showcase sites & E-commerce", "Custom applications", "SEO & Google optimization", "WhatsApp/Payments integration"]
    }
  },
  {
    title: { fr: "IA & Automatisation", en: "AI & Automation" },
    subtitle: { fr: "Gagnez en efficacité", en: "Boost your efficiency" },
    desc: {
      fr: "Développement de solutions intelligentes et chatbots IA pour automatiser vos processus et optimiser les tâches chronophages de votre entreprise.",
      en: "Development of intelligent solutions and AI chatbots to automate your processes and optimize time-consuming tasks for your business.",
    },
    features: {
      fr: ["Automatisation WhatsApp", "Chatbots IA personnalisés", "Gestion & analyse de données", "Automatisation administrative"],
      en: ["WhatsApp Automation", "Custom AI Chatbots", "Data management & analysis", "Administrative automation"]
    }
  },
  {
    title: { fr: "Visibilité Google Maps", en: "Google Maps Visibility" },
    subtitle: { fr: "Attirez plus de clients", en: "Attract more clients" },
    desc: {
      fr: "Nous optimisons votre présence sur Google et la création de votre fiche d'établissement pour attirer davantage de clients localement.",
      en: "We optimize your presence on Google and the creation of your business profile to attract more local customers.",
    },
    features: {
      fr: ["Fiche Google Business", "Référencement local", "Ajout de photos & infos", "Optimisation Google Maps"],
      en: ["Google Business Profile", "Local SEO", "Photos & info updates", "Google Maps optimization"]
    }
  },
  {
    title: { fr: "Installation Électrique", en: "Electrical Installation" },
    subtitle: { fr: "Solutions techniques fiables", en: "Reliable technical solutions" },
    desc: {
      fr: "Conception et mise en place de solutions électriques fiables, sécurisées et intelligentes pour les espaces résidentiels et professionnels.",
      en: "Design and implementation of reliable, secure, and smart electrical solutions for residential and professional spaces.",
    },
    features: {
      fr: ["Résidentiel & Professionnel", "Maintenance & Dépannage", "Sécurisation des locaux", "Domotique & Smart Home"],
      en: ["Residential & Professional", "Maintenance & Repair", "Premises security", "Smart Home & Automation"]
    }
  },
  {
    title: { fr: "Marketing Digital & Com", en: "Digital Marketing & PR" },
    subtitle: { fr: "Développez votre marque", en: "Grow your brand" },
    desc: {
      fr: "Développement de votre présence digitale et de votre image de marque à travers des campagnes publicitaires ciblées et des contenus engageants.",
      en: "Development of your digital presence and brand image through targeted advertising campaigns and engaging content.",
    },
    features: {
      fr: ["Gestion des réseaux sociaux", "Création de contenus & visuels", "Branding & identité visuelle", "Stratégie & Publicité digitale"],
      en: ["Social media management", "Content & visual creation", "Branding & visual identity", "Strategy & Digital advertising"]
    }
  },
  {
    title: { fr: "Formation Tech", en: "Tech Training" },
    subtitle: { fr: "Technologies du futur", en: "Future technologies" },
    desc: {
      fr: "Formation des jeunes, entrepreneurs et professionnels aux compétences technologiques incontournables pour exceller dans le monde de demain.",
      en: "Training youth, entrepreneurs, and professionals in the essential technological skills to excel in tomorrow's world.",
    },
    features: {
      fr: ["Intelligence artificielle", "Développement web/app", "Marketing digital & Data", "Électricité & Domotique"],
      en: ["Artificial intelligence", "Web/app development", "Digital marketing & Data", "Electricity & Automation"]
    }
  },
];

export function ProcessSection({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const t = {
    fr: {
      title: "Nos Expertises & Services",
      subtitle: "Des solutions sur mesure pour accélérer votre croissance.",
    },
    en: {
      title: "Our Expertise & Services",
      subtitle: "Tailored solutions to accelerate your growth.",
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

      <div className="grid gap-8 place-items-center md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex w-full justify-center"
          >
            <CardFlip
              title={service.title[locale]}
              subtitle={service.subtitle[locale]}
              description={service.desc[locale]}
              features={service.features[locale]}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
