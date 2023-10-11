import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Button, Divider, Tab } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import AuthSignInForm from './forms/AuthSignInForm'
import AuthSignUpForm from './forms/AuthSignUpForm'
import AuthResetPasswordForm from './forms/AuthResetPasswordForm'
import { MdBadge, MdOutlineLogin, MdOutlinePassword } from 'react-icons/md'
import { signIn } from 'next-auth/react'
import { blue, grey } from '@mui/material/colors'
import { FcGoogle } from 'react-icons/fc'
import { usePathname } from 'next/navigation'

export default function AuthTabsView() {
  const [value, setValue] = useState<string>('sign-in')
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const pathname = usePathname()

  const handleGoogleSignIn = async () => {
    await signIn('google')
  }

  return (
    <TabContext value={value}>
      {pathname !== '/' && (
        <Box sx={{ mx: 4 }}>
          <Button
            fullWidth
            size='small'
            variant='contained'
            color='info'
            sx={{ mx: 'auto' }}
            onClick={handleGoogleSignIn}
            startIcon={<FcGoogle />}
          >
            Acesse com o Google
          </Button>
          <Divider
            sx={{
              textAlign: 'center',
              color: blue[600],
              textTransform: 'uppercase',
              fontSize: 9,
              p: 2,
            }}
          >
            ou
          </Divider>
        </Box>
      )}
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
