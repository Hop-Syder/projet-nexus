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
import { Home, FileText, Search } from "lucide-react";
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
              Nexus<span className="text-accent">Partners</span>
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
          {/* Recherche / Cmd+K */}
          <button 
            onClick={() => {
              const event = new KeyboardEvent("keydown", { key: "k", metaKey: true });
              document.dispatchEvent(event);
            }}
            className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-xl border border-border/50 bg-background/20 hover:bg-background/40 hover:border-primary/30 transition-all group/search"
          >
            <Search className="size-4 text-muted-foreground group-hover/search:text-primary" />
            <span className="text-[11px] font-mono text-muted-foreground">Rechercher...</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>

          <LanguageToggle locale={locale} onToggle={handleLanguageToggle} />
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
