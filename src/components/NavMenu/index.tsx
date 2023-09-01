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
  const { profile }: any = props
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
        <MenuItem onClick={() => handleNavigation('/invoice-history')}>
          <ListItemIcon>
            <MdPayments />
          </ListItemIcon>
          <ListItemText>Histórico de Faturas</ListItemText>
        </MenuItem>
      </MenuList>

      {profile?.role == 'MASTER' && (
        <Accordion elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Master Control</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ m: 0, p: 0 }}>
            <MenuList>
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
            </MenuList>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  )
}
