import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    domains: ['cms-poc-strapi.jzqlap.easypanel.host'], // Add your external image hostnames here
  },  
};

export default nextConfig;
