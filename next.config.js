/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 's3.sa-east-1.amazonaws.com' },
    ],
  },
  env: {
    PUBLICATION_URL: process.env.PUBLICATION_URL,
    AUTHORIZATION_KEY: process.env.AUTHORIZATION_KEY,
    PLATFORM_URL: process.env.PLATFORM_URL,
    ORDER_URL: process.env.ORDER_URL,
  },
}

module.exports = nextConfig
