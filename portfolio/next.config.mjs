/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['three/webgpu'] = false;
    config.resolve.alias['three/tsl'] = false;
    return config;
  },
};

export default nextConfig;
