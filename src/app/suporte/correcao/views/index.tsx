import PageSection from '@/components/page-section'

export default function CorrectionSupportView() {
  return (
    <div className="sm:min-w-full py-12">
      <PageSection
        title="Correção de falhas"
        subtitle="Resolva definitivamente as falhas e vulnerabilidades de sua aplicação"
        description="Nosso suporte especializado atua em demandas que exigem um elevado nível de conhecimento de causa. Nossa ação não visa apenas corrigir os erros, mas prevenir as possíveis falhas e vulnerabilidades futuras."
      >
        <div className="flex justify-center mx-2 sm:mx-8">
          <div className="mx-2 sm:mx-40 md:mx-60 space-y-4">
            <p className="mx-auto text-justify">
              Identificar e resolver rapidamente as falhas da aplicação é um dos
              principais desafios de nosso suporte.
            </p>
            <p className="mx-auto text-justify">
              Para um negócio ter sucesso não basta apenas garantir a presença
              online, mas tornar o ambiente do negócio seguro para seus
              usuários.
            </p>
            <p className="mx-auto text-justify">
              A atuação da DEDICADO possibilita identificar a causa raiz do
              problema, e traz a resposta precisa do que realmente é necessário
              fazer para resolver esse problema, de forma estratégica e
              profissional.
            </p>
            <h4 className="text-center text-xl uppercase font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
              Faça contato através do chat para que possamos mapear sua
              necessidade e oferecer o melhor plano para Correção e prevenção de
              falhas, tudo de forma personalizada!
            </h4>
          </div>
        </div>
      </PageSection>
    </div>
  )
}
