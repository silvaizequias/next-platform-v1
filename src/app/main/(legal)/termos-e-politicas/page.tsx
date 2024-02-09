import PageDisplay from '@/components/PageDisplay'
import TermsOfServices from './views/termos-of-services.mdx'

export default async function TermsAndPoliciesPage() {
  return (
    <PageDisplay
      title="termos e políticas de utilização da dedicado"
      subtitle="sua melhor plataforma de serviços"
    >
      <div className="prose">
        <TermsOfServices />
      </div>
    </PageDisplay>
  )
}
