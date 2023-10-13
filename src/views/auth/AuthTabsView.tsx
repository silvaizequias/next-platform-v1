import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import AuthSignInForm from './forms/AuthSignInForm'
import AuthSignUpForm from './forms/AuthSignUpForm'
import AuthResetPasswordForm from './forms/AuthResetPasswordForm'
import { MdBadge, MdOutlineLogin, MdOutlinePassword } from 'react-icons/md'
import { blue, grey } from '@mui/material/colors'

export default function AuthTabsView() {
  const [value, setValue] = useState<string>('sign-in')
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
            icon={<MdOutlineLogin />}
            iconPosition='start'
            label='Acessar'
            value='sign-in'
          />
          <Tab
            icon={<MdBadge />}
            iconPosition='start'
            label='Registrar'
            value='sign-up'
          />
          <Tab
            icon={<MdOutlinePassword />}
            iconPosition='start'
            label='Redefinir'
            value='reset-password'
          />
        </TabList>
      </Box>
      <TabPanel value='sign-in'>
        <AuthSignInForm />
      </TabPanel>
      <TabPanel value='sign-up'>
        <AuthSignUpForm />
      </TabPanel>
      <TabPanel value='reset-password'>
        <AuthResetPasswordForm />
      </TabPanel>
    </TabContext>
  )
}
