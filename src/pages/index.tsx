import BlankLayout from 'src/@core/layouts/BlankLayout'
import { ReactNode } from 'react'

import HeadSeo from 'src/layouts/components/seo/HeadSeo'
import LandingPage from 'src/views/pages/landing/LandingPage'

const Index = () => {
  return (
    <>
      <HeadSeo
        title='Soluções Criativas para Enriquecer seu Negócio'
        description='Somos estrategistas, designers e desenvolvedores. Inovadores e solucionadores de problemas. Pequeno o suficiente para ser simples e rápido, mas grande o bastante para fornecer a estrutura e escopo que você deseja, no ritmo que você precisa.'
        image='/logo/500x250-logotipo8.png'
      />
      <LandingPage />
    </>
  )
}
Index.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Index
