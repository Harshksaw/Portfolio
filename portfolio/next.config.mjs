/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add image optimization settings
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 60,
  },
  // Keep these webpack optimizations for Three.js
  webpack: (config) => {
    config.resolve.alias['three/webgpu'] = false;
    config.resolve.alias['three/tsl'] = false;
    
    // Add module concatenation
    config.optimization = {
      ...config.optimization,
      concatenateModules: true,
    };
    
    return config;
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Improve production performance
  swcMinify: true,
  // Optimize bundle compression
  compress: true,
  // Configure HTTP caching headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;