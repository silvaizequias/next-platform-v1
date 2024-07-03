import { Metadata } from 'next'
import MemberList from './views/MemberList'

export const metadata: Metadata = {
  alternates: {
    canonical: 'master/members',
  },
  title: {
    default: 'Controle de Memberos de Organizações na Plataforma',
    template: `%s | Dedicado`,
  },
}

export default function MemberControlPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <MemberList />
    </div>
  )
}
