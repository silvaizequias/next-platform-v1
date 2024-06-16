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
    SECRET: process.env.SECRET ?? '',
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY ?? '',
    AWS_PRIVATE_KEY: process.env.AWS_PRIVATE_KEY ?? '',
    AWS_BEDROCK_REGION: process.env.AWS_BEDROCK_REGION ?? '',
    AWS_S3_REGION: process.env.AWS_S3_REGION ?? '',
    AWS_SES_REGION: process.env.AWS_SES_REGION ?? '',
    AWS_SNS_REGION: process.env.AWS_SNS_REGION ?? '',
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? '',
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ?? '',
  },
  images: {
    dangerouslyAllowSVG: true,
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
