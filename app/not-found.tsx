/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Page d'erreur 404 personnalisée
 * @created 2024-05-12
 * @updated 2024-05-12
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
// ──────────────────────────────────
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="font-heading text-9xl font-bold text-primary/20">404</h1>
      <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-4xl">
        Page non trouvée
      </h2>
      <p className="mt-4 text-muted-foreground">
        Désolé, nous n'avons pas pu trouver la page que vous recherchez.
      </p>
      <div className="mt-10">
        <Button className="rounded-full">
          <Link href="/" className="inline-flex items-center gap-2">
            <ArrowLeft className="size-4" />
            Retour au catalogue
          </Link>
        </Button>
      </div>
    </div>
  );
}
