"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LanguageToggle({
  locale,
  onToggle,
  className,
}: {
  locale: "fr" | "en";
  onToggle: () => void;
  className?: string;
}) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "h-8 rounded-xl border border-border/60 px-3 font-mono text-[11px] uppercase tracking-[0.18em]",
        className
      )}
      aria-label={
        locale === "fr"
          ? "Basculer la langue en anglais"
          : "Switch language to French"
      }
      onClick={onToggle}
    >
      <span className={cn(locale === "fr" ? "text-foreground" : "text-muted-foreground")}>
        FR
      </span>
      <span className="mx-1 text-border">/</span>
      <span className={cn(locale === "en" ? "text-foreground" : "text-muted-foreground")}>
        EN
      </span>
    </Button>
  );
}
