'use client'

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WelcomeScreen from "./WelcomeScreen";

export default function InitialLoader({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = '';
        }

        // Cleanup overflow on unmount just in case
        return () => {
            document.body.style.overflow = '';
        }
    }, [isLoading]);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <WelcomeScreen key="welcome" onComplete={() => setIsLoading(false)} />
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
