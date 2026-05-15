/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Palette de commande Cmd+K pour une navigation rapide
 * @created 2024-05-15
 */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { 
  Search, 
  FileText, 
  Briefcase, 
  Languages, 
  Moon, 
  Sun, 
  Laptop,
  ArrowRight
} from "lucide-react";
import { useTheme } from "next-themes";
import projectsData from "@/data/projects.json";
import { cn } from "@/lib/utils";

interface CommandMenuProps {
  posts: { slug: string; title: string; category: string }[];
}

export function CommandMenu({ posts }: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  // Écoute du raccourci clavier
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 backdrop-blur-sm bg-background/40"
      >
        <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border/50 bg-background/80 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center border-b border-border/50 px-4 py-3">
            <Search className="mr-3 h-5 w-5 text-muted-foreground" />
            <Command.Input
              placeholder="Que cherchez-vous ?"
              className="flex h-10 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <Command.List className="max-h-[350px] overflow-y-auto p-2 scrollbar-none">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              Aucun résultat trouvé.
            </Command.Empty>

            <Command.Group heading="Projets" className="px-2 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {projectsData.map((project: any) => (
                <Command.Item
                  key={project.id}
                  onSelect={() => runCommand(() => router.push(`/#${project.id}`))}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                >
                  <Briefcase className="h-4 w-4" />
                  <div className="flex flex-col">
                    <span>{project.title}</span>
                    <span className="text-[10px] text-muted-foreground line-clamp-1">{project.stack.join(", ")}</span>
                  </div>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator className="h-px bg-border/50 my-2" />

            <Command.Group heading="Blog" className="px-2 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {posts.map((post) => (
                <Command.Item
                  key={post.slug}
                  onSelect={() => runCommand(() => router.push(`/blog/${post.slug}`))}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
                >
                  <FileText className="h-4 w-4" />
                  <span>{post.title}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator className="h-px bg-border/50 my-2" />

            <Command.Group heading="Système" className="px-2 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <Command.Item
                onSelect={() => runCommand(() => setTheme("light"))}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
              >
                <Sun className="h-4 w-4" />
                <span>Mode Clair</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setTheme("dark"))}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
              >
                <Moon className="h-4 w-4" />
                <span>Mode Sombre</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setTheme("system"))}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-primary/10 hover:text-primary transition-colors aria-selected:bg-primary/10 aria-selected:text-primary"
              >
                <Laptop className="h-4 w-4" />
                <span>Thème Système</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between border-t border-border/50 bg-muted/30 px-4 py-3 text-[10px] text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><kbd className="rounded bg-border/50 px-1">↑↓</kbd> Naviguer</span>
              <span className="flex items-center gap-1"><kbd className="rounded bg-border/50 px-1">↵</kbd> Sélectionner</span>
            </div>
            <span className="flex items-center gap-1"><kbd className="rounded bg-border/50 px-1">esc</kbd> Fermer</span>
          </div>
        </div>
      </Command.Dialog>
    </>
  );
}
