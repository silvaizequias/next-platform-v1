import { Box } from '@mui/material'
import { ReactNode } from 'react'
import Topbar from './components/topbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libraries/next-auth'
import { grey } from '@mui/material/colors'

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <Box>
      <Topbar session={session!} />
      <Box
        component={'main'}
        sx={{ display: 'flex', bgcolor: grey[200], minHeight: '100vh' }}
      >
        {children}
      </Box>
    </Box>
  )
}
