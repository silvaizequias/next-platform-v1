import Topbar from '@/components/Topbar'
import { nextAuthOptions } from '@/libraries/next-auth'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
} from '@mui/material'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Fragment, ReactNode } from 'react'
import { actionGetProfile } from './(management)/profile/actions'

export const metadata: Metadata = {
  title: {
    default: 'sua melhor plataforma de serviços',
    template: `%s | dedicado`,
  },
  description:
    'soluções personalizadas de sistemas de alta performance que aumentam a produtividade de pessoas e organizações',
}

export default async function MainLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(nextAuthOptions)
  const profile = await actionGetProfile(session!)

  return (
    <Fragment>
      <Topbar profile={profile} session={session!} />
      {children}
    </Fragment>
  )
}
