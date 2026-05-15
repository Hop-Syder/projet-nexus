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
          className="absolute -left-[10%] top-0 h-[70vh] w-[50vw] rounded-full bg-primary/15 blur-[120px] dark:bg-primary/10"
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
          className="absolute -right-[5%] top-[10%] h-[60vh] w-[40vw] rounded-full bg-accent/10 blur-[100px] dark:bg-accent/8"
        />

        {/* Orbe Inférieur - Pulsation lente */}
        <motion.div
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [0.8, 1.1, 0.8],
            x: ["-5%", "5%", "-5%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-10%] left-[20%] h-[50vh] w-[60vw] rounded-full bg-primary/10 blur-[140px] dark:bg-primary/5"
        />
        
        {/* Orbe Indigo/Violet - Ajout de richesse chromatique */}
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
          className="absolute right-[10%] bottom-[20%] h-[40vh] w-[30vw] rounded-full bg-indigo-500/5 blur-[100px] dark:bg-indigo-500/8"
        />
      </div>

      {/* Overlay de grain pour texture premium */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay" />
    </div>
  );
}
