import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MediaProvider } from "@/components/MediaProvider";
import { ContentProvider } from "@/components/ContentProvider";

const orbitron = Orbitron({ subsets: ["latin"], weight: ["600"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "Tagverse",
  description:
    "Tagverse — a creative studio for brands. Portfolio, services, and a live podcast studio you can book a seat at.",
  icons: {
    icon: "/favicon-light.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`antialiased ${orbitron.variable}`}>
        <MediaProvider>
          <ContentProvider>
            <Header />
            {children}
            <Footer />
          </ContentProvider>
        </MediaProvider>
      </body>
    </html>
  );
}
