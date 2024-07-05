import { Metadata } from 'next'
import ListMembers from '../../master/members/views/ListMembers'

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
      <ListMembers />
    </div>
  )
}
