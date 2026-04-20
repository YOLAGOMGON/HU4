import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HU4 - Next.js con Postgres",
  description: "Registro, login y dashboard con Next.js y Postgres.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <header className="navbar">
          <Link className="navbar-brand" href="/">
            <span className="navbar-brand__logo">HU4</span>
            <span className="navbar-brand__text">Postgres Suite</span>
          </Link>
          <nav className="navbar-links">
            <Link className="navbar-link" href="/register">
              Registro
            </Link>
            <Link className="navbar-link" href="/login">
              Login
            </Link>
            <Link className="navbar-link navbar-link--primary" href="/dashboard">
              Dashboard
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
