import type { Metadata, Viewport } from "next";
import { Orbitron } from "next/font/google";
import "./fonts.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MediaProvider } from "@/components/MediaProvider";
import { ContentProvider } from "@/components/ContentProvider";
import { ContactModalProvider } from "@/components/ContactModal";
import { ThemeProvider } from "@/components/ThemeProvider";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-orbitron",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.t4gverse.com"),
  title: "Tagverse — AI-First Creative Studio for Brands",
  description:
    "Tagverse is an AI-first creative studio, helping brands grow with strategy, content, web, ads, and automation. Portfolio, services, and a live podcast studio you can book in Chennai.",
  keywords: [
    "creative studio",
    "AI marketing agency",
    "brand strategy",
    "social media management",
    "content creation",
    "paid media",
    "web development",
    "podcast studio Chennai",
    "video marketing",
    "branding agency Chennai",
    "digital marketing India",
    "growth marketing",
    "SaaS development",
    "WebGL experiences",
    "marketing automation",
    "Strucureo",
    "Strucureo Tagverse",
    "creative agency India",
    "content studio booking",
  ],
  icons: {
    icon: "/favicon-light.webp",
  },
  openGraph: {
    title: "Tagverse — AI-First Creative Studio for Brands",
    description:
      "AI-first creative studio helping brands grow with strategy, content, web, ads, and automation. A Strucureo brand.",
    url: "https://www.t4gverse.com",
    siteName: "Tagverse",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tagverse — AI-First Creative Studio for Brands",
    description:
      "AI-first creative studio helping brands grow with strategy, content, web, ads, and automation. A Strucureo brand.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tagverse",
  alternateName: "Strucureo Tagverse",
  url: "https://www.t4gverse.com",
  logo: "https://www.t4gverse.com/favicon-light.webp",
  description:
    "AI-first creative studio helping brands grow with strategy, content, web, ads, and automation. A Strucureo brand.",
  parentOrganization: {
    "@type": "Organization",
    name: "Strucureo",
    url: "https://strucureo.com",
  },
  sameAs: [
    "https://www.instagram.com/tagverse.io/",
    "https://www.linkedin.com/company/tagverse-io/",
    "https://www.facebook.com/profile.php?id=61585655193668",
    "https://strucureo.com",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-99419-68238",
    contactType: "customer service",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('tagverse-theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');document.documentElement.style.colorScheme='light';}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`antialiased ${orbitron.variable}`}>
        <ThemeProvider>
          <MediaProvider>
            <ContentProvider>
              <ContactModalProvider>
                <Header />
                {children}
                <Footer />
              </ContactModalProvider>
            </ContentProvider>
          </MediaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
