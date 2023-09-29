import { Box, Drawer, IconButton, Tooltip, Typography } from '@mui/material'
import { ShowInDrawerProps } from './types'
import { blue, red } from '@mui/material/colors'
import { MdDisabledByDefault } from 'react-icons/md'

export default function ShowInDrawer(props: ShowInDrawerProps) {
  const { children, onClose, open, title } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: 300 } }}
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
        <Typography variant='h6' color={'white'}>
          {title}
        </Typography>
        <Tooltip title='Fechar'>
          <IconButton sx={{ p: 0, color: red[500] }} onClick={onClose}>
            <MdDisabledByDefault />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', p: 1.5 }}>
        {children}
      </Box>
    </Drawer>
  )
}
