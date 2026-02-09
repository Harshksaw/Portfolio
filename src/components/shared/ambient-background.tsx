'use client';

import React from 'react';

export default function AmbientBackground() {
    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none -z-50 overflow-hidden">
            {/* Top Center Spotlight - Blue/White mix for brightness */}
            <div
                className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-main/20 via-primary-darkest/0 to-transparent blur-[100px] opacity-70"
            />

            {/* Top Left - Violet/Purple Ambient */}
            <div
                className="absolute top-0 left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary-violet/10 blur-[120px] animate-pulse"
                style={{ animationDuration: '8s' }}
            />

            {/* Top Right - Blue/Cyan Ambient */}
            <div
                className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary-light/10 blur-[120px] animate-pulse"
                style={{ animationDuration: '10s', animationDelay: '1s' }}
            />

            {/* Bottom Left - Subtle Blue */}
            <div
                className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-primary-main/5 blur-[150px]"
            />

            {/* Bottom Center - Glow */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vh] bg-primary-violet/5 blur-[100px]"
            />

            {/* Global Grain/Noise overlay for texture (optional, keeping it clean for now) */}
        </div>
    );
}
