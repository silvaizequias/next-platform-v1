import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import {
  MdGroups,
  MdPayments,
  MdRecentActors,
  MdViewInAr,
  MdWindow,
} from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { NavMenuProps } from '../types'
import { Fragment } from 'react'
import { Divider } from '@mui/material'

export default function NavMenu(props: NavMenuProps) {
  const { onClose } = props
  const { user }: any = props.session?.user
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

      {user?.role == 'MASTER' && (
        <Fragment>
          <Divider />
          <MenuItem onClick={() => handleNavigation('/services')}>
            <ListItemIcon>
              <MdViewInAr />
            </ListItemIcon>
            <ListItemText>Serviços</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/users')}>
            <ListItemIcon>
              <MdGroups />
            </ListItemIcon>
            <ListItemText>Usuários</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/contracts')}>
            <ListItemIcon>
              <MdRecentActors />
            </ListItemIcon>
            <ListItemText>Contratos</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleNavigation('/invoices')}>
            <ListItemIcon>
              <MdPayments />
            </ListItemIcon>
            <ListItemText>Pagamentos</ListItemText>
          </MenuItem>
        </Fragment>
      )}
    </MenuList>
  )
}
