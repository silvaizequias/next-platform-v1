import ServiceView from '@/views/service'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gestão de Serviços',
}

export default function ServicePage() {
  return <ServiceView />
}
