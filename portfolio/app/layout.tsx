
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next"
import NavBar from "@/components/Navbar";

// Optimize font loading
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const metadata: Metadata = {
  title: "Harsh  Portfolio | Full-Stack Developer",
  description: "Harsh Kumar - A Full-Stack Developer with experience in React, Next.js, Node.js and AWS. Creating scalable, production-ready applications.",
  keywords: ["portfolio", "developer", "full stack", "react", "next.js", "web development"],
  authors: [{ name: "Harsh Kumar" }],
  creator: "Harsh Kumar",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: "Harsh Kumar - Full-Stack Developer Portfolio",
    description: "Full-Stack Developer with experience in React, Next.js, Node.js and AWS.",
    siteName: "Harsh Kumar's Portfolio",
    // images: [
    //   {
    //     width: 1200,
    //     height: 630,
    //     alt: 'Harsh Kumar - Portfolio',
    //   }
    // ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Harsh Kumar - Full-Stack Developer Portfolio",
    description: "Full-Stack Developer with experience in React, Next.js, Node.js and AWS.",
  },


};


export function generateMetadata(): Metadata {
  return {
    ...metadata,

  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="icon" href="/harsh.png" sizes="any" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/b1.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/profile.svg" as="image" type="image/svg+xml" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Analytics/>
        <SpeedInsights/>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* <NavBar /> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}