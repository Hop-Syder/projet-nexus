/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Page de détail d'un article de blog (Rendu Serveur)
 * @created 2024-05-15
 */
import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { SiteBackground } from "@/components/site-background";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export default async function PostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative min-h-screen pt-32 pb-20 px-4">
      <SiteBackground />
      
      <article className="mx-auto max-w-4xl">
        {/* Fil d'Ariane / Retour */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Retour au blog
        </Link>

        {/* Header de l'article */}
        <header className="space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            {post.category}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-mono">
            <span className="flex items-center gap-2">
              <Calendar className="size-4 text-primary" />
              {post.date}
            </span>
            <span className="flex items-center gap-2">
              <User className="size-4 text-primary" />
              {post.author}
            </span>
          </div>
        </header>

        {/* Image de couverture (Optionnelle si on veut la charger) */}
        {/* <div className="aspect-video w-full rounded-3xl overflow-hidden mb-16 border border-border/50">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div> */}

        {/* Contenu Markdown */}
        <div className="prose-nexus">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* Footer de l'article / CTA */}
        <footer className="mt-20 pt-10 border-t border-border/50 text-center">
          <h3 className="text-2xl font-bold mb-4">Vous avez un projet similaire ?</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Nexus Partners vous accompagne de la stratégie à la mise en ligne pour faire de votre vision une réalité digitale.
          </p>
          <Link 
            href="/#order" 
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-105 active:scale-95"
          >
            Lancer mon projet maintenant
          </Link>
        </footer>
      </article>
    </main>
  );
}
