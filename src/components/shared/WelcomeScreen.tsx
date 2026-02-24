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
                {/* Animated Rings/SVG */}
                <motion.svg
                    className="absolute w-[200px] h-[200px] md:w-[250px] md:h-[250px]"
                    viewBox="0 0 100 100"
                    initial="hidden"
                    animate="visible"
                >
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="44"
                        stroke="url(#circleGradient)"
                        strokeWidth="2"
                        fill="transparent"
                        strokeLinecap="round"
                        strokeDasharray="276.5"
                        variants={{
                            hidden: { strokeDashoffset: 276.5, rotate: -90, opacity: 0 },
                            visible: {
                                strokeDashoffset: 0,
                                rotate: 270,
                                opacity: 1,
                                transition: { duration: 2, ease: "easeInOut" }
                            }
                        }}
                        style={{ originX: "50px", originY: "50px" }}
                    />
                    <defs>
                        <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#dd4aff" />
                            <stop offset="100%" stopColor="#1271ff" />
                        </linearGradient>
                    </defs>
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
