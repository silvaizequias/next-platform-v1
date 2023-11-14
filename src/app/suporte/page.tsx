import { Metadata } from 'next'
import SupportView from './views'

export const metadata: Metadata = {
  title: 'Apoio Técnico Especializado com Atendimento Personalizado',
  description: 'Suporte Técnico Especializado',
}

export default async function SupportPage() {
  return <SupportView />
}
