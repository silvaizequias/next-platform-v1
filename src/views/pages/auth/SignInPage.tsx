import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'

import Link from 'next/link'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel'

import Icon from 'src/@core/components/icon'

import BlankLayout from 'src/@core/layouts/BlankLayout'

import FooterIllustrationsV1 from './FooterIllustrationsV1'

interface State {
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 },
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(
  ({ theme }) => ({
    '& .MuiFormControlLabel-label': {
      fontSize: '0.875rem',
      color: theme.palette.text.secondary,
    },
  }),
)

export default function SignInPage() {
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
  })

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent
          sx={{ p: (theme) => `${theme.spacing(13, 7, 6.5)} !important` }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src='/logo/500x250-logotipo8.png'
              alt='Sistema Dedicado'
              width='500'
              height='250'
            />
          </Box>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant='body2'>
              Informe suas credenciais para acessar o portal
            </Typography>
          </Box>
          <form
            noValidate
            autoComplete='off'
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField
              autoFocus
              fullWidth
              id='email'
              label='Email'
              sx={{ mb: 4 }}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Senha</InputLabel>
              <OutlinedInput
                label='Senha'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      <Icon
                        icon={
                          values.showPassword
                            ? 'mdi:eye-outline'
                            : 'mdi:eye-off-outline'
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              <FormControlLabel
                label='Lembre-me'
                control={<Checkbox />}
                sx={{
                  '& .MuiFormControlLabel-label': { color: 'text.primary' },
                }}
              />
              <Typography
                variant='body2'
                component={Link}
                href='/auth/forgot-password'
                sx={{ color: 'secondary.main', textDecoration: 'none' }}
              >
                Esqueceu a senha?
              </Typography>
            </Box>
            <Button
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              color='info'
              sx={{ mb: 7 }}
            >
              Autenticar-se
            </Button>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ mr: 2, color: 'text.secondary' }}>
                É novo por aqui?
              </Typography>
              <Typography
                component={Link}
                href='/auth/sign-up'
                sx={{ color: 'info.main', textDecoration: 'none' }}
              >
                Crie sua Conta
              </Typography>
            </Box>
            <Divider
              sx={{
                '& .MuiDivider-wrapper': { px: 4 },
                mt: (theme) => `${theme.spacing(5)} !important`,
                mb: (theme) => `${theme.spacing(7.5)} !important`,
              }}
            >
              ou
            </Divider>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconButton
                href='/'
                component={Link}
                sx={{ color: '#497ce2' }}
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <Icon icon='mdi:facebook' />
              </IconButton>
              <IconButton
                href='/'
                component={Link}
                sx={{ color: '#db4437' }}
                onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
              >
                <Icon icon='mdi:google' />
              </IconButton>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

SignInPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>
