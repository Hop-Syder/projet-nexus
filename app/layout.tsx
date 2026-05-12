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
  title: "Nexus Partners — Catalogue de projets web",
  description:
    "Catalogue officiel Nexus Partners : réalisations web, stacks techniques et fourchettes tarifaires (nexus-partners.xyz).",
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
      <head>
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
          `}
        </Script>
      </head>
      <body className="flex min-h-full flex-col">
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
