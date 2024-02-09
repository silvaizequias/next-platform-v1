import nextMDX from '@next/mdx'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  env: {
    BASE_URL: process.env.BASE_URL,
    SECRET: process.env.SECRET,
    ORDER_API_URL: process.env.ORDER_API_URL,
    PLATFORM_API_URL: process.env.PLATFORM_API_URL,
    PUBLICATION_API_URL: process.env.PUBLICATION_API_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_EMAIL_FROM: process.env.SENDGRID_EMAIL_FROM,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    ZIPCODE_API_URL: process.env.ZIPCODE_API_URL,
  },
}

export default withMDX(nextConfig)
