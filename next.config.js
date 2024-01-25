/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 's3.sa-east-1.amazonaws.com' },
    ],
  },
  env: {
    PUBLICATION_URL: process.env.PUBLICATION_URL,
    PUBLICATION_KEY: process.env.PUBLICATION_KEY,
    PLATFORM_MANAGEMENT_URL: process.env.PLATFORM_MANAGEMENT_URL,
  },
}

module.exports = nextConfig
