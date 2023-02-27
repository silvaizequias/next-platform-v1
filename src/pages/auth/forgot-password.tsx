import { getSession } from 'next-auth/react'
import { ReactNode } from 'react'

import BlankLayout from 'src/@core/layouts/BlankLayout'
import HeadSeo from 'src/layouts/components/seo/HeadSeo'
import ForgotPasswordPage from 'src/views/pages/auth/ForgotPasswordPage'

const ForgotPassword = () => {
  return (
    <>
      <HeadSeo
        title='Redefinir a Senha'
        description='Somos estrategistas, designers e desenvolvedores. Inovadores e solucionadores de problemas. Pequeno o suficiente para ser simples e rápido, mas grande o bastante para fornecer a estrutura e escopo que você deseja, no ritmo que você precisa.'
        image='/logo/500x250-logotipo8.png'
      />
      <ForgotPasswordPage />
    </>
  )
}

ForgotPassword.getLayout = (page: ReactNode) => (
  <BlankLayout>{page}</BlankLayout>
)

//@ts-ignore
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (session) {

    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default ForgotPassword
