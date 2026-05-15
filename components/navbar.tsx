/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Barre de navigation premium avec effet glassmorphism
 * @created 2024-05-15
 */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, FileText } from "lucide-react";
import { LanguageToggle } from "./language-toggle";
import { ModeToggle } from "./mode-toggle";

const navItems = [
  { name: "Accueil", nameEn: "Home", href: "/", icon: Home },
  { name: "Blog", nameEn: "Blog", href: "/blog", icon: FileText },
];

export function Navbar() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<"fr" | "en">("fr");

  useEffect(() => {
    const saved = window.localStorage.getItem("nexus-partners-locale");
    if (saved === "en" || saved === "fr") {
      setLocale(saved);
    }
  }, []);

  const handleLanguageToggle = () => {
    const newLocale = locale === "fr" ? "en" : "fr";
    setLocale(newLocale);
    window.localStorage.setItem("nexus-partners-locale", newLocale);
    // On recharge pour que les composants serveur/statiques se mettent à jour
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 z-50 w-full px-4 pt-6 pointer-events-none">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Logo / Nom */}
        <div className="pointer-events-auto">
          <Link href="/" className="group flex items-center gap-2">
            <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
              N
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">
              Nexus<span className="text-primary">Partners</span>
            </span>
          </Link>
        </div>

        {/* Menu Central */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-full bg-background/40 border border-border/50 backdrop-blur-md shadow-xl shadow-black/5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-full flex items-center gap-2",
                  isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}
                <item.icon className={cn("size-4 relative z-10", isActive && "text-primary-foreground")} />
                <span className="relative z-10">{locale === "fr" ? item.name : item.nameEn}</span>
              </Link>
            );
          })}
        </div>

        {/* Actions Droite */}
        <div className="pointer-events-auto flex items-center gap-2">
          <LanguageToggle locale={locale} onToggle={handleLanguageToggle} />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
