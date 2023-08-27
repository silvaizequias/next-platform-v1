import { Avatar, Box, Drawer, IconButton } from '@mui/material'
import { DrawerNavBarProps } from '../types'
import { MdClear, MdLensBlur } from 'react-icons/md'
import NavMenu from '../NavMenu'
import { blue } from '@mui/material/colors'

export default function DrawerNavBar(props: DrawerNavBarProps) {
  const { open, onClose, session } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Drawer
      open={open}
      anchor='left'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: 210 } }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1.5,
          bgcolor: blue[800],
        }}
      >
        <Avatar
          sx={{ cursor: 'pointer', bgcolor: blue[500] }}
          alt='Dedicado Digital'
          variant='rounded'
        >
          <MdLensBlur />
        </Avatar>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{ color: 'text.secondary' }}
        >
          <MdClear />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', py: 2 }}>
        <NavMenu onClose={handleClose} session={session} />
      </Box>
    </Drawer>
  )
}
