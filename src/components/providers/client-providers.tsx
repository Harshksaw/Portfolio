'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

// Dynamic imports for client-only components
const SmoothCursor = dynamic(
  () => import('../shared/smooth-cursor').then(mod => ({ default: mod.SmoothCursor })),
  { ssr: false }
)
const SmoothScroller = dynamic(
  () => import('../shared/smooth-scroller'),
  { ssr: false }
)
const AmbientBackground = dynamic(
  () => import('../shared/ambient-background'),
  { ssr: false }
)

interface ClientProvidersProps {
  children: ReactNode
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <SmoothScroller>
      <AmbientBackground />
      <SmoothCursor />
      {children}
    </SmoothScroller>
  )
}
