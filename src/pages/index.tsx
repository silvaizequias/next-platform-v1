import { getSession } from 'next-auth/react'
import HeadSeo from 'src/layouts/components/seo/HeadSeo'
import IndexPage from 'src/views/pages/IndexPage'

const Index = () => {
  const systemName = process.env.NEXT_PUBLIC_SYSTEM_NAME as string

  return (
    <>
      <HeadSeo
        title={systemName}
        description='Nossa proposta é oferecer um sistema personalizado, fácil de utilizar e que aumente a proditividade de pessoas e organizações!'
        image='/logo/500x250-logotipo8.png'
      />
      <IndexPage />
    </>
  )
}

//@ts-ignore
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
export default Index
