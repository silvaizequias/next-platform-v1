import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
  env: {
    SECRET: process.env.SECRET ?? '',
    BASE_URL: process.env.BASE_URL ?? '',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? '',
    MANAGEMENT_API_URL: process.env.MANAGEMENT_API_URL ?? '',
    ORDER_API_URL: process.env.ORDER_API_URL ?? '',
    ZIPCODE_API_URL: process.env.ZIPCODE_API_URL ?? '',
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN ?? '',
    MAPBOX_STYLES: process.env.MAPBOX_STYLES ?? '',
    PLATFORM_AWS_ACCESS_KEY: process.env.PLATFORM_AWS_ACCESS_KEY ?? '',
    PLATFORM_AWS_PRIVATE_KEY: process.env.PLATFORM_AWS_PRIVATE_KEY ?? '',
    BEDROCK_AWS_MODEL: process.env.BEDROCK_AWS_MODEL ?? '',
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.sa-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
