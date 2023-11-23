import { authOptions } from '@/libraries/next-auth'
import PasswordResetView from '@/views/auth/password-reset-view'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL!

export const metadata: Metadata = {
  metadataBase: new URL(`${NEXTAUTH_URL}`),
  title: 'Redefinir Senha',
  description: 'Página de redefinição de acesso ao Portal Dedicado!',
  keywords: [
    'tecnologia digital',
    'ferramenta de gestão empresarial',
    'soluções de tecnologia',
    'suporte técnico',
    'suporte especializado',
  ],
  alternates: {
    canonical: `${NEXTAUTH_URL}/redefinir-senha`,
  },
  openGraph: {
    url: new URL(`${NEXTAUTH_URL}/redefinir-senha`),
    title: 'Redefinir Senha',
    description: 'Página de redefinição de acesso ao Portal Dedicado!',
    images: '/logotipo5.png',
    locale: 'pt_BR',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
}

export default async function PasswordResetPage() {
  const session = await getServerSession(authOptions)

  return !session ? <PasswordResetView /> : redirect('/')
}
