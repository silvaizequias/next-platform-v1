import { Metadata } from 'next'
import OrganizationList from './views/OrganizationList'

export const metadata: Metadata = {
  alternates: {
    canonical: 'master/organizations',
  },
  title: {
    default: 'Controle de Organizações da Plataforma',
    template: `%s | Dedicado`,
  },
}

export default function OrganizationControlPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <OrganizationList />
    </div>
  )
}
