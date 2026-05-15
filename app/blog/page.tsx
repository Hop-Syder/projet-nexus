/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Liste des articles de blog (Rendu Serveur)
 * @created 2024-05-15
 */
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { SiteBackground } from "@/components/site-background";
import { ArrowRight, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";

export const metadata = {
  title: "Blog | Nexus Partners",
  description: "Actualités, conseils et expertises sur le digital en Afrique.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="relative min-h-screen pt-32 pb-20 px-4">
      <SiteBackground />
      
      <div className="mx-auto max-w-6xl space-y-16">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight">
            Nexus <span className="text-primary italic">Blog</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            L'expertise web au service de la croissance africaine. Stratégies, tutoriels et visions technologiques.
          </p>
        </header>

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
              <div className="flex flex-col h-full rounded-[14px] bg-card/95 backdrop-blur-sm p-8 transition-colors group-hover/blog:bg-card/98">
                {/* Badge Catégorie */}
                <div className="mb-6 inline-flex w-fit px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">
                  {post.category}
                </div>
                <div className="space-y-4 flex-grow">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="size-3.5" />
                      {post.author}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-auto flex items-center gap-2 text-sm font-bold text-primary">
                  Lire l'article
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </section>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground italic">Aucun article publié pour le moment.</p>
          </div>
        )}
      </div>
    </main>
  );
}
