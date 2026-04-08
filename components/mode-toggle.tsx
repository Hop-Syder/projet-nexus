"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ModeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useIsClient();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("relative shrink-0", className)}
      aria-label="Basculer le thème clair ou sombre"
      disabled={!isClient}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="size-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
