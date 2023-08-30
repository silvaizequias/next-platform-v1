import ShowInDialog from '@/components/ShowInDialog'
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import { MouseEvent, useState } from 'react'
import { MdMoreVert, MdRemoveRedEye } from 'react-icons/md'

interface Props {
  id: string
}

export default function ServiceDataGridOptions({ id }: Props) {
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null)
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget)
  }

  const handleMenu = () => {
    setAnchorElMenu(null)
    setOpenDialog(!openDialog)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Tooltip title='Opções'>
        <IconButton sx={{ p: 0, color: 'dark' }} onClick={handleOpenMenu}>
          <MdMoreVert />
        </IconButton>
      </Tooltip>

      <Menu
        id='menu-options'
        anchorEl={anchorElMenu}
        keepMounted
        open={Boolean(anchorElMenu)}
        onClose={() => handleMenu()}
        transformOrigin={{ horizontal: 'right', vertical: 'center' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
        sx={{ mt: '15px' }}
      >
        <MenuItem onClick={handleMenu}>
          <ListItemIcon>
            <MdRemoveRedEye />
          </ListItemIcon>
          <ListItemText>Detalhes</ListItemText>
        </MenuItem>
      </Menu>
      <ShowInDialog onClose={handleMenu} open={openDialog}>
        {id}
      </ShowInDialog>
    </Box>
  )
}
