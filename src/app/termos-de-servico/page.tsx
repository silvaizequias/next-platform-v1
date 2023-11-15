import { Metadata } from 'next'
import TermsOfServiceView from './views'

export const metadata: Metadata = {
  title: 'Termos de Serviços',
  description:
    'Terms de consentimento para contratação e utilização das soluções personalizadas de sistemas e serviços da Dedicado!',
}

export default async function TermsOfServicePage() {
  return <TermsOfServiceView />
}
