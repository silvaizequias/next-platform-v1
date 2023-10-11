import { SyntheticEvent, useState } from 'react'
import { OrganizationUserProps } from '../types'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import { MdDomain, MdHomeWork } from 'react-icons/md'
import { blue, grey } from '@mui/material/colors'
import OrganizationOfUser from './OrganizationOfUser'
import UserOnOrganization from './UserOnOrganization'

export default function OrganizationTab(props: OrganizationUserProps) {
  const { user } = props

  const [value, setValue] = useState<string>('organizations')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabContext value={value}>
      <Box
        sx={{
          borderBottom: 4,
          borderColor: blue[600],
          bgcolor: grey[50],
        }}
      >
        <TabList onChange={handleChange} centered>
          <Tab
            icon={<MdHomeWork />}
            iconPosition='start'
            label='Minhas Organizações'
            value={'organizations'}
          />
          <Tab
            icon={<MdDomain />}
            iconPosition='start'
            label='Organizações em que Sou Membro'
            value={'orgs'}
          />
        </TabList>
      </Box>
      <TabPanel value={'organizations'}>
        <UserOnOrganization organizations={user?.organizations!} />
      </TabPanel>
      <TabPanel value={'orgs'}>
        <OrganizationOfUser orgs={user?.orgs!} />
      </TabPanel>
    </TabContext>
  )
}
