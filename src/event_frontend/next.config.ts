import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',  // otomatis membuat static export
  distDir: 'out',
  images: {
    domains: ['images.unsplash.com'], // Add Unsplash domain here
  },
};

export default nextConfig;
