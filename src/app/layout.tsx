import type { Metadata, Viewport } from "next";

import { Background } from "~/components/background";
import { Providers } from "~/components/providers";
import { SiteFooter } from "~/components/site-footer";
import { SiteHeader } from "~/components/site-header";
import { fonts } from "~/config/fonts";
import { siteConfig } from "~/config/site";

import "~/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Quiz", "Quiz App", "Quiz Game", "Quiz Game App"],
  authors: [{ name: "Fellipe Utaka", url: "https://fellipeutaka.vercel.app" }],
  creator: "Fellipe Utaka",
  publisher: "Fellipe Utaka",
  robots: "index, follow",
  applicationName: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@fellipeutaka",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className="selection:bg-cyan-5 selection:text-cyan-12 motion-safe:scroll-smooth"
      suppressHydrationWarning={true}
    >
      <body
        className="grid min-h-screen grid-rows-[3.5rem,1fr,min-content] bg-gradient-to-b from-background to-card text-foreground antialiased"
        style={fonts.sans.style}
      >
        <Providers>
          <SiteHeader />
          {children}
          <Background />
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
