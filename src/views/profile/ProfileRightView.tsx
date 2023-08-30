import { Box, Tab } from '@mui/material'
import { ProfileProps } from './types'
import { SyntheticEvent, useState } from 'react'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import ProfileAddressUpdate from './ProfileAddressUpdate'
import ProfilePasswordUpdate from './ProfilePasswordUpdate'
import ProfilePaymentUpdate from './ProfilePaymentUpdate'

export default function ProfileRightView(props: ProfileProps) {
  const { profile } = props

  const [value, setValue] = useState<string>('address-update')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label='Endereço' value='address-update' />
            <Tab label='Senha' value='password-update' />
            <Tab label='Pagamentos' value='payment-update' />
          </TabList>
        </Box>
        <TabPanel value='address-update'>
          <ProfileAddressUpdate profile={profile} />
        </TabPanel>
        <TabPanel value='password-update'>
          <ProfilePasswordUpdate profile={profile} />
        </TabPanel>
        <TabPanel value='payment-update'>
            <ProfilePaymentUpdate profile={profile} />
        </TabPanel>
      </TabContext>
    </Box>
  )
}
