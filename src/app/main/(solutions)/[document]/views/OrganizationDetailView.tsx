'use client'

import { OrganizationType } from '@/app/main/(management)/organizations/types'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { SyntheticEvent, useState } from 'react'
import MyOrganizationUsersListView from '../usuarios/views/MyOrganizationUsersListView'
import MyOrganizationSubscriptionsListView from '../creditos/views/MyOrganizationSubscriptionsListView'

interface Props {
  organization: OrganizationType | any
}

export default function OrganizationDetailView(props: Props) {
  const { organization } = props

  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  return (
    <Box sx={{ maxWidth: 'md', width: '100%', padding: '10px' }}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            sx={{ width: '33%', flexShrink: 0, textTransform: 'lowercase' }}
          >{`créditos da organização ${organization?.name}`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack gap={2} alignContent={'center'} alignItems={'center'}>
            <MyOrganizationSubscriptionsListView
              subscriptions={organization?.subscriptions}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded onChange={handleChange('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            sx={{ width: '33%', flexShrink: 0, textTransform: 'lowercase' }}
          >
            {`usuários da organização ${organization?.name}`}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack gap={2} alignContent={'center'} alignItems={'center'}>
            <MyOrganizationUsersListView data={organization?.users} />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
