/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Page de détail d'un article de blog — layout avec sidebar articles similaires
 * @created 2026-05-18
 * @updated 2026-05-18
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
// ──────────────────────────────────
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Calendar, User, Clock, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "Article introuvable" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Nexus Partners Blog`,
      description: post.excerpt,
      type: "article",
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630 }]
        : [],
    },
  };
}

// Estimation temps de lecture
function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  // Articles similaires : même catégorie, hors l'actuel
  const allPosts = getAllPosts();
  const similarPosts = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  // Si pas assez dans la même catégorie, compléter avec les plus récents
  const fallbackPosts =
    similarPosts.length < 2
      ? allPosts.filter((p) => p.slug !== slug).slice(0, 3 - similarPosts.length)
      : [];

  const relatedPosts = [...similarPosts, ...fallbackPosts].slice(0, 3);
  const readingTime = estimateReadingTime(post.content || "");

  return (
    <main className="relative min-h-screen pt-28 pb-24 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Retour */}
        <Link
          href="/blog"
          className="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:text-primary mb-10"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Retour au blog
        </Link>

        {/* Layout principal : article + sidebar */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* ── Article ── */}
          <article>
            {/* Header */}
            <header className="mb-10 space-y-5">
              {/* Badge catégorie */}
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                  <Tag className="size-3" />
                  {post.category}
                </span>
              </div>

              {/* Titre */}
              <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-balance">
                {post.title}
              </h1>

              {/* Meta auteur/date/temps */}
              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground font-mono border-y border-border/40 py-4">
                <span className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-full bg-primary/12 ring-1 ring-primary/20">
                    <User className="size-3.5 text-primary" />
                  </span>
                  <span className="font-semibold text-foreground">
                    {post.author}
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-accent" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-accent" />
                  {readingTime} min de lecture
                </span>
              </div>

              {/* Extrait mis en avant */}
              <p className="text-lg leading-relaxed text-muted-foreground border-l-4 border-primary/30 pl-4 italic">
                {post.excerpt}
              </p>
            </header>

            {/* Image de couverture */}
            {post.coverImage && (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 shadow-2xl mb-12">
                <img
                  src={post.coverImage}
                  alt={`Illustration : ${post.title}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              </div>
            )}

            {/* Contenu Markdown rendu */}
            <div className="prose-nexus">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Footer article — CTA */}
            <footer className="mt-16 pt-10 border-t border-border/50">
              <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/8 to-transparent p-8 text-center">
                <h3 className="font-heading text-2xl font-bold mb-3">
                  Vous avez un projet similaire ?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm leading-relaxed">
                  Nexus Partners vous accompagne de la stratégie à la mise en
                  ligne pour faire de votre vision une réalité digitale.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link
                    href="/#order"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5"
                  >
                    Lancer mon projet
                  </Link>
                  <Link
                    href="/blog"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border/60 px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                  >
                    <ArrowLeft className="size-4" />
                    Retour au blog
                  </Link>
                </div>
              </div>
            </footer>
          </article>

          {/* ── Sidebar : Articles similaires ── */}
          <aside className="lg:sticky lg:top-28 lg:self-start space-y-6">
            {relatedPosts.length > 0 && (
              <div className="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm">
                <h3 className="font-heading text-base font-bold mb-5 flex items-center gap-2">
                  <span className="h-4 w-1 rounded-full bg-accent inline-block" />
                  Articles similaires
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group flex gap-3 cursor-pointer rounded-xl border border-border/40 bg-background/40 p-3 transition-all hover:border-primary/25 hover:bg-primary/4"
                    >
                      {related.coverImage && (
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <img
                            src={related.coverImage}
                            alt={related.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[9px] uppercase tracking-wider text-accent mb-1">
                          {related.category}
                        </p>
                        <h4 className="text-xs font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                          {related.title}
                        </h4>
                        <p className="font-mono text-[9px] text-muted-foreground mt-1">
                          {related.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Widget newsletter / CTA contact */}
            <div className="rounded-2xl border border-accent/20 bg-accent/8 p-5">
              <h3 className="font-heading text-base font-bold mb-2">
                On travaille ensemble ?
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Votre projet mérite une expertise premium.
              </p>
              <a
                href="https://wa.me/2290196701733"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full cursor-pointer text-center rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5"
              >
                Discutons sur WhatsApp
              </a>
            </div>

            {/* Navigation entre articles */}
            <div className="rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm">
              <Link
                href="/blog"
                className="group flex cursor-pointer items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                Tous les articles
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
