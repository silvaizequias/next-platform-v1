import PageSection from '@/components/page-section'

export default function MigrationSupportView() {
  return (
    <div className="sm:min-w-full py-12">
      <PageSection
        title="Migração de Conteúdo"
        subtitle="Garanta a disponibilidade de sua aplicação no processo de migração"
        description="Oferecemos suporte especializado para clientes que necessitam migrar os dados de sua aplicação para outra estrutura, sem comprometer a disponibilidade ou a consistência das informações."
      >
        <div className="flex justify-center mx-2 sm:mx-8">
          <div className="mx-2 sm:mx-40 md:mx-60 space-y-4">
            <p className="mx-auto text-justify">
              O procedimento de migração de qualquer dado precisa ser estudado, estruturado, programado e bem planejado, para garantir que nenhuma informação se perca.
            </p>
            <p className="mx-auto text-justify">
              Durante esse processo é primordial utilizar a melhor tecnologia e a ferramenta adequada para cada cenário, afim de que o processo não gere desgastes e prejuizos futuros.
            </p>
            <p className="mx-auto text-justify">
              Nós da DEDICADO utilizamos as melhores práticas unidas de vasta experiência com migração dados entre plataformas. Oferecemos apoio completo, desde o planejamento até a validação das informações no ambiente de destino.
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
