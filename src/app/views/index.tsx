import PageSection from '@/components/page-section'

export default function LandingView() {
  return (
    <div className="flex-wrap mx-auto bg-gradient-to-r from-slate-400 to-transparent-50">
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
