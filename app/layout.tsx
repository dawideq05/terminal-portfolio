import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Dawid Kubiak - AI Automation & Data Analyst",
  description: "Interactive portfolio of Dawid Kubiak, focused on AI automation, data analysis, and banking technology.",
  applicationName: "Dawid Kubiak | Portfolio",
  alternates: { canonical: "/" },
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Dawid Kubiak - AI Automation & Data Analyst",
    description: "Explore Dawid's work in AI automation, data analysis, and banking technology.",
    url: "/",
    siteName: "Dawid Kubiak | Portfolio",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Dawid Kubiak - AI Automation & Data Analyst" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Dawid Kubiak - AI Automation & Data Analyst",
    description: "Explore Dawid's work in AI automation, data analysis, and banking technology.",
    images: ["/opengraph-image"]
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
