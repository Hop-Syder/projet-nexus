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
  metadataBase: new URL("https://nexus-partners.xyz"),
  title: "Nexus Partners — Développeur Web au Bénin & Afrique",
  description:
    "Vous cherchez un développeur africain pour créer votre site web au Bénin ou en Afrique ? Nexus Partners réalise vos projets digitaux premium avec expertise et performance.",
  keywords: [
    "développeur web bénin",
    "site web bénin",
    "développeur africain",
    "création site web afrique",
    "expert nextjs bénin",
    "agence digitale cotonou",
  ],
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
          src="https://www.googletagmanager.com/gtag/js?id=G-VZ33YTZTTS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-VZ33YTZTTS');
            gtag('config', 'GT-NN6KRTXK');
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
