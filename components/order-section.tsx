/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Section formulaire de commande pour Nexus Partners
 * @created 2024-05-12
 * @updated 2024-05-12
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
// ──────────────────────────────────
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Sparkles, MessageCircle } from "lucide-react";

const whatsappNumber = "2290196701733";

const projectTypes = {
  fr: [
    "Site Vitrine",
    "Plateforme E-commerce",
    "Application Web/Mobile",
    "Identité Visuelle & Design",
    "Audit Technique & Conseil",
    "Autre",
  ],
  en: [
    "Showcase Website",
    "E-commerce Platform",
    "Web/Mobile Application",
    "Visual Identity & Design",
    "Technical Audit & Consulting",
    "Other",
  ],
};

export function OrderSection({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const [formData, setFormData] = useState({
    name: "",
    projectType: "",
    budget: "",
    description: "",
  });

  const t = {
    fr: {
      title: "Démarrer un Projet",
      subtitle: "Parlez-nous de votre vision et nous lui donnerons vie.",
      labelName: "Votre nom complet",
      labelType: "Type de projet",
      labelBudget: "Budget indicatif (facultatif)",
      labelDescription: "Description du projet",
      placeholderName: "Jean Dupont",
      placeholderType: "Sélectionnez un type de projet",
      placeholderBudget: "Ex: 500 000 FCFA",
      placeholderDescription: "Ex: Je souhaite créer une plateforme de vente en ligne pour ma boutique de mode avec un design minimaliste et une gestion de stock intégrée...",
      submit: "Envoyer ma demande",
      whatsappHint: "Votre demande sera envoyée directement via WhatsApp.",
    },
    en: {
      title: "Start a Project",
      subtitle: "Tell us about your vision and we will bring it to life.",
      labelName: "Your full name",
      labelType: "Project type",
      labelBudget: "Indicative budget (optional)",
      labelDescription: "Project description",
      placeholderName: "John Doe",
      placeholderType: "Select a project type",
      placeholderBudget: "Ex: $1,000",
      placeholderDescription: "Ex: I want to create an online sales platform for my fashion boutique with a minimalist design and integrated stock management...",
      submit: "Send my request",
      whatsappHint: "Your request will be sent directly via WhatsApp.",
    },
  }[locale];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Bonjour Nexus Partners,
Je m'appelle ${formData.name}.
Je souhaite commander un projet de type : ${formData.projectType}.
Budget indicatif : ${formData.budget || "Non spécifié"}.
Description : ${formData.description}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="order-section" className="py-24 scroll-mt-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3" />
            {locale === "fr" ? "Prêt à passer à l'action ?" : "Ready to act?"}
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t.title}
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            {t.subtitle}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden border-border/60 bg-card/50 backdrop-blur-xl dark:bg-card/30">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="grid gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {t.labelName}
                    </label>
                    <Input
                      required
                      placeholder={t.placeholderName}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {t.labelType}
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="flex h-9 w-full rounded-xl border border-input bg-background/50 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer"
                      >
                        <option value="" disabled>{t.placeholderType}</option>
                        {projectTypes[locale].map((type) => (
                          <option key={type} value={type} className="bg-card text-foreground">
                            {type}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <svg className="size-4 opacity-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {t.labelBudget}
                  </label>
                  <Input
                    placeholder={t.placeholderBudget}
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {t.labelDescription}
                  </label>
                  <Textarea
                    required
                    placeholder={t.placeholderDescription}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-[150px] bg-background/50"
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full h-12 rounded-2xl text-base shadow-lg shadow-primary/20">
                    <MessageCircle className="mr-2 size-5" />
                    {t.submit}
                  </Button>
                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    {t.whatsappHint}
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
