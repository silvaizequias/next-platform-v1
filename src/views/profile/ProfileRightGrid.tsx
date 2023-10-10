import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Card, CardContent, Tab } from '@mui/material'
import { ProfileProps } from './types'
import { SyntheticEvent, useState } from 'react'
import { blue } from '@mui/material/colors'
import {
  MdLocationPin,
  MdOutlineFolderShared,
  MdOutlineLockReset,
  MdViewInAr,
} from 'react-icons/md'
import ProfileInformationTab from './tabs/ProfileInformationTab'
import ProfilePasswordTab from './tabs/ProfilePasswordTab'
import ProfileAddressTab from './tabs/ProfileAddressTab'
import ProfileSubscriptions from './tabs/ProfileSubscriptionsTab'

export default function ProfileRightGrid(props: ProfileProps) {
  const { user } = props

  const [tabValue, setTabValue] = useState<string>('subscriptions')

  const handleTabValue = (event: SyntheticEvent, newTabValue: string) => {
    setTabValue(newTabValue)
  }

  return (
    <Card sx={{ width: '100%' }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: blue[600] }}>
          <TabList onChange={handleTabValue} centered>
            <Tab
              icon={<MdViewInAr />}
              iconPosition='start'
              label='Contratações'
              value='subscriptions'
            />
            <Tab
              icon={<MdOutlineFolderShared />}
              iconPosition='start'
              label='Informações'
              value='informations'
            />
            <Tab
              icon={<MdLocationPin />}
              iconPosition='start'
              label='Endereço'
              value='address'
            />
            <Tab
              icon={<MdOutlineLockReset />}
              iconPosition='start'
              label='Senha'
              value='password'
            />
          </TabList>
          <CardContent>
            <TabPanel value='subscriptions'>
              <ProfileSubscriptions user={user!} />
            </TabPanel>
            <TabPanel value='informations'>
              <ProfileInformationTab user={user!} />
            </TabPanel>
            <TabPanel value='address'>
              <ProfileAddressTab user={user!} />
            </TabPanel>
            <TabPanel value='password'>
              <ProfilePasswordTab user={user!} />
            </TabPanel>
          </CardContent>
        </Box>
      </TabContext>
    </Card>
  )
}
