import { authOptions } from '@/libraries/next-auth'
import MigrationSupportView from '@/views/support/migration-support'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function MigrationSupportPage() {
  const session = await getServerSession(authOptions)

  return !session ? <MigrationSupportView /> : redirect('/servicos')
}
