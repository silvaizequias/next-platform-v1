import PageDisplay from '@/components/PageDisplay'
import TermsAndPoliciesView from './views/TermsAndPoliciesView'

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
