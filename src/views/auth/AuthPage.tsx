'use client'

import { Box, CardContent, Tab, styled } from '@mui/material'
import MuiCard, { CardProps } from '@mui/material/Card'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useState } from 'react'
import SignInForm from './forms/SignInForm'
import SignUpForm from './forms/SignUpForm'
import ResetPasswordForm from './forms/ResetPasswordForm'

export default function AuthPage() {
  const [value, setValue] = useState<string>('signin')

  const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
    [theme.breakpoints.up('sm')]: { width: 450 },
  }))

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <Box className='content-center'>
        <Card sx={{ zIndex: 1 }}>
          <CardContent
            sx={{ p: (theme) => `${theme.spacing(13, 7, 6.5)} !important` }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChange}
                    aria-label='auth tabs'
                    centered
                  >
                    <Tab label='SignIn' value='signin' />
                    <Tab label='SignUp' value='signup' />
                    <Tab label='Reset Password' value='reset-password' />
                  </TabList>
                </Box>
                <TabPanel value='signin'>
                  <SignInForm />
                </TabPanel>
                <TabPanel value='signup'>
                  <SignUpForm />
                </TabPanel>
                <TabPanel value='reset-password'>
                  <ResetPasswordForm />
                </TabPanel>
              </TabContext>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
