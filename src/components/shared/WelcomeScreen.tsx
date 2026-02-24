'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
        // Kept the same timeout logic to transition away after 2.8s
        const timer = setTimeout(() => {
            onComplete()
        }, 2800)
        return () => clearTimeout(timer)
    }, [onComplete])

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary-darkest"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: 0.8, ease: "easeInOut" }
            }}
        >
            <div className="relative flex items-center justify-center w-full px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-full max-w-3xl mx-auto"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 800 600"
                        className="w-full h-auto drop-shadow-2xl"
                        fill="none"
                    >
                        {/* Gradients and Definitions */}
                        <defs>
                            <linearGradient id="aiBackgroundGlow" x1="0" y1="0" x2="800" y2="600" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4F46E5" stopOpacity="0.15" />
                                <stop offset="1" stopColor="#9333EA" stopOpacity="0.02" />
                            </linearGradient>
                            <linearGradient id="screenLight" x1="400" y1="380" x2="400" y2="480" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#06B6D4" stopOpacity="0.9" />
                                <stop offset="1" stopColor="#3B82F6" stopOpacity="0.1" />
                            </linearGradient>
                        </defs>

                        {/* Ambient AI Background Glow */}
                        <circle cx="400" cy="300" r="350" fill="url(#aiBackgroundGlow)" />

                        {/* AI Neural Network Connections */}
                        <g stroke="#8B5CF6" strokeWidth="2" strokeOpacity="0.5" strokeDasharray="4 4">
                            <path d="M 400 350 L 250 200 L 150 250" />
                            <path d="M 400 350 L 550 180 L 680 220" />
                            <path d="M 250 200 L 300 100 L 450 80 L 550 180" />
                            <path d="M 150 250 L 100 150 L 300 100" />
                        </g>

                        {/* Network Nodes */}
                        <g fill="#A78BFA">
                            <circle cx="250" cy="200" r="6" />
                            <circle cx="150" cy="250" r="4" />
                            <circle cx="550" cy="180" r="8" />
                            <circle cx="680" cy="220" r="5" />
                            <circle cx="300" cy="100" r="5" />
                            <circle cx="450" cy="80" r="7" />
                            <circle cx="100" cy="150" r="5" />
                        </g>

                        {/* Floating Elements: Learning & Code */}
                        <g fill="#10B981" fontFamily="monospace" fontSize="28" fontWeight="bold">
                            <text x="160" y="160">&lt;/&gt;</text>
                            <text x="580" y="130">&#123; &#125;</text>
                        </g>

                        {/* Floating Element: Experience (Gear) */}
                        <g stroke="#F59E0B" strokeWidth="4" fill="none" transform="translate(640, 320) scale(0.7)">
                            <circle cx="0" cy="0" r="20" />
                            <path d="M 0 -20 L 0 -28 M 0 20 L 0 28 M -20 0 L -28 0 M 20 0 L 28 0" strokeLinecap="round" />
                            <path d="M -14 -14 L -20 -20 M 14 14 L 20 20 M -14 14 L -20 20 M 14 -14 L 20 -20" strokeLinecap="round" />
                        </g>

                        {/* Environment - Desk */}
                        <path d="M 120 480 L 680 480 L 750 600 L 50 600 Z" fill="#1E293B" />

                        {/* Person silhouette */}
                        <path d="M 400 370 C 320 370 290 480 290 480 L 510 480 C 510 480 480 370 400 370 Z" fill="#334155" />
                        <circle cx="400" cy="310" r="45" fill="#475569" />

                        {/* Hardware - Laptop Base */}
                        <path d="M 310 480 L 490 480 L 520 510 L 280 510 Z" fill="#94A3B8" />

                        {/* Hardware - Laptop Screen Frame */}
                        <rect x="320" y="390" width="160" height="95" rx="6" fill="#0F172A" stroke="#64748B" strokeWidth="4" />

                        {/* Glowing Screen Content */}
                        <rect x="322" y="392" width="156" height="91" rx="4" fill="url(#screenLight)" />

                        {/* Code lines on screen */}
                        <line x1="340" y1="415" x2="420" y2="415" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" />
                        <line x1="340" y1="435" x2="450" y2="435" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" />
                        <line x1="340" y1="455" x2="390" y2="455" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" />

                    </svg>
                </motion.div>
            </div>
        </motion.div>
    )
}
