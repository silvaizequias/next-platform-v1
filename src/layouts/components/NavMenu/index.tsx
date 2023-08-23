import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { MdWindow } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { NavMenuProps } from '../types'

export default function NavMenu(props: NavMenuProps) {
  const { onClose } = props
  const router = useRouter()

  const handleNavigation = (url: string) => {
    router.push(url)
    onClose()
  }

  return (
    <MenuList>
      <MenuItem onClick={() => handleNavigation('/')}>
        <ListItemIcon>
          <MdWindow />
        </ListItemIcon>
        <ListItemText>Início</ListItemText>
      </MenuItem>
    </MenuList>
  )
}
