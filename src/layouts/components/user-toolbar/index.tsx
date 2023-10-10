import { UserToolbarProps } from '@/layouts/types'
import { Avatar, Box, IconButton, Toolbar, Tooltip } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function UserToolbar(props: UserToolbarProps) {
  const { user } = props.session
  const router = useRouter()

  return (
    <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'right' }}>
      <Box>
        <Tooltip title={user?.name}>
          <IconButton
            sx={{ p: 0, ml: 1 }}
            size='medium'
            onClick={() => router.push('/profile')}
          >
            <Avatar alt={user?.name!} src={user?.image! || '/avatar.png'} />
          </IconButton>
        </Tooltip>
      </Box>
    </Toolbar>
  )
}
