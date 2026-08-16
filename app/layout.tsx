import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { CookieConsent } from "@/components/ui/cookie-consent";
import Script from "next/script";
import { generateKeywords } from "@/app/config/seo-keywords";

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



export const metadata: Metadata = {
  metadataBase: new URL("https://loopernode.in"),
  title: {
    default: "Loopernode — Enterprise AI Data Services",
    template: "%s | Loopernode",
  },
  description:
    "Loopernode provides enterprise-grade AI data services including data collection, annotation, labeling, and processing for machine learning teams worldwide.",
  keywords: generateKeywords('home'),
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



import { generateOrganizationSchema, generateLocalBusinessSchema } from "@/lib/schema";

import { ConditionalLayout } from "@/components/layout/conditional-layout";
import { SmoothScrollProvider } from "@/components/ui/smooth-scroll-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable}`}
    >
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-DMJ9QJNEEG"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-DMJ9QJNEEG');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-dark-950 text-slate-50 font-sans antialiased">
        <SmoothScrollProvider>
          <ConditionalLayout
            header={<Header />}
            footer={<Footer />}
            extras={
              <>
                <BackToTop />
                <CookieConsent />
              </>
            }
          >
            {children}
          </ConditionalLayout>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
