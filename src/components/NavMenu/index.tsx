import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import {
  MdGroups,
  MdLensBlur,
  MdRecentActors,
  MdViewInAr,
  MdWindow,
} from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { NavMenuProps } from './types'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export default function NavMenu(props: NavMenuProps) {
  const { onClose } = props
  const { user }: any = props
  const router = useRouter()

  const handleNavigation = (url: string) => {
    router.push(url)
    onClose()
  }

  return (
    <Box>
      <MenuList>
        <MenuItem onClick={() => handleNavigation('/')}>
          <ListItemIcon>
            <MdWindow />
          </ListItemIcon>
          <ListItemText>Início</ListItemText>
        </MenuItem>
      </MenuList>

      {user?.role == 'MASTER' && (
        <Accordion elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Master Control</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ m: 0, p: 0 }}>
            <MenuList>
              <MenuItem onClick={() => handleNavigation('/subscriptions')}>
                <ListItemIcon>
                  <MdRecentActors />
                </ListItemIcon>
                <ListItemText>Contratações</ListItemText>
              </MenuItem>

              <MenuItem onClick={() => handleNavigation('/services')}>
                <ListItemIcon>
                  <MdViewInAr />
                </ListItemIcon>
                <ListItemText>Serviços</ListItemText>
              </MenuItem>

              <MenuItem onClick={() => handleNavigation('/solutions')}>
                <ListItemIcon>
                  <MdLensBlur />
                </ListItemIcon>
                <ListItemText>Soluções</ListItemText>
              </MenuItem>

              <MenuItem onClick={() => handleNavigation('/users')}>
                <ListItemIcon>
                  <MdGroups />
                </ListItemIcon>
                <ListItemText>Usuários</ListItemText>
              </MenuItem>
            </MenuList>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  )
}
