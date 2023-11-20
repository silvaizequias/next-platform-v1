import { authOptions } from '@/libraries/next-auth'
import SignInView from '@/views/auth/sign-in-view'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(`${NEXTAUTH_URL}`),
  title: 'Registrar-se no Portal Dedicado',
  description: 'Página de registro de acesso ao Portal Dedicado!',
  keywords: [
    'tecnologia digital',
    'ferramenta de gestão empresarial',
    'soluções de tecnologia',
    'suporte técnico',
    'suporte especializado',
  ],
  alternates: {
    canonical: `${NEXTAUTH_URL}/registrar-se`,
  },
  openGraph: {
    url: new URL(`${NEXTAUTH_URL}/registrar-se`),
    title: 'Registrar-se no Portal Dedicado',
    description: 'Página de registro de acesso ao Portal Dedicado!',
    images: '/logotipo5.png',
    locale: 'pt_BR',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
}

export default async function SignInPage() {
  const session = await getServerSession(authOptions)

  return !session ? <SignInView /> : redirect('/')
}
