'use client'

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Card, CardContent, Tab } from '@mui/material'
import { grey } from '@mui/material/colors'
import { SyntheticEvent, useState } from 'react'
import ProfileInformationTab from './tabs/ProfileInformationTab'
import ProfileAddressTab from './tabs/ProfileAddressTab'
import ProfilePasswordTab from './tabs/ProfilePasswordTab'

export default function ProfileRightGrid() {
  const [value, setValue] = useState<string>('informations')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card elevation={0} sx={{ flexGrow: 1 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 2, borderColor: grey[200] }}>
          <TabList onChange={handleChange} centered>
            <Tab value="informations" label="Informações" />
            <Tab value="address" label="Endereço" />
            <Tab value="password" label="Senha" />
          </TabList>
          <CardContent>
            <TabPanel value="informations">
              <ProfileInformationTab />
            </TabPanel>
            <TabPanel value="address">
              <ProfileAddressTab />
            </TabPanel>
            <TabPanel value="password">
              <ProfilePasswordTab />
            </TabPanel>
          </CardContent>
        </Box>
      </TabContext>
    </Card>
  )
}
