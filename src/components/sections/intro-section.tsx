'use client'

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { container, charVariant } from "../../variants/stagger";

export default function IntroSection() {
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const name = "Harsh Kumar Saw".split("");

    // Mobile-optimized text animation variants
    const mobileContainer = {
        hidden: {},
        show: {
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.03,
            },
        },
    };

    const mobileCharVariant = {
        hidden: { opacity: 0, y: 60 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const id = setTimeout(() => {
            requestAnimationFrame(() => {
                setMounted(true);
            });
        }, 1000);

        return () => {
            clearTimeout(id);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    if (!mounted) return null;

    return (
        <div className="w-fit h-fit overflow-hidden absolute top-1/2 -z-2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <motion.h2
                className="font-extrabold text-3xl md:text-7xl whitespace-nowrap"
                variants={isMobile ? mobileContainer as any : container as any}
                initial="hidden"
                animate="show"
                style={{
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                }}
            >
                {name.map((word, i) => (
                    <motion.span
                        key={i}
                        variants={isMobile ? mobileCharVariant as any : charVariant as any}
                        className="inline-block mr-0.5"
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.h2>
        </div>
    );
}
