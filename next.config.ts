/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms-poc-strapi.jzqlap.easypanel.host',
        port: '', // Leave empty if no specific port
        pathname: '/**', // Allow any path
      },
      {
        protocol: 'http',
        hostname: 'strapi',
        port: '1337',
        pathname: '/**',
      },
      // Add more patterns for other domains
    ],
  },
};

export default nextConfig;
