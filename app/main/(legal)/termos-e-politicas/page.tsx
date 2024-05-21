import PageDisplay from '@/components/PageDisplay'
import { Metadata } from 'next'
import TermsAndPoliciesView from './views/TermsAndPoliciesView'

export const metadata: Metadata = {
  title: {
    default: 'termos e políticas de utilização da plataforma',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
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
