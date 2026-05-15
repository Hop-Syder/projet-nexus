"use client";

import { motion } from "framer-motion";

/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Arrière-plan premium avec orbes de lumière "Aurora" animés
 * @updated 2024-05-15
 */
const techIcons = [
  { src: "/background-prototypes/availability-svgrepo-com.svg", pos: { top: "5%", left: "30%" }, size: 90, duration: 32 },
  { src: "/background-prototypes/cloud-acceleration-svgrepo-com.svg", pos: { top: "45%", right: "2%" }, size: 160, duration: 40 },
  { src: "/background-prototypes/dns-svgrepo-com.svg", pos: { bottom: "12%", right: "40%" }, size: 100, duration: 25 },
  { src: "/background-prototypes/host-record-svgrepo-com.svg", pos: { top: "60%", left: "8%" }, size: 130, duration: 35 },
  { src: "/background-prototypes/intelligent-positioning-svgrepo-com.svg", pos: { bottom: "45%", right: "15%" }, size: 110, duration: 30 },
  { src: "/background-prototypes/safe-and-stable-svgrepo-com.svg", pos: { top: "15%", right: "25%" }, size: 120, duration: 28 },
];

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

      {/* Éléments Technologiques Flottants (SVG Prototypes) */}
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.25]">
        {techIcons.map((icon, index) => (
          <motion.img
            key={index}
            src={icon.src}
            alt=""
            className="grayscale invert dark:invert-0 brightness-0 dark:brightness-100"
            style={{
              position: "absolute",
              width: icon.size,
              height: icon.size,
              ...icon.pos,
              filter: "none",
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 30, 0],
              rotate: [0, 20, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: icon.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Overlay de grain pour texture premium */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay" />
    </div>
  );
}
