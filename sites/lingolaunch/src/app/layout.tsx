import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

/*
 * Content Security Policy shipped in-page so the guarantee travels with the
 * files, even on a dumb static host or offline. The load-bearing directive
 * is `connect-src 'self'`: the app can make network requests only to its own
 * origin (the static bundle) — which has no data-collecting endpoint — and
 * to nowhere else. No external origin is permitted for any resource type, so
 * student names, scores, and recordings have no path off the device.
 *
 * Production hosts should ALSO send this as a real HTTP response header
 * (examples for Netlify/Apache/IIS are in PRIVACY-AND-IT.md).
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "media-src 'self' blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "frame-src 'none'",
  "form-action 'self'",
].join("; ");

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "LingoLaunch — ESL Classroom Companion",
    template: "%s | LingoLaunch",
  },
  description:
    "A daily toolkit for ESL teachers in grades 3–8: word lists, flashcards, sentence games, bingo, a student picker, timers, and conversation prompts — all projectable, no logins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${baloo.variable} h-full antialiased`}>
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content={CONTENT_SECURITY_POLICY}
        />
      </head>
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
