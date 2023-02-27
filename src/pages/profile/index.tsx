import { Grid } from '@mui/material'
import { getSession } from 'next-auth/react'
import themeConfig from 'src/configs/themeConfig'
import HeadSeo from 'src/layouts/components/seo/HeadSeo'

import ProfileViewLeft from 'src/views/pages/profile/ProfileViewLeft'
import ProfileViewRight from 'src/views/pages/profile/ProfileViewRight'

type Props = {
  tab: string
}

const Profile = ({ tab }: Props) => {
  return (
    <>
      <HeadSeo
        title='Meu Perfil'
        description={`${themeConfig.templateName} – Disponibilizamos uma ferramenta flexível e inovadora que aumenta a produtividade de pessoas e organizações`}
        image='/logo/logo-oc-600x270.png'
      />
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <ProfileViewLeft />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <ProfileViewRight tab={tab} />
        </Grid>
      </Grid>
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
export default Profile
