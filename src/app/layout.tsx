import type { Metadata } from 'next'
import { StrictMode } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SmoothCursor } from '../components/shared/smooth-cursor'
import SmoothScroller from '../components/shared/smooth-scroller'
import './globals.css'

export const metadata: Metadata = {
  title: 'Harsh Kumar Saw - Full-Stack & AI/DevOps Engineer',
  description: 'Portfolio of Harsh Kumar Saw, a Full-Stack Developer and AI/DevOps Engineer',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased cursor-none bg-primary-darkest">
        <StrictMode>
          <SmoothScroller>
            <SmoothCursor />
            {children}
            <Analytics />
            <SpeedInsights />
          </SmoothScroller>
        </StrictMode>
      </body>
    </html>
  )
}