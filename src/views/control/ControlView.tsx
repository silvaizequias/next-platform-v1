'use client'

import PageHeader from '@/components/PageHeader'
import { PageViewProps } from '@/types'
import { Box, Container, Grid, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { SyntheticEvent, useState } from 'react'
import { MdGroups, MdRecentActors, MdViewInAr } from 'react-icons/md'
import ServiceControlTab from './services/ServiceControlTab'
import SubscriptionsControlTab from './subscriptions/SubscriptionsControlTab'
import UsersControlTab from './users/UsersControlTab'

export default function ControlView(props: PageViewProps) {
  const [value, setValue] = useState<string>('services')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12}>
          <PageHeader metadata={props.metadata!} />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} centered>
                  <Tab
                    icon={<MdViewInAr />}
                    iconPosition='start'
                    label='Serviços'
                    value='services'
                  />
                  <Tab
                    icon={<MdRecentActors />}
                    iconPosition='start'
                    label='Contratações'
                    value='subscriptions'
                  />
                  <Tab
                    icon={<MdGroups />}
                    iconPosition='start'
                    label='Usuários'
                    value='users'
                  />
                </TabList>
              </Box>
              <TabPanel value='services'>
                <ServiceControlTab />
              </TabPanel>
              <TabPanel value='subscriptions'>
                <SubscriptionsControlTab />
              </TabPanel>
              <TabPanel value='users'>
                <UsersControlTab />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
