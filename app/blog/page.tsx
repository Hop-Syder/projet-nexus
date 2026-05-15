/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Liste des articles de blog (Rendu Serveur)
 * @created 2024-05-15
 */
import { getAllPosts } from "@/lib/blog";
import { SiteBackground } from "@/components/site-background";
import { BlogList } from "@/components/blog-list";

export const metadata = {
  title: "Blog | Nexus Partners",
  description: "Actualités, conseils et expertises sur le digital en Afrique.",
};

export default function BlogPage() {
  const posts = getAllPosts().map(post => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    author: post.author,
    excerpt: post.excerpt,
    category: post.category,
    coverImage: post.coverImage
  }));

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

        <BlogList posts={posts} />
      </div>
    </main>
  );
}
