import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: 'http',
      hostname: 'books.google.com',
      port: '',
      pathname: '/**'
    }, {
      protocol: 'https',
      hostname: 'lh3.googleusercontent.com',
      port: '',
      pathname: '/**'
    }]
  },
};

export default nextConfig;
