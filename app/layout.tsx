import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/stack/server";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cutuu.unstory.app"),
  title: {
    default: "Cutuu | Memory-first companion",
    template: "%s | Cutuu",
  },
  description:
    "A memory-first companion for daily check-ins, familiar conversations, and softer routines that grow over time.",
  applicationName: "Cutuu",
  keywords: [
    "AI companion",
    "memory-first assistant",
    "journaling companion",
    "daily check-in app",
    "personal AI friend",
  ],
  openGraph: {
    title: "Cutuu | Memory-first companion",
    description:
      "A soft, memory-first companion that keeps names, routines, and personal context across conversations.",
    url: "https://cutuu.unstory.app/landing",
    siteName: "Cutuu",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/demo-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Cutuu preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cutuu | Memory-first companion",
    description:
      "A soft, memory-first companion that remembers the little things.",
    images: ["/images/demo-thumbnail.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const LIGHT_THEME_COLOR = "hsl(0 0% 100%)";
const DARK_THEME_COLOR = "hsl(240deg 10% 3.92%)";
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  function updateThemeColor() {
    var isDark = html.classList.contains('dark');
    meta.setAttribute('content', isDark ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}');
  }
  var observer = new MutationObserver(updateThemeColor);
  observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  updateThemeColor();
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${geist.variable} ${geistMono.variable} ${fraunces.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: "Required"
          dangerouslySetInnerHTML={{
            __html: THEME_COLOR_SCRIPT,
          }}
        />
      </head>
      <body className="antialiased bg-background">
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              disableTransitionOnChange
              enableSystem
            >
              <Toaster position="top-center" />
              {children}
            </ThemeProvider>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
