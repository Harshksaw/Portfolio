import type { Metadata } from 'next'
import '@/index.css'
import { SmoothCursor } from '@/components/shared/smooth-cursor'

export const metadata: Metadata = {
  title: 'Harsh Kumar Saw - Full-Stack & AI/DevOps Engineer',
  description: 'Portfolio of Harsh Kumar Saw - Full-Stack Developer specializing in AI and DevOps',
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
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Bitcount+Prop+Double:wght@100..900&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
      </head>
      <body>
        {children}
        <SmoothCursor />
      </body>
    </html>
  )
}