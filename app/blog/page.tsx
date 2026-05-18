/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Page liste blog enrichie — filtres par tag, grille animée (Rendu Serveur)
 * @created 2026-05-18
 * @updated 2026-05-18
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
// ──────────────────────────────────
import { getAllPosts } from "@/lib/blog";
import { BlogListFiltered } from "@/components/blog-list-filtered";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Expertise Digitale en Afrique",
  description:
    "Actualités, stratégies et expertises sur le digital en Afrique. Conseils pratiques en développement web, design UI/UX, IA et business digital au Bénin.",
  openGraph: {
    title: "Nexus Partners Blog — L'expertise web africaine",
    description:
      "Articles sur le développement web, le design premium et l'intelligence artificielle en Afrique.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="relative min-h-screen pt-32 pb-24 px-4">
      <div className="mx-auto max-w-6xl">
        {/* ── Header Hero minimal ── */}
        <header className="mb-16 md:mb-20">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.35em] text-accent mb-4">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
            Nexus Partners — Insights
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent/90" />
          </p>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6">
            Nexus{" "}
            <span className="text-gradient-brand italic">Blog</span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            L&apos;expertise web au service de la croissance africaine. Stratégies
            digitales, tutoriels techniques et visions technologiques pour
            entrepreneurs et développeurs en Afrique.
          </p>

          {/* Stat Articles */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm px-4 py-2.5">
              <span className="font-heading text-2xl font-bold text-primary">
                {posts.length}
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">
                Article{posts.length > 1 ? "s" : ""} publié
                {posts.length > 1 ? "s" : ""}
              </p>
            </div>
            {posts.length > 0 && (
              <div className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm px-4 py-2.5">
                <span className="font-heading text-2xl font-bold text-accent">
                  {new Set(posts.map((p) => p.category)).size}
                </span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Thématiques
                </p>
              </div>
            )}
          </div>
        </header>

        {/* ── Blog liste avec filtres (Client) ── */}
        <BlogListFiltered posts={posts} />
      </div>
    </main>
  );
}
