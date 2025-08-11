import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import GoogleAnalytics from "@/app/GoogleAnalytics";

import { Analytics } from '@vercel/analytics/react';
import "./globals.css";
import StoreProvider from "@/redux/storeProvider";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);
import { SpeedInsights } from '@vercel/speed-insights/next';
const dM_Sans = DM_Sans({ subsets: ["latin-ext"] });
const satoshi = localFont({
  src: "../font/satoshi/Satoshi-Variable.woff2",
  style: "normal",
});

const helvetica = localFont({
  src: "../font/helvetica/HelveticaNowDisplay-Medium.woff2",
  style: "normal",
});
export const metadata: Metadata = {
  title: {
    default: "Harsh Kumar • Full Stack Developer & DevOps Engineer",
    template: "%s | Harsh Kumar - Developer Portfolio"
  },
  description: "Full Stack Developer & DevOps Engineer specializing in modern web technologies, cloud infrastructure, and scalable applications. Expert in React, Node.js, AWS, Docker, Kubernetes, and CI/CD pipelines.",
  keywords: [
    "Full Stack Developer",
    "DevOps Engineer",
    "React Developer",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Next.js",
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Cloud Infrastructure",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer",
    "Software Engineer",
    "Portfolio",
    "Harsh Kumar",
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "Microservices",
    "API Development",
    "System Design",
    "Terraform",
    "Jenkins",
    "GitHub Actions",
    "Azure",
    "Google Cloud"
  ],
  authors: [{ name: "Harsh Kumar", url: "https://harshsaw.tech" }],
  creator: "Harsh Kumar",
  publisher: "Harsh Kumar",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harshsaw.tech",
    siteName: "Harsh Kumar - Developer Portfolio",
    title: "Harsh Kumar • Full Stack Developer & DevOps Engineer",
    description: "Full Stack Developer & DevOps Engineer specializing in modern web technologies, cloud infrastructure, and scalable applications.",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Harsh Kumar - Full Stack Developer & DevOps Engineer",
        type: "image/jpeg",
      },
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 1200,
        alt: "Harsh Kumar - Developer Portfolio",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Kumar • Full Stack Developer & DevOps Engineer",
    description: "Full Stack Developer & DevOps Engineer specializing in modern web technologies, cloud infrastructure, and scalable applications.",
    creator: "@harshkumar_dev",
    site: "@harshkumar_dev",
    images: ["/logo.jpeg"],
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://harshsaw.tech",
    types: {
      "application/rss+xml": "https://harshsaw.tech/rss.xml",
    },
  },
  category: "technology",
  classification: "Portfolio Website",
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  other: {
    "application-name": "Harsh Kumar Portfolio",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Harsh Kumar",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": "#000000",
    "msapplication-tap-highlight": "no",
    "theme-color": "#000000",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        ></link>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no"
        ></meta>
        <GoogleAnalytics />
      </head>

      <body className={helvetica.className}>
        <StoreProvider>{children}</StoreProvider>
              <Analytics />
                <SpeedInsights />
      </body>
      {/* <Script src="https://cdn.jsdelivr.net/gh/Harshkumar-dev/gsap@2024/ScrambleTextPlugin.min.js" /> */}
    </html>
  );
}
