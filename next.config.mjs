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
    BASE_URL: process.env.BASE_URL ?? '',
    DATABASE_URL: process.env.DATABASE_URL ?? '',
    CONTROL_API_URL: process.env.CONTROL_API_URL ?? '',
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
