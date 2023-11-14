import ButtonWithAction from '@/components/button-with-action'
import PageSection from '@/components/page-section'

export default function LandingView() {
  return (
    <div className="flex-wrap mx-auto dark:bg-gradient-to-r from-slate-600 to-slate-800">
      <div className="sm:mx-8 mx-2">
        <PageSection
          title="Dedicado"
          subtitle="Suporte e Desenvolvimento"
          description="Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações"
        >
          <div className="flex justify-center"></div>
        </PageSection>
      </div>
    </div>
  )
}
