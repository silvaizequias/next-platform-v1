import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Box,
  Checkbox,
  Typography,
  Button,
  FormHelperText,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import MuiFormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel'

import { useState } from 'react'

import Link from 'next/link'

import Icon from 'src/@core/components/icon'

import * as yup from 'yup'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { signIn } from 'next-auth/react'

type InputForm = {
  email: string
  password: string
}

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(
  ({ theme }) => ({
    '& .MuiFormControlLabel-label': {
      fontSize: '0.875rem',
      color: theme.palette.text.secondary,
    },
  }),
)
export default function SignInForm() {
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).required(),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForm>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<InputForm> = async (inputs) => {
    const { email, password } = inputs
    await signIn('credentials', {
      email: email,
      password: password,
    })
      .then(function (response) {
        response?.status
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth sx={{ mb: 4 }}>
        <Controller
          name='email'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              autoFocus
              label='E-mail'
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              error={Boolean(errors.email)}
              placeholder='seu@email.com'
            />
          )}
        />
        {errors.email && (
          <FormHelperText sx={{ color: 'error.main' }}>
            {errors.email.message}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth>
        <InputLabel
          htmlFor='auth-login-v2-password'
          error={Boolean(errors.password)}
        >
          Senha
        </InputLabel>
        <Controller
          name='password'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <OutlinedInput
              value={value}
              onBlur={onBlur}
              label='Senha'
              onChange={onChange}
              id='auth-login-v2-password'
              error={Boolean(errors.password)}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon
                      icon={
                        showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'
                      }
                      fontSize={20}
                    />
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
        />
        {errors.password && (
          <FormHelperText sx={{ color: 'error.main' }} id=''>
            {errors.password.message}
          </FormHelperText>
        )}
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
          label='Lembrar-me'
          control={
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          }
        />
        <Typography
          variant='body2'
          component={Link}
          href='/auth/forgot-password'
          sx={{ color: 'primary.main', textDecoration: 'none' }}
        >
          Esqueceu a Senha?
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
    </form>
  )
}
