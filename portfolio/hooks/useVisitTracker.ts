"use client";
import { useEffect } from 'react';

interface TrackingData {
  ts: string;
  path: string;
  referer: string | null;
  session_id: string | null;
  device_type: string;
  browser: string;
  os: string;
  is_bot: boolean;
  locale: string;
}

export const useVisitTracker = () => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Generate or get session ID
        let sessionId = localStorage.getItem('session_id');
        if (!sessionId) {
          sessionId = crypto.randomUUID();
          localStorage.setItem('session_id', sessionId);
        }

        // Detect device type
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(navigator.userAgent);
        
        let deviceType = 'desktop';
        if (isMobile) deviceType = 'mobile';
        else if (isTablet) deviceType = 'tablet';

        // Detect browser
        const getBrowser = () => {
          const ua = navigator.userAgent;
          if (ua.includes('Chrome')) return 'Chrome';
          if (ua.includes('Firefox')) return 'Firefox';
          if (ua.includes('Safari')) return 'Safari';
          if (ua.includes('Edge')) return 'Edge';
          if (ua.includes('Opera')) return 'Opera';
          return 'Unknown';
        };

        // Detect OS
        const getOS = () => {
          const ua = navigator.userAgent;
          if (ua.includes('Windows')) return 'Windows';
          if (ua.includes('Mac')) return 'macOS';
          if (ua.includes('Linux')) return 'Linux';
          if (ua.includes('Android')) return 'Android';
          if (ua.includes('iOS')) return 'iOS';
          return 'Unknown';
        };

        // Check if bot
        const isBot = /bot|crawl|spider|scraper/i.test(navigator.userAgent);

        const trackingData: TrackingData = {
          ts: new Date().toISOString(),
          path: window.location.pathname,
          referer: document.referrer || null,
          session_id: sessionId,
          device_type: deviceType,
          browser: getBrowser(),
          os: getOS(),
          is_bot: isBot,
          locale: navigator.language,
        };

        const response = await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TRACK_SECRET}`,
          },
          body: JSON.stringify(trackingData),
        });

        if (!response.ok) {
          console.warn('Failed to track visit:', response.status);
        }
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    // Track visit after a small delay to ensure page is loaded
    const timer = setTimeout(trackVisit, 1000);

    return () => clearTimeout(timer);
  }, []);
};
