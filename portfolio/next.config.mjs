import { withSentryConfig } from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['three/webgpu'] = false;
    config.resolve.alias['three/tsl'] = false;
    return config;
  },
};

export default withSentryConfig(nextConfig, {
  silent: true,
  org: "javascript-mastery",
  project: "javascript-nextjs",
}, {
  widenClientFileUpload: true,
  transpileClientSDK: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});