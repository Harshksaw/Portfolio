'use client'

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
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
            <AnimatePresence>
                {isLoading && (
                    <WelcomeScreen key="welcome" onComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>
            <div
                className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            >
                {children}
            </div>
        </>
    );
}
