'use client'

import { AppBar, Link, Stack, Toolbar } from '@mui/material'
import UserMenu from './UserMenu'
import { UserType } from '@/app/main/(management)/users/types'
import { Session } from 'next-auth'
import UserAuth from './UserAuth'
import { blue } from '@mui/material/colors'
import { theme } from '@/app/theme'

interface Props {
  profile: UserType | any
  session: Session
}

export default function Topbar(props: Props) {
  const { profile, session } = props

  return (
    <AppBar
      position="sticky"
      enableColorOnDark
      color="transparent"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        bgcolor:
          theme.palette.mode === 'light'
            ? 'rgba(0, 100, 180, 0.5)'
            : 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(5px)',
      }}
    >
      <Stack
        sx={{
          maxWidth: 'md',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Toolbar sx={{ flexGrow: 1 }}>
          <Link
            href={'/'}
            underline="none"
            variant="h6"
            fontWeight={600}
            color={'white'}
          >
            dedicado
          </Link>
        </Toolbar>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          {session ? <UserMenu profile={profile} /> : <UserAuth />}
        </Toolbar>
      </Stack>
    </AppBar>
  )
}
