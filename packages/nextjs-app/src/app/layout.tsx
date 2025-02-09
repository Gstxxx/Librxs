import type { Metadata } from "next";
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
  title: "Librxs - Download de Livros Gratuitos",
  description: "Encontre e baixe livros gratuitos de forma rápida e fácil.",
  generator: 'Next.js',
  applicationName: 'Librxs',
  authors: [{name: 'Your Name or Team Name', url: 'Your URL'}],
  keywords: ['livros', 'download', 'gratuito', 'pdf', 'epub', 'ebook'],
  creator: 'Your Name or Team Name',
  publisher: 'Your Name or Team Name',
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
