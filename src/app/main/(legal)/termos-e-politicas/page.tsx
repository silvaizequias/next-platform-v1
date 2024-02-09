import PageDisplay from '@/components/PageDisplay'
import dynamic from 'next/dynamic'

const TermsAndPoliciesView = dynamic(
  () => import('./views/TermsAndPoliciesView'),
  {
    ssr: false,
  },
)

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
