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
  // Enhanced location data
  user_latitude?: number;
  user_longitude?: number;
  user_accuracy?: number;
  location_source: 'gps' | 'ip' | 'denied';
}

export const useVisitTracker = () => {
  useEffect(() => {
    const trackVisit = async () => {
      console.log('🔍 Starting visit tracking...');
      
      // Generate or get session ID
      let sessionId = localStorage.getItem('session_id');
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem('session_id', sessionId);
        console.log('✅ Generated new session ID:', sessionId);
      } else {
        console.log('✅ Using existing session ID:', sessionId);
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

      // Get user's actual location
      const getUserLocation = (): Promise<{
        latitude?: number;
        longitude?: number;
        accuracy?: number;
        source: 'gps' | 'denied';
      }> => {
        return new Promise((resolve) => {
          if (!navigator.geolocation) {
            console.log('🚫 Geolocation not supported');
            resolve({ source: 'denied' });
            return;
          }

          console.log('📍 Requesting user location...');
          
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log('✅ Location obtained:', {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                accuracy: position.coords.accuracy
              });
              
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                source: 'gps'
              });
            },
            (error) => {
              console.log('❌ Location denied or failed:', error.message);
              resolve({ source: 'denied' });
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 300000 // 5 minutes
            }
          );
        });
      };

      try {
        // Get location (either GPS or fallback to IP)
        const locationData = await getUserLocation();
        
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
          user_latitude: locationData.latitude,
          user_longitude: locationData.longitude,
          user_accuracy: locationData.accuracy,
          location_source: locationData.source,
        };

        console.log('📊 Tracking data prepared:', trackingData);
        console.log('🔑 Using track secret:', process.env.NEXT_PUBLIC_TRACK_SECRET ? 'SET' : 'NOT SET');

        const response = await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TRACK_SECRET}`,
          },
          body: JSON.stringify(trackingData),
        });

        if (!response.ok) {
          console.error('❌ Failed to track visit:', {
            status: response.status,
            statusText: response.statusText,
            url: response.url
          });
          const errorText = await response.text();
          console.error('❌ Error response:', errorText);
        } else {
          console.log('✅ Visit tracked successfully!', {
            status: response.status,
            timestamp: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('💥 Error tracking visit:', error);
        if (error instanceof Error) {
          console.error('💥 Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
          });
        }
      }
    };

    // Track visit after a small delay to ensure page is loaded
    const timer = setTimeout(trackVisit, 1000);

    return () => clearTimeout(timer);
  }, []);
};
