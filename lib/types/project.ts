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
  title: string;
  thumbnail: string;
  largeImage: string;
  stack: string[];
  description: string;
  projectUrl: string;
  estimatedPrice: string;
  imageMode?: "cover" | "contain";
}
