import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Fragment, ReactNode } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'meu perfil na plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const session = await getServerSession(nextAuthOptions)
  return session ? <Fragment>{children}</Fragment> : redirect('/')
}
