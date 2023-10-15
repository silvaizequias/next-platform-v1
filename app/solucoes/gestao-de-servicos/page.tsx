import ServiceManagementView from '@/views/solutions/service-management'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestão de Serviços',
}

export default function ServiceManagementPage() {
  return <ServiceManagementView />
}
