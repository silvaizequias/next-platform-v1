import ManagerPage from '@/pages/manager/ManagerPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gerenciamento :: Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function Manager() {
  return <ManagerPage />
}
