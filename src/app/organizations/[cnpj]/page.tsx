import { authOptions } from '@/libraries/next-auth'
import OrganizationDetailView from '@/views/organizations/OrganizationDetailView'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Detalhes da Organização',
}
export default async function OrganizationDetailPage({
  params,
}: {
  params: { cnpj: string }
}) {
  const session = await getServerSession(authOptions)
  const { cnpj } = params

  return session ? (
    <main>
      <OrganizationDetailView cnpj={cnpj!} session={session} />
    </main>
  ) : (
    redirect('/')
  )
}
