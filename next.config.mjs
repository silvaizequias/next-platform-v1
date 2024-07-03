import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
    turbo: {
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
        '.json',
      ],
    },
  },
  env: {
    BASE_URL: process.env.BASE_URL ?? '',
    SECRET: process.env.SECRET ?? '',
    DATABASE_URL: process.env.DATABASE_URL ?? '',
    PLATFORM_AWS_ACCESS_KEY: process.env.PLATFORM_AWS_ACCESS_KEY ?? '',
    PLATFORM_AWS_PRIVATE_KEY: process.env.PLATFORM_AWS_PRIVATE_KEY ?? '',
    PLATFORM_AWS_BEDROCK_REGION: process.env.PLATFORM_AWS_BEDROCK_REGION ?? '',
    PLATFORM_AWS_S3_REGION: process.env.PLATFORM_AWS_S3_REGION ?? '',
    PLATFORM_AWS_SES_REGION: process.env.PLATFORM_AWS_SES_REGION ?? '',
    PLATFORM_AWS_SNS_REGION: process.env.PLATFORM_AWS_SNS_REGION ?? '',
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? '',
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ?? '',
    SENDING_EMAIL_FROM: process.env.SENDING_EMAIL_FROM ?? '',
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
