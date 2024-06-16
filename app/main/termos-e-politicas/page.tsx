import PageDisplay from '@/components/PageDisplay'
import { Metadata } from 'next'
import TermsAndPoliciesView from './views/TermsAndPoliciesView'

export const metadata: Metadata = {
  title: {
    default: 'Termos e Políticas de Utilização da Plataforma',
    template: `%s | Dedicado`,
  },
  description:
    'A dedicado oferece soluções personalizadas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function TermsAndPoliciesPage() {
  return (
    <PageDisplay
      title="termos e políticas de utilização da dedicado"
      subtitle="sua melhor plataforma de serviços"
    >
      <TermsAndPoliciesView />
    </PageDisplay>
  )
}
