import { SiteBackground } from "@/components/site-background";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://projets.nexus-partners.xyz"),
  title: {
    default: "Nexus Partners — Développeur Web au Bénin & Afrique",
    template: "%s | Nexus Partners"
  },
  description:
    "Développeur web expert au Bénin. Nexus Partners crée des sites web premium, applications mobiles et solutions digitales haute performance pour l'Afrique et l'international.",
  keywords: [
    "développeur web bénin",
    "création site web cotonou",
    "agence digitale bénin",
    "développeur africain",
    "expert nextjs afrique",
    "portfolio nexus partners",
    "développement application mobile bénin",
    "site vitrine professionnel",
    "e-commerce bénin",
  ],
  authors: [{ name: "@hopsyder", url: "https://ceo.nexuspartners.xyz" }],
  creator: "Nexus Partners",
  openGraph: {
    type: "website",
    locale: "fr_BJ",
    url: "https://projets.nexus-partners.xyz",
    siteName: "Nexus Partners",
    title: "Nexus Partners — Excellence Web au Bénin",
    description: "Des interfaces qui vendent. Découvrez notre catalogue de solutions web premium conçues au Bénin.",
    images: [
      {
        url: "/og-image.png", // À vérifier si l'image existe, sinon j'en créerai une
        width: 1200,
        height: 630,
        alt: "Nexus Partners — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Partners — Développeur Web au Bénin",
    description: "Expertise Next.js & UI/UX premium au service de votre croissance en Afrique.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://projets.nexus-partners.xyz",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${archivo.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Script
          async
          src="/metrics/gtag/js?id=G-VZ33YTZTTS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-VZ33YTZTTS', {
              'transport_url': 'https://projets.nexus-partners.xyz/metrics',
              'first_party_collection': true
            });
            gtag('config', 'GT-NN6KRTXK', {
              'transport_url': 'https://projets.nexus-partners.xyz/analytics',
              'first_party_collection': true
            });
          `}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SiteBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
