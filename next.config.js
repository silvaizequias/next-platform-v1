/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 's3.sa-east-1.amazonaws.com' },
    ],
  },
  env: {
    PUBLICATION_API_URL: process.env.PUBLICATION_API_URL,
    PUBLICATION_AUTHORIZATION_KEY: process.env.PUBLICATION_AUTHORIZATION_KEY,
  },
}

module.exports = nextConfig
