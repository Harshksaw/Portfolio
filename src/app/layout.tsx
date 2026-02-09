import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import { StrictMode } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import ClientProviders from '../components/providers/client-providers'
import './globals.css'

// Optimized font loading with next/font
const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
  preload: true,
})

// SEO Configuration
const siteUrl = 'https://harshsaw.tech'
const siteName = 'Harsh Kumar Saw - Portfolio'
const siteDescription = 'Full-Stack Developer & AI/DevOps Engineer specializing in React, Next.js, Node.js, Python, AWS, Kubernetes, and AI/ML solutions. Building scalable, production-ready applications.'
const siteKeywords = [
  'Full-Stack Developer',
  'AI Engineer',
  'DevOps Engineer',
  'React Developer',
  'Next.js Developer',
  'Node.js Developer',
  'Python Developer',
  'AWS Solutions',
  'Kubernetes',
  'Machine Learning',
  'LangChain',
  'RAG Applications',
  'Software Engineer',
  'Harsh Kumar Saw',
  'Portfolio'
]

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Harsh Kumar Saw - Full-Stack & AI/DevOps Engineer',
    template: '%s | Harsh Kumar Saw'
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: 'Harsh Kumar Saw', url: siteUrl }],
  creator: 'Harsh Kumar Saw',
  publisher: 'Harsh Kumar Saw',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: siteName,
    title: 'Harsh Kumar Saw - Full-Stack & AI/DevOps Engineer',
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Harsh Kumar Saw - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harsh Kumar Saw - Full-Stack & AI/DevOps Engineer',
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
    creator: '@harshksaw',
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Harsh Kumar Saw',
  url: siteUrl,
  jobTitle: 'Full-Stack Developer & AI/DevOps Engineer',
  description: siteDescription,
  sameAs: [
    'https://github.com/Harshksaw',
    'https://linkedin.com/in/harshksaw',
  ],
  knowsAbout: [
    'Web Development',
    'Full-Stack Development',
    'React',
    'Next.js',
    'Node.js',
    'Python',
    'AWS',
    'Kubernetes',
    'Docker',
    'Machine Learning',
    'LangChain',
    'RAG Applications'
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${nunito.className} antialiased cursor-none bg-primary-darkest`}>
        <StrictMode>
          <ClientProviders>
            {children}
            <Analytics />
            <SpeedInsights />
          </ClientProviders>
        </StrictMode>
      </body>
    </html>
  )
}
