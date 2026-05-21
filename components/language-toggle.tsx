"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LanguageToggle({
  locale,
  onToggle,
  className,
  orientation = "horizontal",
}: {
  locale: "fr" | "en";
  onToggle: () => void;
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  const isVertical = orientation === "vertical";

  return (
    <Button
      variant="ghost"
      className={cn(
        "rounded-xl border border-border/60 font-mono text-[11px] uppercase tracking-[0.18em] flex items-center justify-center transition-all",
        isVertical 
          ? "flex-col h-auto py-4 px-2 gap-2 w-10" 
          : "flex-row h-8 px-3 gap-0",
        className
      )}
      aria-label={
        locale === "fr"
          ? "Basculer la langue en anglais"
          : "Switch language to French"
      }
      onClick={onToggle}
    >
      <span className={cn(
        "transition-colors",
        locale === "fr" ? "text-foreground font-bold" : "text-muted-foreground"
      )}>
        FR
      </span>
      
      {!isVertical && <span className="mx-1 text-border">/</span>}
      
      <span className={cn(
        "transition-colors",
        locale === "en" ? "text-foreground font-bold" : "text-muted-foreground"
      )}>
        EN
      </span>
    </Button>
  );
}
