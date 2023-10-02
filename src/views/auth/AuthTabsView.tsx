import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import AuthSignInForm from './forms/AuthSignInForm'
import AuthSignUpForm from './forms/AuthSignUpForm'
import AuthResetPasswordForm from './forms/AuthResetPasswordForm'
import { MdBadge, MdOutlineLogin, MdOutlinePassword } from 'react-icons/md'
import { signIn } from 'next-auth/react'

export default function AuthTabsView() {
  const [value, setValue] = useState<string>('sign-in')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleGoogleSignIn = async () => {
    await signIn('google')
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
    </Box>
  )
}
