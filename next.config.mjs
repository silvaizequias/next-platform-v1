/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL ?? '',
    SECRET: process.env.SECRET ?? '',
    DATABASE_URL: process.env.DATABASE_URL ?? '',
    PLATFORM_AWS_ACCESS_KEY: process.env.PLATFORM_AWS_ACCESS_KEY ?? '',
    PLATFORM_AWS_PRIVATE_KEY: process.env.PLATFORM_AWS_PRIVATE_KEY ?? '',
  },
}

export default nextConfig
