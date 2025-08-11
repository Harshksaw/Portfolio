"use client";

import React, { useEffect, useRef, useState, Suspense } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
  name?: string;
}

const DefaultLoader = ({ name }: { name?: string }) => (
  <div className="flex items-center justify-center min-h-[50vh] bg-black/50">
    <div className="text-center text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
      <p className="text-sm opacity-70 font-mono">
        {name ? `Loading ${name}...` : 'Loading...'}
      </p>
    </div>
  </div>
);

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback,
  rootMargin = "100px",
  threshold = 0.1,
  className = "",
  name
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={ref} className={className}>
      {isIntersecting ? (
        <Suspense fallback={fallback || <DefaultLoader name={name} />}>
          {children}
        </Suspense>
      ) : (
        fallback || <DefaultLoader name={name} />
      )}
    </div>
  );
};

export default LazySection;
