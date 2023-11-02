'use client'

import { Box } from '@mui/material'
import { Session } from 'next-auth'
import { usePathname } from 'next/navigation'
import AddPost from './AddPost'
import AddOrder from './AddOrder'

export default function ActionsToolbar({ session }: { session: Session }) {
  const pathname = usePathname()

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      {(pathname.includes('blog') && <AddPost session={session} />) ||
        (pathname.includes('gestao-de-servicos') && (
          <AddOrder session={session} />
        ))}
    </Box>
  )
}
