'use client';

import React, { memo } from 'react';

// Memoized ambient background for performance
const AmbientBackground = memo(function AmbientBackground() {
    return (
        <div
            className="fixed inset-0 w-full h-full pointer-events-none -z-50 overflow-hidden"
            style={{
                willChange: 'transform',
                transform: 'translateZ(0)', // GPU acceleration
                backfaceVisibility: 'hidden',
            }}
            aria-hidden="true"
        >
            {/* Top Center Spotlight - Blue/White mix for brightness */}
            <div
                className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] rounded-full opacity-70"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(18, 113, 255, 0.2), transparent 70%)',
                    filter: 'blur(100px)',
                    willChange: 'opacity',
                }}
            />

            {/* Top Left - Violet/Purple Ambient */}
            <div
                className="absolute top-0 left-[-10%] w-[40vw] h-[40vw] rounded-full animate-ambient-pulse"
                style={{
                    background: 'rgba(221, 74, 255, 0.1)',
                    filter: 'blur(120px)',
                    animationDuration: '8s',
                }}
            />

            {/* Top Right - Blue/Cyan Ambient */}
            <div
                className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full animate-ambient-pulse"
                style={{
                    background: 'rgba(97, 218, 251, 0.1)',
                    filter: 'blur(120px)',
                    animationDuration: '10s',
                    animationDelay: '1s',
                }}
            />

            {/* Bottom Left - Subtle Blue */}
            <div
                className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full"
                style={{
                    background: 'rgba(18, 113, 255, 0.05)',
                    filter: 'blur(150px)',
                }}
            />

            {/* Bottom Center - Glow */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vh]"
                style={{
                    background: 'rgba(221, 74, 255, 0.05)',
                    filter: 'blur(100px)',
                }}
            />
        </div>
    );
});

export default AmbientBackground;
