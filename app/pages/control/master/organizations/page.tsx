import { Metadata } from 'next'
import ListOrganizations from './views/ListOrganizations'

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
      <ListOrganizations />
    </div>
  )
}
