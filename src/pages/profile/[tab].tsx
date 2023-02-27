import { useSession } from 'next-auth/react'
import {
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next/types'

import ProfileViewPage from 'src/views/pages/profile/ProfileViewPage'

const ProfileView = ({
  tab,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: session } = useSession()

  return session ? <ProfileViewPage tab={tab} /> : null
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { tab: 'logs' } }, { params: { tab: 'security' } }],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  return {
    props: {
      tab: params?.tab,
    },
  }
}

export default ProfileView
