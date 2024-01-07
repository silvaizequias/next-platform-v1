const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 's3.sa-east-1.amazonaws.com' },
    ],
  },
  env: {
    PLATFORM_API_URL: process.env.PLATFORM_API_URL,
    SUPPORT_API_URL: process.env.SUPPORT_API_URL,
    SERVICE_API_URL: process.env.SERVICE_API_URL,
    CONTENT_API_URL: process.env.CONTENT_API_URL,
  },
}

module.exports = nextConfig
