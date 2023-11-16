import PageSection from '@/components/page-section'

export default function LandingView() {
  return (
    <PageSection
      title="Dedicado"
      subtitle="Suporte e Desenvolvimento"
      description="Soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações"
    >
      <div className="flex justify-center">
        <h4 className="text-center text-xl uppercase text-blue-400 font-semibold">
          Faça contato através do chat e conheça melhor nossos serviços!
        </h4>
      </div>
    </PageSection>
  )
}
