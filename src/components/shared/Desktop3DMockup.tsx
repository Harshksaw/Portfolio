'use client'

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

interface Desktop3DMockupProps {
    images: string[];
    title: string;
    className?: string;
}

export default function Desktop3DMockup({ images, title, className = "" }: Desktop3DMockupProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Dynamic timing based on number of images
    useEffect(() => {
        if (images.length > 1) {
            // Calculate timing: more images = faster transitions
            const baseTime = images.length <= 2 ? 3000 :
                images.length <= 4 ? 2000 : 1500;

            const interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }, baseTime);
            return () => clearInterval(interval);
        }
    }, [images.length]);

    return (
        <div
            className={`relative max-w-full overflow-visible ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ perspective: "1000px" }}
        >
            <motion.div
                className="relative"
                animate={{
                    rotateY: isHovered ? -6 : 0,
                    rotateX: isHovered ? 3 : 0,
                    scale: isHovered ? 1.01 : 1,
                    z: isHovered ? 30 : 0
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 35,
                    duration: 0.4
                }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* iPad Frame with enhanced 3D effect */}
                <div className="relative" style={{ transformStyle: "preserve-3d" }}>
                    {/* Gradient border wrapper */}
                    <div
                        className="w-full min-w-[380px] sm:min-w-[500px] md:min-w-[600px] lg:min-w-[700px]
                         max-w-[600px] sm:max-w-[750px] lg:max-w-[950px] aspect-[16/10]
                         bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-500
                         rounded-[24px] p-[4px] mx-auto relative shadow-[0_25px_70px_rgba(139,92,246,0.3),0_10px_40px_rgba(0,0,0,0.5)]"
                        style={{
                            transform: 'perspective(800px) rotateX(-2deg) translateZ(4px)',
                            transformOrigin: 'bottom center'
                        }}
                    >
                    {/* Inner device body */}
                    <div className="w-full h-full bg-gradient-to-b from-[#1a1a1a] via-[#111] to-[#0a0a0a] rounded-[20px] overflow-hidden relative">
                        {/* Metallic edge detail - iPad style */}
                        <div className="absolute inset-0 rounded-[20px] ring-1 ring-white/10 ring-inset"></div>

                        {/* Screen Bezel - iPad style thick border */}
                        <div className="w-full h-full bg-[#0a0a0a] rounded-[16px] overflow-hidden relative p-3 sm:p-4 lg:p-5">
                            {/* Screen glass reflection overlay */}
                            <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-30 rounded-[12px]"></div>

                            {/* Front camera dot - iPad style */}
                            <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#1a1a1a] rounded-full border border-[#333] z-40">
                                <div className="absolute inset-[2px] bg-[#0a0a0a] rounded-full"></div>
                            </div>

                            {/* Screen */}
                            <div
                                className="w-full h-full bg-primary-darkest rounded-[10px] overflow-hidden relative border border-gray-800/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
                                style={{ transform: 'translateZ(2px)' }}
                            >
                                {/* Screen content with smooth cross-fade */}
                                <div className="relative w-full h-full">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentImageIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.6, ease: "easeInOut" }}
                                            className="absolute inset-0 w-full h-full"
                                        >
                                            <Image
                                                src={images[currentImageIndex] || "/placeholder-desktop.png"}
                                                alt={`${title} - Screenshot ${currentImageIndex + 1}`}
                                                fill
                                                className="object-cover"
                                                priority={currentImageIndex === 0}
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Enhanced Browser UI with 3D effects - Mobile responsive */}
                                <motion.div
                                    className="absolute top-0 left-0 right-0 h-4 sm:h-6 lg:h-8 bg-gradient-to-b from-primary-dark to-primary-darkest flex items-center px-1 sm:px-2 lg:px-4 z-20 border-b border-primary-main/20"
                                    style={{ transform: 'translateZ(4px)' }}
                                    animate={{
                                        boxShadow: isHovered
                                            ? "0 4px 20px rgba(0, 0, 0, 0.4)"
                                            : "0 2px 10px rgba(0, 0, 0, 0.2)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Traffic lights with hover animations - Mobile responsive */}
                                    <div className="flex gap-0.5 sm:gap-1 lg:gap-2">
                                        {['red', 'yellow', 'green'].map((color, index) => (
                                            <motion.div
                                                key={color}
                                                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 rounded-full cursor-pointer border border-gray-700/50 shadow-inner ${color === 'red' ? 'bg-red-500' :
                                                    color === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'
                                                    }`}
                                                whileHover={{
                                                    scale: 1.2,
                                                    boxShadow: `0 0 10px rgba(${color === 'red' ? '239, 68, 68' :
                                                        color === 'yellow' ? '245, 158, 11' : '34, 197, 94'
                                                        }, 0.8)`
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                                animate={{
                                                    opacity: isHovered ? 1 : 0.8
                                                }}
                                                transition={{ delay: index * 0.1 }}
                                            />
                                        ))}
                                    </div>

                                    {/* Enhanced address bar - Mobile responsive */}
                                    <motion.div
                                        className="flex-1 mx-1 sm:mx-2 lg:mx-4"
                                        animate={{
                                            scale: isHovered ? 1.02 : 1
                                        }}
                                    >
                                        <div className="h-2 sm:h-3 lg:h-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded text-xs flex items-center px-1 sm:px-2 text-gray-300 overflow-hidden relative border border-gray-600/50 shadow-inner">
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-primary-main/20 to-primary-violet/20 rounded"
                                                animate={{
                                                    opacity: isHovered ? 1 : 0
                                                }}
                                                transition={{ duration: 0.3 }}
                                            />
                                            <span className="truncate relative z-10 text-xs sm:text-sm hidden sm:block">
                                                {title.toLowerCase().replace(/\s+/g, '')}.com
                                            </span>
                                        </div>
                                    </motion.div>
                                </motion.div>

                                {/* Screen reflection overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none rounded-md"
                                    animate={{
                                        opacity: isHovered ? 0.25 : 0.15
                                    }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Minimalist Navigation for multiple screenshots */}
                                {images.length > 1 && (
                                    <motion.div
                                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-primary-main/30 shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        {images.map((_, index) => (
                                            <motion.button
                                                key={index}
                                                type="button"
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 border ${index === currentImageIndex
                                                    ? 'bg-primary-main border-primary-light shadow-[0_0_8px_rgba(18,113,255,0.6)]'
                                                    : 'bg-white/25 border-white/30 hover:bg-white/50 hover:border-white/50'
                                                    }`}
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                                aria-label={`View screenshot ${index + 1} of ${images.length}`}
                                            />
                                        ))}
                                    </motion.div>
                                )}

                                {/* Enhanced Glow effect - violet */}
                                <motion.div
                                    className="absolute inset-0 rounded-[10px] pointer-events-none"
                                    animate={{
                                        boxShadow: isHovered ? [
                                            "0 0 30px rgba(139, 92, 246, 0.5)",
                                            "0 0 60px rgba(168, 85, 247, 0.6)",
                                            "0 0 30px rgba(139, 92, 246, 0.5)"
                                        ] : [
                                            "0 0 20px rgba(139, 92, 246, 0.25)",
                                            "0 0 40px rgba(168, 85, 247, 0.35)",
                                            "0 0 20px rgba(139, 92, 246, 0.25)"
                                        ]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                            </div>
                        </div>
                    </div>
                    </div>

                    {/* Multi-layered shadows for depth - violet tint */}
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-violet-900/40 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-2/3 h-5 bg-purple-500/25 rounded-full blur-xl"></div>

                    {/* Enhanced Reflection - violet glow */}
                    <motion.div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 lg:w-40 h-1 sm:h-2 lg:h-3 bg-gradient-to-r from-transparent via-violet-400/40 to-transparent blur-sm rounded-full"
                        animate={{
                            opacity: isHovered ? 0.7 : 0.4,
                            scale: isHovered ? 1.3 : 1
                        }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </motion.div>
        </div>
    );
}