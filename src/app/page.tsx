import AccountPage from '@/pages/account/AccountPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dedicado Digital',
  description: 'Sistema Dedicado Personalizado',
}

export default async function Account() {
  return <AccountPage />
}
