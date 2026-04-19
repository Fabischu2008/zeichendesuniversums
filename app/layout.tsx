import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  FAVICON_QUERY,
  SITE_DESCRIPTION,
  SITE_NAME,
  SOCIAL_PREVIEW_IMAGE,
  SOCIAL_PREVIEW_IMAGE_SIZE,
  THEME_COLOR,
} from "@/lib/brand";
import { absoluteUrl, getSiteUrl } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

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
    url: absoluteUrl("/"),
    locale: "de_DE",
    images: [
      {
        url: absoluteUrl(SOCIAL_PREVIEW_IMAGE),
        ...SOCIAL_PREVIEW_IMAGE_SIZE,
        alt: SITE_NAME,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl(SOCIAL_PREVIEW_IMAGE)],
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
        <Analytics />
      </body>
    </html>
  );
}
