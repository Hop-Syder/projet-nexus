/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Écran de chargement (Preloader) avec animation Lottie
 * @created 2024-05-12
 * @updated 2024-05-12
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
// ──────────────────────────────────
"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";

export function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <div className="relative size-64 md:size-80 lg:size-96">
        <DotLottieReact
          src="https://lottie.host/6dcfe6d0-8c21-4ec4-a42d-8669611d286a/9ZPaAXgNnG.lottie"
          loop
          autoplay
        />
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
          Nexus Partners
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Chargement de l'expérience...
        </p>
      </motion.div>
    </motion.div>
  );
}
