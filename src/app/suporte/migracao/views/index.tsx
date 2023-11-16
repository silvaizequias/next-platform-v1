import PageSection from '@/components/page-section'

export default function MigrationSupportView() {
  return (
    <div className="flex flex-col">
      <PageSection
        title="Migração de Conteúdo"
        subtitle="Garanta a disponibilidade de sua aplicação no processo de migração"
        description="Oferecemos suporte especializado para clientes que necessitam migrar os dados de sua aplicação para outra estrutura, sem comprometer a disponibilidade ou a consistência das informações."
      >
        <div className="flex justify-center mx-2 sm:mx-8">
          <div className="mx-2 sm:mx-40 md:mx-60 space-y-4">
            <p className="mx-auto text-justify">
              O procedimento de migração de qualquer dado precisa ser estudado e programado e planejado para garantir que nenhuma informação será perdida
            </p>
            <p className="mx-auto text-justify">
              Durante esse processo é primordial utilizar a melhor tecnologia para que o processo não gere desgaste e prejuizos futuros. Ele precisa ser executado sem falhas visando não impactar o a disponibilidade para os seus usuários.
            </p>
            <p className="mx-auto text-justify">
              Nós da DEDICADO utilizamos as melhores práticas unidas da vasta experiência de migração dados entre plataformas. Oferecemos apoio completo, desde o planejamento até a validação das informações no ambiente de destino.
            </p>
            <h4 className="text-center text-xl uppercase font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
              Faça contato através do chat para que possamos mapear sua necessidade e oferecer o melhor plano de migração de forma personalizada!
            </h4>
          </div>
        </div>
      </PageSection>
    </div>
  )
}
