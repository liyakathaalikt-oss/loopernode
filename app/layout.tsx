import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono, Gabarito } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { CookieConsent } from "@/components/ui/cookie-consent";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://loopernode.in"),
  title: {
    default: "Loopernode — Enterprise AI Data Services",
    template: "%s | Loopernode",
  },
  description:
    "Loopernode provides enterprise-grade AI data services including data collection, annotation, labeling, and processing for machine learning teams worldwide.",
  keywords: [
    "AI data services",
    "data annotation",
    "data labeling",
    "machine learning",
    "data collection",
    "RLHF",
    "computer vision",
    "NLP",
    "enterprise AI",
  ],
  authors: [{ name: "Loopernode" }],
  creator: "Loopernode",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://loopernode.in",
    siteName: "Loopernode",
    title: "Loopernode — Enterprise AI Data Services",
    description:
      "Enterprise-grade AI data services including data collection, annotation, labeling, and processing.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Loopernode",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loopernode — Enterprise AI Data Services",
    description:
      "Enterprise-grade AI data services including data collection, annotation, labeling, and processing.",
    images: ["/og-image.png"],
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
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} ${gabarito.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen flex flex-col bg-dark-950 text-slate-50 font-sans antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <CookieConsent />
      </body>
    </html>
  );
}
