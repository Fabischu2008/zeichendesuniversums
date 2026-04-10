import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  FAVICON_QUERY,
  SITE_DESCRIPTION,
  SITE_NAME,
  THEME_COLOR,
} from "@/lib/brand";
import { getSiteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(getSiteUrl()),
  icons: {
    icon: [
      {
        url: `/favicon.svg?${FAVICON_QUERY}`,
        type: "image/svg+xml",
        sizes: "any",
      },
      {
        url: `/favicon.jpg?${FAVICON_QUERY}`,
        type: "image/jpeg",
        sizes: "1024x1024",
      },
    ],
    apple: [
      {
        url: `/favicon.jpg?${FAVICON_QUERY}`,
        type: "image/jpeg",
        sizes: "180x180",
      },
    ],
    shortcut: [`/favicon.svg?${FAVICON_QUERY}`],
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "de_DE",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-dvh bg-background text-foreground">{children}</div>
      </body>
    </html>
  );
}
