/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Liste animée des articles de blog (Client Component)
 * @created 2024-05-15
 */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  category: string;
  coverImage: string;
}

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link 
          key={post.slug} 
          href={`/blog/${post.slug}`}
          className="group/blog relative flex flex-col h-full rounded-2xl p-[1.5px] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2"
        >
          {/* Bordure Animée (Rotating Light Yellow) */}
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl opacity-0 group-hover/blog:opacity-100 transition-opacity duration-700">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{
                background: "conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 70%, #FBBF24 100%)",
              }}
              className="absolute inset-[-200%] h-[500%] w-[500%]"
            />
          </div>

          {/* Contenu de la carte avec fond sombre */}
          <div className="flex flex-col h-full rounded-[14px] bg-card/95 backdrop-blur-sm overflow-hidden transition-colors group-hover/blog:bg-card/98">
            {/* Thumbnail */}
            <div className="relative aspect-[16/13] w-full overflow-hidden border-b border-border/50">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover/blog:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-60" />
              {/* Badge Catégorie */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-background/90 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20 shadow-lg">
                {post.category}
              </div>
            </div>

            <div className="p-4 flex flex-col h-full">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[9px] text-muted-foreground font-mono uppercase tracking-widest">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="size-3" />
                    {post.author}
                  </span>
                </div>

                <h2 className="text-lg font-bold group-hover/blog:text-primary transition-colors leading-tight line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground/80 leading-normal line-clamp-2">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 mt-auto flex items-center gap-2 text-sm font-bold text-primary group/link">
                <span className="relative">
                  Lire l'article
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/link:w-full" />
                </span>
                <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>
      ))}

      {posts.length === 0 && (
        <div className="col-span-full text-center py-20">
          <p className="text-muted-foreground italic">Aucun article publié pour le moment.</p>
        </div>
      )}
    </section>
  );
}
