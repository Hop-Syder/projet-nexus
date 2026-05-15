"use client";

import { motion } from "framer-motion";

/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Arrière-plan premium avec orbes de lumière "Aurora" animés
 * @updated 2024-05-15
 */
export function SiteBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background transition-colors duration-700"
      aria-hidden
    >
      {/* Image de Fond Principale (Prototype) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.12] dark:opacity-[0.2] mix-blend-overlay"
        style={{ backgroundImage: "url('/background-prototypes/background.jpg')" }}
      />

      {/* Grille de fond subtile */}
      <div className="grid-pattern absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" />

      {/* Orbes de lumière animés - Partagés */}
      <div className="absolute inset-0">
        {/* Orbe Primaire - Mouvement en 8 */}
        <motion.div
          animate={{
            x: ["-10%", "10%", "-10%"],
            y: ["-10%", "10%", "-10%"],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -left-[10%] top-0 h-[70vh] w-[50vw] rounded-full bg-primary/10 blur-[120px] dark:bg-primary/5"
        />

        {/* Orbe Accent - Mouvement Circulaire inverse */}
        <motion.div
          animate={{
            x: ["10%", "-10%", "10%"],
            y: ["10%", "-10%", "10%"],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -right-[5%] top-[10%] h-[60vh] w-[40vw] rounded-full bg-accent/5 blur-[100px] dark:bg-accent/5"
        />

        {/* Orbe Indigo/Violet */}
        <motion.div
          animate={{
            y: ["20%", "-20%", "20%"],
            x: ["10%", "30%", "10%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute right-[10%] bottom-[20%] h-[40vh] w-[30vw] rounded-full bg-indigo-500/5 blur-[100px] dark:bg-indigo-500/5"
        />
      </div>

      {/* Overlay de grain pour texture premium */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay" />
    </div>
  );
}
