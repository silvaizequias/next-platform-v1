import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import HeadSeo from 'src/layouts/components/seo/HeadSeo'
import SignInPage from 'src/views/pages/auth/SignInPage'

const SignIn = () => {
  return (
    <>
      <HeadSeo
        title='Acesso ao Portal'
        description='Somos estrategistas, designers e desenvolvedores. Inovadores e solucionadores de problemas. Pequeno o suficiente para ser simples e rápido, mas grande o bastante para fornecer a estrutura e escopo que você deseja, no ritmo que você precisa.'
        image='/logo/500x250-logotipo8.png'
      />
      <SignInPage />
    </>
  )
}

SignIn.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default SignIn
