'use client'

import { AppBar, Link, Stack, Toolbar, Typography } from '@mui/material'
import { Session } from 'next-auth'

interface Props {
  session: Session
}

export default function Topbar(props: Props) {
  const { session } = props

  return (
    <AppBar
      position="sticky"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
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
          {session?.user?.name}
        </Toolbar>
      </Stack>
    </AppBar>
  )
}
