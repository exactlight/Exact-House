import type { Metadata } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

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
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink">
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
