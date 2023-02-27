/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: false,
  swcMinify: true,
  webpack: true,
  images: {
    domains: [],
  },
  transpilePackages: [
    '@fullcalendar/common',
    '@fullcalendar/react',
    '@fullcalendar/daygrid',
    '@fullcalendar/list',
    '@fullcalendar/timegrid',
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    ;(config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(
        __dirname,
        './node_modules/apexcharts-clevision',
      ),
    }),
      (config.resolve.fallback = { fs: false })

    return config
  },
  env: {
    NEXT_PUBLIC_SENDGRID_KEY: process.env.NEXT_PUBLIC_SENDGRID_KEY,
  },
}

module.exports = nextConfig
