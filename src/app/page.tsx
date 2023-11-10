import { Metadata } from 'next'
import LandingView from './views'

export const metadata: Metadata = {
  title: 'Apoio Técnico Especializado com Atendimento Personalizado',
  description: 'Suporte Técnico Especializado',
}

export default async function LandingPage() {
  return <LandingView />
}
