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
              className="group relative flex flex-col h-full rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2"
            >
              {/* Overlay de lumière au survol */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Badge Catégorie */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">
                {post.category}
              </div>

              <div className="p-8 flex flex-col h-full">
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
