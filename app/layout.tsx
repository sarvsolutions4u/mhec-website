import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/instrument-sans";
import "./globals.css";
import { site } from "@/lib/site";


export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} (${site.shortName}) — Qualifications & Skills in Muscat, Oman`,
    template: `%s | ${site.shortName} Muscat`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "university admission Oman",
    "study abroad Oman",
    "skill development courses Oman",
    "pathway programmes Oman",
    "open schooling Oman",
    "corporate training Oman",
    "ACCA online Oman",
    "IELTS online Muscat",
    "Muscat Higher Education Centre",
  ],
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#231F20",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('reveal-ready')" }} />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
