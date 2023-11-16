import PageSection from '@/components/page-section'

export default function SupportView() {
  return (
    <div className="sm:min-w-full">
      <PageSection
        title="Suporte especializado"
        subtitle="Experimente um atendimento totalmente personalizado"
        description="Se você precisa de suporte, o melhor apoio técnico para sua operação está aqui!"
      >
        <div className="flex flex-col justify-center mx-2 sm:mx-8">
          <p className="text-center text-xl uppercase text-blue-600 font-medium">
            Não acreditamos em soluções genéricas!
          </p>
          <p className="text-center">
            Oferecemos suporte técnico avançado personalizado, moldado para
            atender às suas necessidades específicas.
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
        <div className="flex justify-center mx-2 sm:mx-8">
          <div className="dark:bg-slate-200 bg-slate-800 text-slate-200 dark:text-slate-800 rounded-md p-4 md:mx-40">
            <p className="text-justify">
              O suporte técnico é essencial para o sucesso de qualquer empresa.
              Afinal, quando sua tecnologia não está funcionando, sua
              produtividade e lucratividade ficam comprometidas.
            </p>
            <p className="text-justify">
              A DEDICADO oferece suporte técnico avançado e personalizado para
              empresas de todos os tamanhos. Nossos especialistas estão
              preparados para atender a todas as suas necessidades, desde
              problemas simples até incidentes complexos.
            </p>
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
            <p className="text-justify">
              Personalize seu suporte agora! Entre em contato para uma avaliação
              gratuita e descubra como a DEDICADO pode revolucionar o suporte
              técnico do seu negócio.
            </p>
          </div>
        </div>
      </PageSection>
    </div>
  )
}
