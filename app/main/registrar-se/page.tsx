import { nextAuthOptions } from '@/libraries/next-auth'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import RegisterView from './views/RegisterView'
import { redirect } from 'next/navigation'
import PageDisplay from '@/components/PageDisplay'

export const metadata: Metadata = {
  title: {
    default: 'registrar-se na plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function RegisterPage() {
  const session = await getServerSession(nextAuthOptions)
  return !session ? (
    <PageDisplay
      title="registrar-se"
      subtitle="sua melhor plataforma de serviços"
    >
      <RegisterView />
    </PageDisplay>
  ) : (
    redirect('/')
  )
}
