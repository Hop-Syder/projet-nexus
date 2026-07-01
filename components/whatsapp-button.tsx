/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Bouton WhatsApp flottant pour la conversion directe pendant le scroll
 * @created 2026-07-02
 * @updated 2026-07-02
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
// ──────────────────────────────────
"use client";

import { MessagesSquare } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const whatsappNumber = "2290196701733";

export function WhatsappButton({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const message =
    locale === "fr"
      ? "Bonjour Nexus Partners, j'ai visité votre catalogue et j'aimerais discuter de mon projet web."
      : "Hello Nexus Partners, I visited your portfolio and would like to discuss my web project.";
  const label =
    locale === "fr" ? "Discuter sur WhatsApp" : "Chat on WhatsApp";

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="group fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_35px_-10px_rgba(37,211,102,0.7)] transition-transform hover:scale-105"
        >
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#25D366]/40 motion-reduce:hidden" />
          <MessagesSquare className="relative size-6" />
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg border border-border/60 bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 md:block">
            {label}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
