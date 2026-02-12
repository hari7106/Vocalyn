import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    // Allow external image domains (Google profile pics for OAuth)
    domains: ['lh3.googleusercontent.com'],
  },
};

export default nextConfig;
