'use client'

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface Mobile3DMockupProps {
    images: string[];
    title: string;
    className?: string;
}

export default function Mobile3DMockup({ images, title, className = "" }: Mobile3DMockupProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Cycle through images every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => {
                if (images && images.length > 0) {
                    return (prevIndex + 1) % images.length;
                }
                return prevIndex;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className={`relative ${className}`}>
            {/* Mobile Frame */}
            <motion.div 
                className="relative transform-gpu"
                initial={{ rotateY: -15, rotateX: 5 }}
                animate={{ 
                    rotateY: [-15, -10, -15],
                    rotateX: [5, 8, 5]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d"
                }}
            >
                {/* Phone Body */}
                <div className="relative bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl">
                    {/* Screen Bezel */}
                    <div className="bg-black rounded-[2.25rem] p-3">
                        {/* Notch */}
                        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-900 rounded-full z-10"></div>
                        
                        {/* Screen */}
                        <div className="relative bg-white rounded-[1.75rem] overflow-hidden aspect-[9/19.5] w-64">
                            {/* Status Bar */}
                            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-gray-100 to-transparent z-10"></div>
                            
                            {/* App Content */}
                            <motion.img
                                key={currentImageIndex}
                                src={images[currentImageIndex] || "/placeholder-mobile.png"}
                                alt={`${title} - Screen ${currentImageIndex + 1}`}
                                className="w-full h-full object-cover"
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                            />
                            
                            {/* Screen Reflection */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 pointer-events-none"></div>
                        </div>
                    </div>
                    
                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full"></div>
                </div>
                
                {/* Shadow */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-black/20 rounded-full blur-xl"></div>
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div
                className="absolute -top-4 -right-4 w-6 h-6 bg-blue-500 rounded-full shadow-lg"
                animate={{
                    y: [-5, 5, -5],
                    rotate: [0, 180, 360]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            <motion.div
                className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-500 rounded-full shadow-lg"
                animate={{
                    y: [5, -5, 5],
                    rotate: [360, 180, 0]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    );
}