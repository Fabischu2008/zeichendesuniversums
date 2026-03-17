import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Zeichen des Universums",
    template: "%s · Zeichen des Universums",
  },
  description:
    "Sternzeichen-Guide, Tools und Readings – finde dein wahres Sternzeichen-Potenzial.",
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    type: "website",
    siteName: "Zeichen des Universums",
    title: "Zeichen des Universums",
    description:
      "Sternzeichen-Guide, Tools und Readings – finde dein wahres Sternzeichen-Potenzial.",
    url: "/",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zeichen des Universums",
    description:
      "Sternzeichen-Guide, Tools und Readings – finde dein wahres Sternzeichen-Potenzial.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-dvh bg-background text-foreground">
          <SiteHeader />
          <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
