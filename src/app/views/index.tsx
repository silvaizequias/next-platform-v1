import ButtonWithAction from '@/components/button-with-action'
import PageSection from '@/components/page-section'

export default function LandingView() {
  return (
    <div className="flex-wrap mx-auto">
      <div className="">
        <PageSection
          title="Suporte especializado"
          subtitle="experimente um atendimento totalmente personalizado"
          description="O melhor apoio técnico para sua operação está aqui"
        />
      </div>
      <div className="">
        <PageSection
          title="Resoluções Rápidas e Pontuais"
          subtitle="Direcione sua demanda para quem entende do assunto"
        />
      </div>
      <div className="">
        <PageSection
          title="Pare de Perder Clientes"
          subtitle="Muitos clientes desistem de uma solução por nunca conseguirem suporte adequado"
        >
          <div className="flex justify-center">
            <ButtonWithAction name="Contate-nos" />
          </div>
        </PageSection>
      </div>
    </div>
  )
}
