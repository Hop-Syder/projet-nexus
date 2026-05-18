/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Liste d'articles filtrée par tag — Client Component avec animations
 * @created 2026-05-18
 * @updated 2026-05-18
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
// ──────────────────────────────────
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag, User, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog";

interface BlogListFilteredProps {
  posts: BlogPost[];
}

const ALL_LABEL = "Tous";

// Estimation du temps de lecture
function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1] as const,
      delay: i * 0.08,
    },
  }),
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.96,
    transition: { duration: 0.25 },
  },
};

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const readingTime = estimateReadingTime(post.content || "");

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      custom={index}
      layout
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/8 cursor-pointer"
      >
        {/* Image de couverture */}
        {post.coverImage && (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted border-b border-border/40">
            {/* Rotating border on hover */}
            <div className="absolute inset-0 -z-10 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{
                  background:
                    "conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 75%, #FBBF24 100%)",
                }}
                className="absolute inset-[-200%] h-[500%] w-[500%]"
              />
            </div>

            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Badge Catégorie */}
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-background/90 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground shadow-sm backdrop-blur-md">
                <Tag className="size-2.5 text-accent" />
                {post.category}
              </span>
            </div>

            {/* Temps de lecture */}
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1 rounded-lg border border-border/50 bg-background/90 px-2.5 py-1 font-mono text-[10px] font-semibold text-muted-foreground backdrop-blur-md shadow-sm">
                <Clock className="size-2.5" />
                {readingTime} min
              </span>
            </div>
          </div>
        )}

        {/* Contenu textuel */}
        <div className="flex flex-1 flex-col p-5">
          {/* Meta */}
          <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="size-3 text-accent" />
              {post.date}
            </span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="flex items-center gap-1">
              <User className="size-3" />
              {post.author}
            </span>
          </div>

          {/* Titre */}
          <h2 className="font-heading text-xl font-bold leading-snug tracking-tight transition-colors group-hover:text-primary line-clamp-2 mb-3">
            {post.title}
          </h2>

          {/* Extrait */}
          <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3 mb-5">
            {post.excerpt}
          </p>

          {/* CTA Lire */}
          <div className="flex items-center gap-2 text-sm font-bold text-primary border-t border-border/40 pt-4">
            <span className="relative">
              Lire l&apos;article
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function BlogListFiltered({ posts }: BlogListFilteredProps) {
  const categories = useMemo(() => {
    const cats = [
      ALL_LABEL,
      ...Array.from(new Set(posts.map((p) => p.category))),
    ];
    return cats;
  }, [posts]);

  const [activeCategory, setActiveCategory] = useState<string>(ALL_LABEL);

  const filteredPosts = useMemo(() => {
    if (activeCategory === ALL_LABEL) return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  return (
    <div>
      {/* ── Filtres par tag ── */}
      <div className="mb-10 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mr-2">
          <Layers className="size-3.5" />
          Thème
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider transition-all duration-200",
              activeCategory === cat
                ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "border-border/60 bg-card/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">
          {filteredPosts.length} article{filteredPosts.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Grille d'articles ── */}
      <AnimatePresence mode="popLayout">
        {filteredPosts.length > 0 ? (
          <motion.div
            key={activeCategory}
            layout
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="col-span-full py-20 text-center"
          >
            <p className="text-muted-foreground italic">
              Aucun article dans cette catégorie pour le moment.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
