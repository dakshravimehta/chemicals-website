import type { Metadata } from "next";
import { Archivo, Hanken_Grotesk, Martian_Mono } from "next/font/google";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const martianMono = Martian_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurelis Chemicals | Bulk Solvents, Polymers & Specialty Chemicals",
  description:
    "Aurelis Chemicals supplies bulk solvents, polymers, and specialty chemicals to industrial buyers worldwide. Reliable sourcing, drum-to-bulk packaging, and fast quotes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${hanken.variable} ${martianMono.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="app-wrapper">
          <Header />
          <main id="main" className="main-content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
