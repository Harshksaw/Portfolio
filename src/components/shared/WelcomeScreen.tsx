'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function WelcomeScreen({ onComplete }: { onComplete: () => void }) {
    useEffect(() => {
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
            <div className="relative flex items-center justify-center">
                {/* Animated Half-Human / Half-Robot SVG */}
                <motion.svg
                    className="absolute w-[200px] h-[200px] md:w-[250px] md:h-[250px]"
                    viewBox="0 0 100 100"
                    initial="hidden"
                    animate="visible"
                >
                    <defs>
                        <linearGradient id="humanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#8c64ff" /> {/* violet-light */}
                            <stop offset="100%" stopColor="#dd4aff" /> {/* primary-violet */}
                        </linearGradient>
                        <linearGradient id="robotGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#64dcff" /> {/* primary-light */}
                            <stop offset="100%" stopColor="#1271ff" /> {/* primary-main */}
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Left Side: Human Face Profile */}
                    <motion.path
                        d="M 50 10 C 35 10 25 20 25 35 C 25 45 30 50 30 55 C 30 65 20 75 25 85 C 30 90 40 90 50 90"
                        stroke="url(#humanGradient)"
                        strokeWidth="2"
                        fill="transparent"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glow)"
                        variants={{
                            hidden: { pathLength: 0, opacity: 0 },
                            visible: {
                                pathLength: 1,
                                opacity: 1,
                                transition: { duration: 2, ease: "easeInOut" }
                            }
                        }}
                    />
                    {/* Human Eye Details */}
                    <motion.path
                        d="M 35 45 Q 40 42 45 45"
                        stroke="url(#humanGradient)"
                        strokeWidth="1.5"
                        fill="transparent"
                        strokeLinecap="round"
                        variants={{
                            hidden: { pathLength: 0, opacity: 0 },
                            visible: {
                                pathLength: 1,
                                opacity: 1,
                                transition: { duration: 1, delay: 1, ease: "easeOut" }
                            }
                        }}
                    />

                    {/* Right Side: Robot/Cybernetic Face Profile */}
                    <motion.path
                        d="M 50 10 L 65 15 L 75 30 L 70 50 L 75 65 L 60 85 L 50 90"
                        stroke="url(#robotGradient)"
                        strokeWidth="2"
                        fill="transparent"
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                        filter="url(#glow)"
                        variants={{
                            hidden: { pathLength: 0, opacity: 0 },
                            visible: {
                                pathLength: 1,
                                opacity: 1,
                                transition: { duration: 2, ease: "easeInOut" }
                            }
                        }}
                    />
                    {/* Robot Eye Details (Geometric) */}
                    <motion.rect
                        x="55" y="42" width="8" height="6"
                        stroke="url(#robotGradient)"
                        strokeWidth="1.5"
                        fill="transparent"
                        variants={{
                            hidden: { scale: 0, opacity: 0 },
                            visible: {
                                scale: 1,
                                opacity: 1,
                                transition: { duration: 0.5, delay: 1.5, ease: "backOut" }
                            }
                        }}
                        style={{ originX: "59px", originY: "45px" }}
                    />

                    {/* Center connecting nodes */}
                    <motion.circle cx="50" cy="10" r="2" fill="#fff"
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 2 } } }} />
                    <motion.circle cx="50" cy="90" r="2" fill="#fff"
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 2 } } }} />
                    <motion.line x1="50" y1="10" x2="50" y2="90"
                        stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeDasharray="2 4"
                        variants={{
                            hidden: { pathLength: 0, opacity: 0 },
                            visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, delay: 0.5 } }
                        }}
                    />
                </motion.svg>

                {/* Centered Text */}
                <motion.div
                    className="text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-light to-white text-xl md:text-2xl font-light tracking-[0.3em] pl-[0.3em] drop-shadow-[0_0_15px_rgba(100,220,255,0.3)] flex items-center justify-center whitespace-nowrap"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        visible: {
                            opacity: 1,
                            scale: 1,
                            transition: { duration: 1.5, ease: "easeOut", delay: 0.2 }
                        }
                    }}
                >
                    WELCOME
                </motion.div>
            </div>
        </motion.div>
    )
}
