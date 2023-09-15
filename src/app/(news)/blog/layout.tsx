import { LayoutProps } from '@/types'
import { Container } from '@mui/material'
import { Metadata } from 'next'
import { Fragment } from 'react'

export const metadata: Metadata = {
  applicationName: 'Dedicado Digital',
  generator: 'Dedicado Digital',
  category: 'technology',
  title: 'Blog :: Dedicado Digital',
  description:
    'Prepare-se para mergulhar na era da eficiência digital enquanto navegamos pelo universo dos serviços de software na nuvem.',
  keywords: ['tecnologia da informação', 'era digital', 'blog de tecnologia'],
  icons: { icon: '/favicon.ico' },
  alternates: {
    canonical: process.env.NEXTAUTH_URL!,
  },
  openGraph: {
    siteName: 'Dedicado Digital',
    type: 'website',
    title: 'Blog :: Dedicado Digital',
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
