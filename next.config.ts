import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Monolithic deployment — marketing site, app, API, blog, help all in one
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
