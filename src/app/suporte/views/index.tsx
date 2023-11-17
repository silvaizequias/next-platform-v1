import ButtonWithAction from '@/components/button-with-action'
import PageSection from '@/components/page-section'

export default function SupportView() {
  const services = [
    {
      icon: '',
      name: 'Correção de Falhas',
      path: '/suporte/correcao',
    },
    {
      icon: '',
      name: 'Migração',
      path: '/suporte/migracao',
    },
  ]

  return (
    <div className="sm:min-w-full">
      <PageSection
        title="Suporte especializado"
        subtitle="Experimente um atendimento totalmente personalizado"
        description="Se você precisa de suporte, o melhor apoio técnico para sua demanda está aqui!"
      >
        <div className="flex flex-col justify-center mx-2 sm:mx-8">
          <div className="flex flex-1 gap-4 justify-center mb-4 sm:mb-6">
            {services.map((service, index) => (
              <ButtonWithAction
                key={index}
                name={service.name}
                variant="shadow"
                color="primary"
                path={service.path}
              />
            ))}
          </div>
          <p className="pb-2 text-center text-xl uppercase font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
            Não acreditamos em soluções genéricas!
          </p>
          <p className="text-center">
            Oferecemos suporte técnico avançado de forma personalizada, moldado
            para atender às suas necessidades específicas.
          </p>
          <p className="text-center">
            Torne-se parte da nossa jornada de personalização e experimente um
            suporte que se adapta ao seu negócio.
          </p>
        </div>
      </PageSection>
      <PageSection
        title="Resoluções Rápidas e Pontuais"
        subtitle="Direcione sua demanda para quem entende do assunto"
        description="Nós nos adaptamos às suas necessidades específicas, para garantir que você receba o suporte que precisa para manter sua empresa funcionando sem problemas!"
      >
        <div className="flex justify-center shadow-md">
          <div className="py-8 min-w-full bg-slate-100 text-zinc-600 dark:bg-slate-900 dark:text-zinc-200">
            <div className="mx-2 sm:mx-40 md:mx-60 space-y-4">
              <p className="mx-auto text-justify">
                O suporte técnico é essencial para o sucesso de qualquer
                empresa. Afinal, se sua tecnologia não está funcionando sua
                produtividade e lucratividade ficam comprometidas.
              </p>
              <p className="mx-auto text-justify">
                A DEDICADO oferece suporte técnico avançado e personalizado para
                empresas de todos os tamanhos. Estamos prontos para atender a
                todas as necessidades do seu negócio, desde problemas simples
                até incidentes complexos.
              </p>
            </div>
          </div>
        </div>
      </PageSection>
      <PageSection
        title="Não comprometa seu negócio por falta de suporte"
        subtitle="Mantenha os clientes satisfeitos sem perder sua produtividade e lucratividade"
        description="O suporte técnico tradicional é muitas vezes insuficiente para atender às necessidades das empresas modernas e muitos clientes desistem de uma solução por nunca conseguirem suporte adequado!"
      >
        <div className="flex justify-center mx-2 sm:mx-8">
          <div className="md:mx-40">
            <h4 className="text-center text-xl uppercase font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
              Tenha uma experiência incrível e se surpreenda
            </h4>
            <p className="text-center">
              Entre em contato e descubra{' '}
              <span className="font-semibold text-blue-400 uppercase">
                como a DEDICADO pode oferecer apoio técnico
              </span>{' '}
              para o seu negócio.
            </p>
          </div>
        </div>
      </PageSection>
    </div>
  )
}
