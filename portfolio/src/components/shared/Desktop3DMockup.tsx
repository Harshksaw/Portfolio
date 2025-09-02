import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

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
                {/* MacBook Frame with enhanced 3D effect */}
                <div className="relative" style={{ transformStyle: "preserve-3d" }}>
                    {/* Laptop Screen - Mobile responsive */}
                    <div 
                        className="w-full lg:min-w-[450px] max-w-[600px] sm:max-w-[600px] lg:max-w-[750px] aspect-[3/2] bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 
                         rounded-t-lg overflow-hidden shadow-2xl mx-auto relative border-2 border-gray-700"
                        style={{ 
                            transform: 'perspective(800px) rotateX(-2deg) translateZ(4px)',
                            transformOrigin: 'bottom center'
                        }}
                    >
                        {/* Screen */}
                        <div 
                            className="w-full h-full bg-gray-900 rounded-lg overflow-hidden relative"
                            style={{ transform: 'translateZ(2px)' }}
                        >
                            {/* Screen content with smooth cross-fade */}
                            <div className="relative w-full h-full">
                                <AnimatePresence>
                                    <motion.img 
                                        key={currentImageIndex}
                                        initial={{ 
                                            opacity: 0
                                        }}
                                        animate={{ 
                                            opacity: 1
                                        }}
                                        exit={{ 
                                            opacity: 0
                                        }}
                                        transition={{ 
                                            duration: 0.6,
                                            ease: "easeInOut"
                                        }}
                                        src={images[currentImageIndex] || "/placeholder-desktop.png"}
                                        alt={`${title} - Screenshot ${currentImageIndex + 1}`}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </AnimatePresence>
                            </div>
                            
                            {/* Enhanced Browser UI with 3D effects - Mobile responsive */}
                            <motion.div 
                                className="absolute top-0 left-0 right-0 h-4 sm:h-6 lg:h-8 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center px-1 sm:px-2 lg:px-4 z-20"
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
                                            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 rounded-full cursor-pointer ${
                                                color === 'red' ? 'bg-red-500' :
                                                color === 'yellow' ? 'bg-yellow-500' : 'bg-green-500'
                                            }`}
                                            whileHover={{ 
                                                scale: 1.2,
                                                boxShadow: `0 0 10px rgba(${
                                                    color === 'red' ? '239, 68, 68' :
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
                                    <div className="h-2 sm:h-3 lg:h-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded text-xs flex items-center px-1 sm:px-2 text-gray-300 overflow-hidden relative">
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded"
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
                            
                            {/* Subtle screen reflection */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none"
                                animate={{
                                    opacity: isHovered ? 0.2 : 0.1
                                }}
                                transition={{ duration: 0.3 }}
                            />
                            
                            {/* Minimalist Navigation for multiple screenshots */}
                            {images.length > 1 && (
                                <motion.div 
                                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/25 backdrop-blur-sm rounded-full px-4 py-2"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {images.map((_, index) => (
                                        <motion.button
                                            key={index}
                                            type="button"
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                                                index === currentImageIndex ? 'bg-white' : 'bg-white/25 hover:bg-white/50'
                                            }`}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            aria-label={`View screenshot ${index + 1} of ${images.length}`}
                                        />
                                    ))}
                                </motion.div>
                            )}
                            
                            {/* Enhanced Glow effect */}
                            <motion.div
                                className="absolute inset-0 rounded-lg pointer-events-none"
                                animate={{
                                    boxShadow: isHovered ? [
                                        "0 0 30px rgba(59, 130, 246, 0.4)",
                                        "0 0 60px rgba(147, 51, 234, 0.5)",
                                        "0 0 30px rgba(59, 130, 246, 0.4)"
                                    ] : [
                                        "0 0 20px rgba(59, 130, 246, 0.2)",
                                        "0 0 40px rgba(147, 51, 234, 0.3)",
                                        "0 0 20px rgba(59, 130, 246, 0.2)"
                                    ]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </div>
                    </div>
                    
                    {/* Enhanced Reflection - Mobile responsive */}
                    <motion.div 
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 lg:w-40 h-1 sm:h-2 lg:h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm"
                        animate={{
                            opacity: isHovered ? 0.6 : 0.3,
                            scale: isHovered ? 1.2 : 1
                        }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </motion.div>
        </div>
    );
}