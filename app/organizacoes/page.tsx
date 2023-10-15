import OrganizationsView from '@/views/organizations'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Organizações',
}

export default function OrganizationsPage() {
  return <OrganizationsView />
}
