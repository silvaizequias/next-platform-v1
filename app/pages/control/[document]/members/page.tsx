import { Metadata } from 'next'
import MemberList from './views/MemberList'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Controle de Memberos da Organizações na Plataforma',
    template: `%s | Dedicado`,
  },
}

export default function OrganizationMemberControlPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <MemberList />
    </div>
  )
}
