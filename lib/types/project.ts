/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Définition du type Project pour le catalogue
 * @created 2024-05-12
 * @updated 2024-05-12
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
// ──────────────────────────────────
export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string; // ex: "SaaS", "E-commerce"
  date?: string;
  thumbnail: string;
  largeImage: string;
  gallery?: string[];
  stack: string[];
  description: string;
  problem?: string;
  solution?: string;
  impact?: string;
  projectUrl: string;
  estimatedPrice: string;
  imageMode?: "cover" | "contain";
}
