import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { personal } from "@/data/portfolio";
import PalettePicker from "@/components/PalettePicker";
import "./globals.css";

// Load the Geist font. next/font downloads it at build time,
// so the browser doesn't wait for Google and the text doesn't "jump".
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO: what browsers, Google and LinkedIn show for my site
export const metadata: Metadata = {
  metadataBase: new URL(personal.siteUrl),
  title: {
    // Home page title
    default: `${personal.name} | ${personal.title}`,
    // Other pages: "Page not found" → "Page not found | Sajidur Rahman"
    template: `%s | ${personal.name}`,
  },
  description: `Portfolio of ${personal.name}, a ${personal.title} from ${personal.location}. ${personal.intro}`,
  // Tells Google the official URL of my page: siteUrl + "/"
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${personal.name} | ${personal.title}`,
    description: personal.intro,
    url: "/",
    siteName: personal.name,
    type: "website",
  },
};

// Wraps every page. {children} = the page content (page.tsx)
// LayoutProps<"/"> is a global type Next.js makes for me (no import needed)
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          {/* Bottom-left bar to choose the dark background */}
          <PalettePicker />
        </ThemeProvider>
        {/* Vercel Web Analytics: counts visitors (no cookies). Only active on Vercel */}
        <Analytics />
      </body>
    </html>
  );
}
