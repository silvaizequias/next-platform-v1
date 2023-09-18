import { LayoutProps } from '@/types'
import { Container } from '@mui/material'
import { Metadata } from 'next'
import { Fragment } from 'react'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(NEXTAUTH_URL),
  applicationName: 'Dedicado Digital',
  generator: 'Dedicado Digital',
  category: 'technology',
  title: { default: 'Dedicado Digital', template: `%s | Dedicado Digital` },
  description:
    'Prepare-se para mergulhar na era da eficiência digital enquanto navegamos pelo universo dos serviços de software na nuvem.',
  keywords: ['tecnologia da informação', 'era digital', 'blog de tecnologia'],
  robots: { index: true, follow: true, nocache: true },
  icons: { icon: '/favicon.ico' },
  alternates: {
    canonical: `${NEXTAUTH_URL}/blog`,
  },
  openGraph: {
    url: new URL(NEXTAUTH_URL),
    siteName: 'Dedicado Digital',
    type: 'website',
    title: { default: 'Dedicado Digital', template: `%s | Dedicado Digital` },
    description:
      'Prepare-se para mergulhar na era da eficiência digital enquanto navegamos pelo universo dos serviços de software na nuvem.',
    images: '/500x500-logotipo5.png',
    locale: 'pt_BR',
  },
}

export default async function BlogLayout(props: LayoutProps) {
  const { children } = props

  return (
    <Fragment>
      <Container maxWidth='xl'>{children}</Container>
    </Fragment>
  )
}
