import { authOptions } from '@/libraries/next-auth'
import CorrectionSupportView from '@/views/support/correction-support'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function CorrectionSupportPage() {
  const session = await getServerSession(authOptions)

  return !session ? <CorrectionSupportView /> : redirect('/servicos')
}
