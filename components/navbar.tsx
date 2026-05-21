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
import { Home, FileText, Search, FolderOpen } from "lucide-react";
import { LanguageToggle } from "./language-toggle";
import { ModeToggle } from "./mode-toggle";

const navItems = [
  { name: "Accueil", nameEn: "Home", href: "/", icon: Home },
  { name: "Projets", nameEn: "Projects", href: "/projets", icon: FolderOpen },
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
            <span className="font-bold text-xl tracking-tight hidden sm:block">
              Nexus<span className="text-accent">Partners</span>
            </span>
          </Link>
        </div>

        {/* Menu Central */}
        <div className="pointer-events-auto flex items-center justify-center">
          <div className="flex items-center justify-between overflow-hidden rounded-xl bg-background/20 backdrop-blur-md border border-border/50 shadow-xl shadow-black/5">
            {navItems.map((item, index, array) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              const isFirst = index === 0;
              const isLast = index === array.length - 1;
              const prevItem = index > 0 ? array[index - 1] : null;
              const nextItem = index < array.length - 1 ? array[index + 1] : null;

              const isPrevActive = prevItem
                ? prevItem.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(prevItem.href)
                : false;

              const isNextActive = nextItem
                ? nextItem.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(nextItem.href)
                : false;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-center gap-2 bg-foreground p-2 px-5 text-sm text-background transition-all duration-300 hover:opacity-90",
                    isActive
                      ? "mx-1.5 rounded-xl font-semibold bg-primary text-primary-foreground"
                      : cn(
                          (isPrevActive || isFirst) && "rounded-l-xl",
                          (isNextActive || isLast) && "rounded-r-xl"
                        )
                  )}
                >
                  <item.icon className="size-4" />
                  <span>{locale === "fr" ? item.name : item.nameEn}</span>
                </Link>
              );
            })}
          </div>
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

          <div className="hidden md:block">
            <LanguageToggle locale={locale} onToggle={handleLanguageToggle} />
          </div>
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Language Toggle - Floating Middle Left */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-[60] md:hidden pointer-events-auto"
      >
        <LanguageToggle 
          locale={locale} 
          onToggle={handleLanguageToggle} 
          orientation="vertical"
          className="rounded-l-none border-l-0 bg-background/40 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] border-y border-r border-border/40 hover:bg-background/60 transition-all active:scale-95"
        />
      </motion.div>
    </nav>
  );
}
