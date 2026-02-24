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
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0f]"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: 0.8, ease: "easeInOut" }
            }}
        >
            <div className="relative flex items-center justify-center">
                {/* Animated Rings/SVG */}
                <motion.svg
                    className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
                    viewBox="0 0 100 100"
                    initial="hidden"
                    animate="visible"
                >
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#circleGradient)"
                        strokeWidth="0.5"
                        fill="transparent"
                        strokeDasharray="251.2"
                        variants={{
                            hidden: { strokeDashoffset: 251.2, rotate: -90, opacity: 0 },
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
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                    </defs>
                </motion.svg>

                {/* Staggered Text */}
                <motion.div
                    className="text-white text-2xl md:text-3xl font-light tracking-[0.5em] ml-2"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15, delayChildren: 0.4 }
                        }
                    }}
                >
                    {"WELCOME".split('').map((char, index) => (
                        <motion.span
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 10, filter: "blur(5px)" },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    filter: "blur(0px)",
                                    transition: { duration: 0.8, ease: "easeOut" }
                                }
                            }}
                            style={{ display: "inline-block" }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    )
}
